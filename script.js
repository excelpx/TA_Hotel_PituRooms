// Initialize UI behavior: icons, Firebase Auth, login/logout, view switching
window.addEventListener('DOMContentLoaded', async () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Elements
  const loginForm = document.getElementById('login-form');
  const loginUsername = document.getElementById('login-username');
  const loginPassword = document.getElementById('login-password');
  const loginError = document.getElementById('login-error');
  const loginContainer = document.getElementById('login-container');
  const appContainer = document.getElementById('app-container');
  const userNameEl = document.getElementById('user-name');
  const userRoleEl = document.getElementById('user-role');
  const userInitialsEl = document.getElementById('user-initials');
  const headerUserName = document.getElementById('header-user-name');
  const headerUserRole = document.getElementById('header-user-role');
  const dashGreetName = document.getElementById('dash-greet-name');
  const adminNavGroup = document.getElementById('admin-nav-group');
  const logoutBtn = document.getElementById('logout-btn');

  function showError(message) {
    if (!loginError) return;
    loginError.textContent = message;
    loginError.classList.remove('hidden');
  }

  function hideError() {
    if (!loginError) return;
    loginError.classList.add('hidden');
  }

  function openApp(user) {
    // populate UI with user info
    if (userNameEl) userNameEl.textContent = user.name || user.email;
    if (userRoleEl) userRoleEl.textContent = user.role === 'receptionist' ? 'Resepsionis' : user.role === 'admin' ? 'Admin Eksekutif' : user.role;
    if (headerUserName) headerUserName.textContent = user.name || user.email;
    if (headerUserRole) headerUserRole.textContent = (user.role || '').toUpperCase();
    if (dashGreetName) dashGreetName.textContent = user.name || user.email;
    if (userInitialsEl) userInitialsEl.textContent = (user.name || user.email || 'U').charAt(0).toUpperCase();

    // show/hide admin nav based on role
    if (adminNavGroup) {
      if (user.role === 'admin') adminNavGroup.classList.remove('hidden');
      else adminNavGroup.classList.add('hidden');
    }

    // swap containers
    if (loginContainer) loginContainer.classList.add('hidden');
    if (appContainer) appContainer.classList.remove('hidden');
    
    // Initialize app data
    loadRoomsData();
    setupRealtimeListeners();

    // If admin, refresh admin-specific lists
    if (user.role === 'admin') {
      refreshAdminUsersList();
    }
  }

  async function closeApp() {
    await firebaseLogout();
    if (appContainer) appContainer.classList.add('hidden');
    if (loginContainer) loginContainer.classList.remove('hidden');
    hideError();
    loginForm?.reset();
  }

  // Initialize admin forms/UI handlers (register listeners early)
  initAdminUI();

  // Login submit - Firebase Auth
  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();
    const email = (loginUsername?.value || '').trim();
    const password = (loginPassword?.value || '').trim();

    if (!email || !password) {
      showError('Isi email dan password terlebih dahulu.');
      return;
    }

    // Firebase Login
    const result = await firebaseLogin(email, password);
    
    if (result.success) {
      // Check if user is receptionist or admin
      if (result.role === 'receptionist' || result.role === 'admin') {
        openApp({ 
          email: result.user.email, 
          name: result.userData.name,
          role: result.role 
        });
      } else {
        showError('Akun ini tidak memiliki akses ke aplikasi receptionist.');
      }
    } else {
      showError(result.error || 'Email atau password salah.');
    }
  });

  // Logout
  logoutBtn?.addEventListener('click', closeApp);

  // Check if user already logged in
  const user = await getCurrentUser();
  if (user && (user.role === 'receptionist' || user.role === 'admin')) {
    openApp({
      email: user.user.email,
      name: user.userData.name,
      role: user.role
    });
  }
});

// ============ ADMIN UI / FORMS ============
function initAdminUI() {
  const addRoomForm = document.getElementById('add-room-form');
  const adminUserForm = document.getElementById('admin-user-form');

  addRoomForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const number = document.getElementById('add-room-number').value.trim();
    const type = document.querySelector('input[name="add-room-type"]:checked')?.value || 'Deluxe';
    const price = Number(document.getElementById('add-room-price').value) || 0;
    const status = document.getElementById('add-room-status').value || 'Available';

    if (!number) return alert('Isi nomor kamar terlebih dahulu.');

    const roomData = {
      number,
      type,
      price,
      status
    };

    // Call shared firebase function
    const res = await addRoom(roomData);
    if (res.success) {
      alert('Kamar berhasil ditambahkan.');
      addRoomForm.reset();
      // refresh local rooms
      await loadRoomsData();
    } else {
      alert('Gagal menambahkan kamar: ' + (res.error || 'unknown'));
    }
  });

  adminUserForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullname = document.getElementById('admin-user-fullname').value.trim();
    const username = document.getElementById('admin-user-username').value.trim();
    const password = document.getElementById('admin-user-password').value.trim();
    const roleRaw = document.querySelector('input[name="admin-user-role"]:checked')?.value || 'Receptionist';
    const role = roleRaw.toLowerCase() === 'admin' || roleRaw.toLowerCase() === 'admin executive' ? 'admin' : 'receptionist';

    if (!fullname || !username || !password) return alert('Lengkapi semua data user.');

    // Derive an email from username if admin did not provide explicit email
    let email = username;
    if (!email.includes('@')) email = `${username.toLowerCase()}@luminastay.local`;

    const res = await createStaffUser(email, password, { name: fullname, phone: '', role });
    if (res.success) {
      alert('User staf berhasil dibuat.');
      adminUserForm.reset();
      // refresh users list
      await refreshAdminUsersList();
    } else {
      alert('Gagal membuat user: ' + (res.error || 'unknown'));
    }
  });
}

async function refreshAdminUsersList() {
  const result = await getAllUsers();
  const tbody = document.getElementById('admin-users-table-body');
  const countEl = document.getElementById('admin-user-count');

  if (!result.success) {
    if (countEl) countEl.textContent = '0';
    if (tbody) tbody.innerHTML = '<tr><td colspan="4" class="text-center py-6">Akses dibutuhkan: login sebagai Admin</td></tr>';
    return;
  }

  const users = result.users || [];
  if (countEl) countEl.textContent = String(users.length || 0);

  if (!tbody) return;
  tbody.innerHTML = '';
  users.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-6 py-3.5">${u.name || ''}</td>
      <td class="px-6 py-3.5">${(u.email || '').split('@')[0]}</td>
      <td class="px-6 py-3.5">${u.role || ''}</td>
      <td class="px-6 py-3.5 text-right"><button data-uid="${u.id}" class="px-3 py-1 bg-rose-500 text-white rounded-lg text-xs">Hapus</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// ============ LOAD ROOMS DATA ============
async function loadRoomsData() {
  const result = await getRooms();
  if (result.success) {
    // Store rooms globally and update dashboard
    window.allRooms = result.rooms;
    renderRoomsDashboard(result.rooms);
  }
}

function renderRoomsDashboard(rooms) {
  const grid = document.getElementById('dashboard-rooms-grid');
  if (!grid) return;

  grid.innerHTML = '';
  
  rooms.forEach(room => {
    const statusColor = {
      'Available': 'bg-green-100 text-green-800',
      'Occupied': 'bg-red-100 text-red-800',
      'OutOfOrder': 'bg-gray-100 text-gray-800'
    }[room.status] || 'bg-gray-100 text-gray-800';

    const card = document.createElement('div');
    card.className = 'p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition cursor-pointer';
    card.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <div>
          <h5 class="font-bold text-gray-900">Kamar ${room.number}</h5>
          <p class="text-xs text-gray-500">${room.type}</p>
        </div>
        <span class="px-2 py-1 text-xs font-bold rounded ${statusColor}">
          ${room.status === 'Available' ? 'Tersedia' : room.status === 'Occupied' ? 'Terisi' : 'Rusak'}
        </span>
      </div>
      <p class="text-sm font-bold text-indigo-600">${formatCurrency(room.price)}/malam</p>
    `;
    
    grid.appendChild(card);
  });
}

function renderAdminRooms(rooms) {
  const grid = document.getElementById('admin-rooms-list');
  if (!grid) return;

  grid.innerHTML = '';
  rooms.forEach(room => {
    const statusLabel = room.status === 'Available' ? 'Tersedia' : room.status === 'Occupied' ? 'Terisi' : 'Rusak';
    const card = document.createElement('div');
    card.className = 'p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition';
    card.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <div>
          <h5 class="font-bold text-gray-900">Kamar ${room.number}</h5>
          <p class="text-xs text-gray-500">${room.type}</p>
        </div>
        <span class="px-2 py-1 text-xs font-bold rounded bg-slate-100">${statusLabel}</span>
      </div>
      <p class="text-sm font-bold text-indigo-600">${formatCurrency(room.price)}/malam</p>
    `;
    grid.appendChild(card);
  });
}

// ============ REAL-TIME LISTENERS ============
function setupRealtimeListeners() {
  // Listen to rooms updates
  listenToRooms((rooms) => {
    window.allRooms = rooms;
    renderRoomsDashboard(rooms);
    // also render admin rooms view
    renderAdminRooms(rooms);
    
    // Update stats
    const occupied = rooms.filter(r => r.status === 'Occupied').length;
    const available = rooms.filter(r => r.status === 'Available').length;
    
    const occupiedEl = document.getElementById('stat-occupied-kamar');
    const availableEl = document.getElementById('stat-available-kamar');
    
    if (occupiedEl) occupiedEl.textContent = occupied;
    if (availableEl) availableEl.textContent = available;
  });

  // Listen to bookings updates
  listenToBookings((bookings) => {
    window.allBookings = bookings;
    
    const pending = bookings.filter(b => b.status === 'Confirmed').length;
    const pendingEl = document.getElementById('stat-booking-code-pending');
    if (pendingEl) pendingEl.textContent = pending;
  });
}
