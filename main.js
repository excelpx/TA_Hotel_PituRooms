// Lumina Stay - Vanilla JS Hotel Operating System (HOS) Engine
// Integrates 100% features of original React App with state preservation in LocalStorage

// --- 1. INITIAL SEED DATA ---
const INITIAL_ROOMS = [
  { id: 'd101', number: '101', type: 'Deluxe', status: 'Occupied', pricePerNight: 850000 },
  { id: 'd102', number: '102', type: 'Deluxe', status: 'Available', pricePerNight: 850000 },
  { id: 'd103', number: '103', type: 'Deluxe', status: 'Occupied', pricePerNight: 850000 },
  { id: 'd104', number: '104', type: 'Deluxe', status: 'Available', pricePerNight: 850000 },
  { id: 'd105', number: '105', type: 'Deluxe', status: 'Occupied', pricePerNight: 850000 },
  { id: 'd106', number: '106', type: 'Deluxe', status: 'Available', pricePerNight: 850000 },
  { id: 'd107', number: '107', type: 'Deluxe', status: 'Occupied', pricePerNight: 850000 },
  { id: 'd108', number: '108', type: 'Deluxe', status: 'Available', pricePerNight: 850000 },
  { id: 'd109', number: '109', type: 'Deluxe', status: 'Occupied', pricePerNight: 850000 },
  { id: 'd110', number: '110', type: 'Deluxe', status: 'Available', pricePerNight: 850000 },
  { id: 's201', number: '201', type: 'Studio', status: 'Occupied', pricePerNight: 600000 },
  { id: 's202', number: '202', type: 'Studio', status: 'Available', pricePerNight: 600000 },
  { id: 's203', number: '203', type: 'Studio', status: 'Occupied', pricePerNight: 600000 },
  { id: 's204', number: '204', type: 'Studio', status: 'Available', pricePerNight: 600000 },
  { id: 's205', number: '205', type: 'Studio', status: 'Occupied', pricePerNight: 600000 },
  { id: 's206', number: '206', type: 'Studio', status: 'Available', pricePerNight: 600000 },
  { id: 's207', number: '207', type: 'Studio', status: 'Occupied', pricePerNight: 600000 },
  { id: 's208', number: '208', type: 'Studio', status: 'Available', pricePerNight: 600000 },
  { id: 's209', number: '209', type: 'Studio', status: 'Occupied', pricePerNight: 600000 },
  { id: 's210', number: '210', type: 'Studio', status: 'Available', pricePerNight: 600000 },
];

const INITIAL_RESERVATIONS = [
  {
    id: 'RES-D101',
    guestName: 'Budi Santoso',
    identityNo: '3374012010890001',
    phone: '081234567890',
    email: 'budi.santoso@gmail.com',
    roomType: 'Deluxe',
    roomNumber: '101',
    checkInDate: '2026-05-23',
    checkOutDate: '2026-05-25',
    durationDays: 2,
    totalCharge: 1700000,
    isOnlineBooking: false,
    status: 'CheckedIn',
    paymentMethod: 'Cash',
    amountPaid: 1700000,
    changeAmount: 0,
  },
  {
    id: 'RES-D103',
    guestName: 'Dewi Lestari',
    identityNo: '3374014109920003',
    phone: '081398765432',
    email: 'dewi.lock@yahoo.com',
    roomType: 'Deluxe',
    roomNumber: '103',
    checkInDate: '2026-05-24',
    checkOutDate: '2026-05-26',
    durationDays: 2,
    totalCharge: 1700000,
    isOnlineBooking: true,
    status: 'CheckedIn',
    paymentMethod: 'Transfer Bank',
    amountPaid: 1700000,
    changeAmount: 0,
  },
  {
    id: 'RES-D105',
    guestName: 'Eko Prasetyo',
    identityNo: '3171020405880002',
    phone: '085641234567',
    email: 'eko.pr@gmail.com',
    roomType: 'Deluxe',
    roomNumber: '105',
    checkInDate: '2026-05-22',
    checkOutDate: '2026-05-25',
    durationDays: 3,
    totalCharge: 2550000,
    isOnlineBooking: false,
    status: 'CheckedIn',
    paymentMethod: 'Debit Card',
    amountPaid: 2550000,
    changeAmount: 0,
  },
  {
    id: 'RES-D107',
    guestName: 'Siti Rahma',
    identityNo: '1271031112950005',
    phone: '081122334455',
    roomType: 'Deluxe',
    roomNumber: '107',
    checkInDate: '2026-05-24',
    checkOutDate: '2026-05-27',
    durationDays: 3,
    totalCharge: 2550000,
    isOnlineBooking: true,
    status: 'CheckedIn',
    paymentMethod: 'QRIS',
    amountPaid: 2550000,
    changeAmount: 0,
  },
  {
    id: 'RES-D109',
    guestName: 'Hendra Wijaya',
    identityNo: '3273051410850004',
    phone: '087812345678',
    email: 'hendra_wy@outlook.com',
    roomType: 'Deluxe',
    roomNumber: '109',
    checkInDate: '2026-05-23',
    checkOutDate: '2026-05-26',
    durationDays: 3,
    totalCharge: 2550000,
    isOnlineBooking: false,
    status: 'CheckedIn',
    paymentMethod: 'Cash',
    amountPaid: 3000000,
    changeAmount: 450000,
  },
  {
    id: 'RES-S201',
    guestName: 'Andi Wijaya',
    identityNo: '3374020101960002',
    phone: '081299998888',
    roomType: 'Studio',
    roomNumber: '201',
    checkInDate: '2026-05-24',
    checkOutDate: '2026-05-25',
    durationDays: 1,
    totalCharge: 600000,
    isOnlineBooking: false,
    status: 'CheckedIn',
    paymentMethod: 'Cash',
    amountPaid: 600005,
    changeAmount: 5,
  },
  {
    id: 'RES-S203',
    guestName: 'Rina Melati',
    identityNo: '3578014506940001',
    phone: '082155554444',
    email: 'rina.melati@gmail.com',
    roomType: 'Studio',
    roomNumber: '203',
    checkInDate: '2026-05-24',
    checkOutDate: '2026-05-26',
    durationDays: 2,
    totalCharge: 1200000,
    isOnlineBooking: true,
    status: 'CheckedIn',
    paymentMethod: 'QRIS',
    amountPaid: 1200000,
    changeAmount: 0,
  },
  {
    id: 'RES-S205',
    guestName: 'Ferry Kusuma',
    identityNo: '5171011211900003',
    phone: '081933332222',
    roomType: 'Studio',
    roomNumber: '205',
    checkInDate: '2026-05-21',
    checkOutDate: '2026-05-24',
    durationDays: 3,
    totalCharge: 1800000,
    isOnlineBooking: false,
    status: 'CheckedIn',
    paymentMethod: 'Debit Card',
    amountPaid: 1800000,
    changeAmount: 0,
  },
  {
    id: 'RES-S207',
    guestName: 'Lina Marlina',
    identityNo: '3204126702980002',
    phone: '085277778888',
    email: 'lina.marlina@gmail.com',
    roomType: 'Studio',
    roomNumber: '207',
    checkInDate: '2026-05-23',
    checkOutDate: '2026-05-25',
    durationDays: 2,
    totalCharge: 1200000,
    isOnlineBooking: true,
    status: 'CheckedIn',
    paymentMethod: 'Transfer Bank',
    amountPaid: 1200000,
    changeAmount: 0,
  },
  {
    id: 'RES-S209',
    guestName: 'Wawan Gunawan',
    identityNo: '3603021908910006',
    phone: '087766667777',
    roomType: 'Studio',
    roomNumber: '209',
    checkInDate: '2026-05-24',
    checkOutDate: '2026-05-26',
    durationDays: 2,
    totalCharge: 1200000,
    isOnlineBooking: false,
    status: 'CheckedIn',
    paymentMethod: 'Cash',
    amountPaid: 1500000,
    changeAmount: 300000,
  },
  {
    id: 'PITU-9821',
    guestName: 'Aditya Pratama',
    identityNo: '3173041212950002',
    phone: '081288887777',
    email: 'aditya.pratama@gmail.com',
    roomType: 'Deluxe',
    checkInDate: '2026-05-24',
    checkOutDate: '2026-05-26',
    durationDays: 2,
    totalCharge: 1700000,
    isOnlineBooking: true,
    status: 'Confirmed',
  },
  {
    id: 'PITU-5219',
    guestName: 'Maya Indah',
    identityNo: '3273014101960005',
    phone: '081322221111',
    email: 'maya.indah@gmail.com',
    roomType: 'Studio',
    checkInDate: '2026-05-24',
    checkOutDate: '2026-05-25',
    durationDays: 1,
    totalCharge: 600000,
    isOnlineBooking: true,
    status: 'Confirmed',
  },
  {
    id: 'PITU-0834',
    guestName: 'Rian Hidayat',
    identityNo: '3515021811930001',
    phone: '087811112222',
    email: 'rian_hd@yahoo.com',
    roomType: 'Deluxe',
    checkInDate: '2026-05-24',
    checkOutDate: '2026-05-27',
    durationDays: 3,
    totalCharge: 2550000,
    isOnlineBooking: true,
    status: 'Confirmed',
  },
  {
    id: 'RES-D150',
    guestName: 'Susilo Bambang',
    identityNo: '3374020303800002',
    phone: '081122339900',
    email: 'susilo.b@gmail.com',
    roomType: 'Deluxe',
    roomNumber: '102',
    checkInDate: '2026-05-20',
    checkOutDate: '2026-05-22',
    durationDays: 2,
    totalCharge: 1700000,
    isOnlineBooking: false,
    status: 'CheckedOut',
    paymentMethod: 'Debit Card',
    amountPaid: 1700000,
    changeAmount: 0,
  },
  {
    id: 'RES-S160',
    guestName: 'Jessica Anastasia',
    identityNo: '3171034405970004',
    phone: '081299990000',
    email: 'jess.ana@gmail.com',
    roomType: 'Studio',
    roomNumber: '204',
    checkInDate: '2026-05-22',
    checkOutDate: '2026-05-23',
    durationDays: 1,
    totalCharge: 600000,
    isOnlineBooking: true,
    status: 'CheckedOut',
    paymentMethod: 'QRIS',
    amountPaid: 600000,
    changeAmount: 0,
  }
];

const INITIAL_TRANSACTIONS = [
  {
    id: 'TRX-1001',
    date: '2026-05-24T08:15:00Z',
    guestName: 'Budi Santoso',
    roomType: 'Deluxe',
    roomNumber: '101',
    type: 'Check In',
    amount: 1700000,
    paymentMethod: 'Cash',
    resepsionis: 'Zea Aldrian',
  },
  {
    id: 'TRX-1002',
    date: '2026-05-24T08:45:00Z',
    guestName: 'Andi Wijaya',
    roomType: 'Studio',
    roomNumber: '201',
    type: 'Check In',
    amount: 600000,
    paymentMethod: 'Cash',
    resepsionis: 'Zea Aldrian',
  },
  {
    id: 'TRX-1003',
    date: '2026-05-24T09:12:00Z',
    guestName: 'Dewi Lestari',
    roomType: 'Deluxe',
    roomNumber: '103',
    type: 'Check In',
    amount: 1700000,
    paymentMethod: 'Transfer Bank',
    resepsionis: 'Zea Aldrian',
  },
  {
    id: 'TRX-1004',
    date: '2026-05-24T09:30:00Z',
    guestName: 'Rina Melati',
    roomType: 'Studio',
    roomNumber: '203',
    type: 'Check In',
    amount: 1200000,
    paymentMethod: 'QRIS',
    resepsionis: 'Zea Aldrian',
  },
  {
    id: 'TRX-1005',
    date: '2026-05-24T10:05:00Z',
    guestName: 'Susilo Bambang',
    roomType: 'Deluxe',
    roomNumber: '102',
    type: 'Check Out',
    amount: 1700000,
    paymentMethod: 'Debit Card',
    resepsionis: 'Zea Aldrian',
  },
  {
    id: 'TRX-1006',
    date: '2026-05-24T10:45:00Z',
    guestName: 'Jessica Anastasia',
    roomType: 'Studio',
    roomNumber: '204',
    type: 'Check Out',
    amount: 600000,
    paymentMethod: 'QRIS',
    resepsionis: 'Zea Aldrian',
  }
];

const INITIAL_USERS = [
  { id: 'usr_1', fullname: 'Zea Aldrian', username: 'receptionist', password: 'recep123', role: 'Receptionist' },
  { id: 'usr_2', fullname: 'Karen Freon', username: 'admin', password: 'admin123', role: 'Admin' }
];

const INITIAL_CULINARY_ORDERS = [
  { id: 'food_1', name: 'Ramen Soto Piturooms Specials', type: 'Main course', ordersCount: 52, rating: '4.9', price: '45.000', tagColor: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
  { id: 'food_2', name: 'Original Shoyu Ramen (Noodle)', type: 'Main course', ordersCount: 41, rating: '4.8', price: '48.000', tagColor: 'bg-emerald-50 border-emerald-250 text-emerald-700' },
  { id: 'food_3', name: 'Piturooms Roasted Salada Bowl', type: 'Salad Class', ordersCount: 33, rating: '4.7', price: '32.000', tagColor: 'bg-amber-50 border-amber-250 text-amber-700' },
  { id: 'food_4', name: 'Lumina Matcha Milkshake Creamy', type: 'Drinks', ordersCount: 29, rating: '4.9', price: '25.000', tagColor: 'bg-cyan-50 border-cyan-200 text-cyan-700' }
];


// --- 2. GLOBAL SYSTEM STATE ENGINE ---
let rooms = JSON.parse(localStorage.getItem('lumina_rooms')) || INITIAL_ROOMS;
let reservations = JSON.parse(localStorage.getItem('lumina_reservations')) || INITIAL_RESERVATIONS;
let transactions = JSON.parse(localStorage.getItem('lumina_transactions')) || INITIAL_TRANSACTIONS;
let users = JSON.parse(localStorage.getItem('lumina_users')) || INITIAL_USERS;
let activeUser = JSON.parse(localStorage.getItem('lumina_active_user')) || null;

// Temporary run-time navigation states
let currentMenu = 'dashboard';
let currentRoomsFilter = 'all'; 
let currentAdminRoomsFilter = 'all';
let currentReservationsTab = 'all';
let currentGuestsTab = 'all';
let activeHistoryMethod = 'All';
let searchFilterStr = '';

// Quick save sync helpers
function syncToLocalStorage() {
  localStorage.setItem('lumina_rooms', JSON.stringify(rooms));
  localStorage.setItem('lumina_reservations', JSON.stringify(reservations));
  localStorage.setItem('lumina_transactions', JSON.stringify(transactions));
  localStorage.setItem('lumina_users', JSON.stringify(users));
}

// Format numbers to Indonesian IDR currencies
function formatIDR(num) {
  return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}


// --- 3. TEMPLATE RENDER ENGINE CONSTRUCTORS ---

// Navigation Tab switcher router
function navigate(menuId) {
  currentMenu = menuId;
  
  // Update sidebar buttons highlighted states
  document.querySelectorAll('.sidebar-btn').forEach(btn => {
    btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
    btn.classList.add('text-slate-450', 'hover:bg-slate-800/50', 'hover:text-white');
  });
  
  const activeBtn = document.getElementById(`menu-btn-${menuId}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-450', 'hover:bg-slate-800/50', 'hover:text-white');
    activeBtn.classList.add('bg-indigo-600', 'text-white', 'shadow-md');
  }

  // Toggle active views
  document.querySelectorAll('.view-content').forEach(view => {
    view.classList.add('hidden');
  });
  
  const activeView = document.getElementById(`view-${menuId}`);
  if (activeView) {
    activeView.classList.remove('hidden');
  }

  // Clear master search input on tab change except custom scopes
  if (menuId !== 'dashboard' && menuId !== 'reservations' && menuId !== 'adminGuests') {
    document.getElementById('header-search-input').value = '';
    searchFilterStr = '';
  }

  // Trigger sub-render engines depending on target view scope
  triggerSubRenderers();
}

function triggerSubRenderers() {
  if (!activeUser) return;
  
  switch(currentMenu) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'checkIn':
      setupCheckinUnitSelects();
      calculateWalkinTotalPrice();
      break;
    case 'checkOut':
      setupCheckoutUnitSelects();
      break;
    case 'reservations':
      renderReservations();
      break;
    case 'history':
      renderHistory();
      break;
    case 'adminDashboard':
      renderAdminDashboard();
      break;
    case 'adminRooms':
      renderAdminRooms();
      break;
    case 'adminUsers':
      renderAdminUsers();
      break;
    case 'adminGuests':
      renderAdminGuests();
      break;
  }

  // Automatically refresh icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// 4. SUB-VIEWMY RENDER ELEMENTS IMPLEMENTATION

// === VIEW A: RECEPTIONIST ROOMS DASHBOARD ===
function renderDashboard() {
  const gridContainer = document.getElementById('dashboard-rooms-grid');
  if (!gridContainer) return;
  gridContainer.innerHTML = '';

  // Filter KPI states
  const totalCount = rooms.length;
  const occupiedCount = rooms.filter(r => r.status === 'Occupied').length;
  const bookingsPending = reservations.filter(r => r.status === 'Confirmed').length;
  const availableCount = rooms.filter(r => r.status === 'Available').length;

  // Update DOM metrics boxes
  document.getElementById('stat-occupied-kamar').textContent = occupiedCount;
  document.getElementById('stat-booking-code-pending').textContent = bookingsPending;
  document.getElementById('stat-available-kamar').textContent = availableCount;
  document.querySelectorAll('.stat-total-kamar').forEach(el => el.textContent = totalCount);

  // Detail segment deluxe/studio occupancy progress ratio
  const deluxeCount = rooms.filter(r => r.type === 'Deluxe').length || 1;
  const dOccupied = rooms.filter(r => r.type === 'Deluxe' && r.status === 'Occupied').length;
  const studioCount = rooms.filter(r => r.type === 'Studio').length || 1;
  const sOccupied = rooms.filter(r => r.type === 'Studio' && r.status === 'Occupied').length;

  document.getElementById('summary-deluxe-occupied').textContent = dOccupied;
  document.getElementById('summary-studio-occupied').textContent = sOccupied;
  document.getElementById('progress-deluxe-bar').style.width = `${(dOccupied/deluxeCount) * 100}%`;
  document.getElementById('progress-studio-bar').style.width = `${(sOccupied/studioCount) * 100}%`;

  // Standard room cards filtering items
  const filtered = rooms.filter(room => {
    const matchesCategory = currentRoomsFilter === 'all' || room.type === currentRoomsFilter;
    const matchesSearch = !searchFilterStr || 
      room.number.includes(searchFilterStr) || 
      room.type.toLowerCase().includes(searchFilterStr.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  filtered.forEach(room => {
    const isOccupied = room.status === 'Occupied';
    const isMaintenance = room.status === 'OutofOrder';
    
    // Find active guest occupying the room unit
    const activeRes = reservations.find(res => res.roomNumber === room.number && res.status === 'CheckedIn');
    const guestName = activeRes ? activeRes.guestName : '';

    let cardBg = 'bg-white border-slate-200 hover:border-indigo-500 hover:shadow-sm';
    let statusBadge = `<span class="px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[8.5px] font-black rounded uppercase tracking-wider">Tersedia</span>`;
    let detailSection = `<span class="text-[9.5px] text-indigo-600 font-extrabold block mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity">Check In &rarr;</span>`;
    let dotColor = 'bg-emerald-500';

    if (isOccupied) {
      cardBg = 'bg-slate-50/70 border-slate-200 hover:bg-slate-50';
      statusBadge = `<span class="px-2 py-0.5 bg-amber-50 border border-amber-100 text-amber-700 text-[8.5px] font-black rounded uppercase tracking-wider">Terisi</span>`;
      dotColor = 'bg-amber-400';
      detailSection = `
        <p class="text-[8.5px] uppercase font-black text-slate-400 leading-none">Tamu Aktif</p>
        <p class="text-xs font-black text-slate-800 truncate max-w-[130px] mt-0.5">${guestName || 'Umum / Inactive'}</p>
        <span class="text-[9px] text-amber-600 font-extrabold block mt-1 hover:underline">Check Out &rarr;</span>
      `;
    } else if (isMaintenance) {
      cardBg = 'bg-rose-50/30 border-rose-100/50 hover:bg-rose-50/50';
      statusBadge = `<span class="px-2 py-0.5 bg-rose-50 border border-rose-100 text-rose-700 text-[8.5px] font-black rounded uppercase tracking-wider">Perbaikan</span>`;
      dotColor = 'bg-rose-500';
      detailSection = `
        <p class="text-[8.5px] uppercase font-black text-slate-400 leading-none">Status</p>
        <p class="text-xs font-black text-rose-800 truncate mt-0.5">Out of Order</p>
      `;
    }

    const card = document.createElement('div');
    card.className = `group border rounded-2xl p-4.5 transition-all duration-200 cursor-pointer min-h-[124px] flex flex-col justify-between ${cardBg}`;
    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <span class="text-[9px] font-black uppercase text-slate-400 tracking-wider">KAMAR ${room.number}</span>
          <h4 class="text-sm font-black text-slate-900 leading-tight">${room.type}</h4>
        </div>
        <span class="w-2 h-2 rounded-full ${dotColor}"></span>
      </div>
      <div class="mt-4">
        ${detailSection}
      </div>
    `;

    // Action routers clicking on simple cards
    card.addEventListener('click', () => {
      if (isMaintenance) {
        alert(`Kamar #${room.number} sedang dalam rehabilitasi. Silakan ubah status melalui menu Kamar di panel admin.`);
        return;
      }
      if (isOccupied) {
        // Redirection with pre-selected room
        navigate('checkOut');
        const select = document.getElementById('checkout-room-select');
        if (select) {
          select.value = room.number;
          select.dispatchEvent(new Event('change'));
        }
      } else {
        navigate('checkIn');
        const rType = document.getElementById('walkin-room-type');
        if (rType) {
          rType.value = room.type;
          rType.dispatchEvent(new Event('change'));
        }
        const rNo = document.getElementById('walkin-room-number');
        if (rNo) {
          rNo.value = room.number;
        }
      }
    });

    gridContainer.appendChild(card);
  });

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-450 text-xs font-semibold">
        <i data-lucide="info" class="w-8 h-8 mx-auto text-slate-300 mb-2"></i>
        Tidak ada unit kamar yang sesuai dengan konfigurasi filter pencarian saat ini.
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

// === VIEW B: CHECK-IN DESK ===
function setupCheckinUnitSelects(selectedRoomNumber = null) {
  const walkinType = document.getElementById('walkin-room-type').value;
  const selectWalkinNo = document.getElementById('walkin-room-number');
  if (selectWalkinNo) {
    selectWalkinNo.innerHTML = '';
    const availableFiltered = rooms.filter(r => r.type === walkinType && r.status === 'Available');
    
    availableFiltered.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.number;
      opt.textContent = `KAMAR ${r.number} (${r.type})`;
      selectWalkinNo.appendChild(opt);
    });

    if (selectedRoomNumber && availableFiltered.some(r => r.number === selectedRoomNumber)) {
      selectWalkinNo.value = selectedRoomNumber;
    } else if (availableFiltered.length > 0) {
      selectWalkinNo.selectedIndex = 0;
    }

    if (availableFiltered.length === 0) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = `Kamar penuh untuk kategori ${walkinType}!`;
      selectWalkinNo.appendChild(opt);
    }
  }

  renderWalkinRoomButtons();
}

function renderWalkinRoomButtons() {
  const buttonsContainer = document.getElementById('walkin-room-buttons');
  const roomCountEl = document.getElementById('walkin-room-count');
  if (!buttonsContainer || !roomCountEl) return;

  const availableRooms = rooms.filter(r => r.status === 'Available');
  buttonsContainer.innerHTML = '';
  roomCountEl.textContent = `${availableRooms.length} kamar tersedia`;

  if (availableRooms.length === 0) {
    buttonsContainer.innerHTML = `
      <div class="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700 text-sm font-semibold">
        Tidak ada kamar tersedia untuk walk-in saat ini.
      </div>
    `;
    return;
  }

  const selectedRoomNo = document.getElementById('walkin-room-number')?.value;
  const grouped = availableRooms.reduce((acc, room) => {
    if (!acc[room.type]) acc[room.type] = [];
    acc[room.type].push(room);
    return acc;
  }, {});

  Object.entries(grouped).forEach(([type, roomList]) => {
    const section = document.createElement('div');
    section.className = 'space-y-3';
    section.innerHTML = `
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">${type === 'Deluxe' ? 'Deluxe Class' : 'Studio Suite'}</p>
          <p class="text-[10px] text-slate-500">${roomList.length} unit kosong</p>
        </div>
      </div>
    `;

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-3 sm:grid-cols-4 gap-2';

    roomList.forEach(room => {
      const button = document.createElement('button');
      button.type = 'button';
      const isSelected = selectedRoomNo === room.number;
      button.className = `py-2 rounded-2xl text-sm font-bold transition ${isSelected ? 'bg-indigo-600 text-white border border-indigo-600' : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'}`;
      button.textContent = room.number;
      button.addEventListener('click', () => {
        document.getElementById('walkin-room-type').value = room.type;
        setupCheckinUnitSelects(room.number);
        calculateWalkinTotalPrice();
      });
      grid.appendChild(button);
    });

    section.appendChild(grid);
    buttonsContainer.appendChild(section);
  });
}

function calculateWalkinTotalPrice() {
  const walkinType = document.getElementById('walkin-room-type').value;
  const duration = parseInt(document.getElementById('walkin-duration').value) || 1;
  const rate = walkinType === 'Deluxe' ? 850000 : 600000;
  const total = rate * duration;

  document.getElementById('payment-calc-subtotal').textContent = formatIDR(total);
  
  // Real-time cash changes
  const pPaid = parseInt(document.getElementById('payment-amount-paid').value) || 0;
  const change = pPaid - total;
  const changeEl = document.getElementById('payment-calc-change');
  if (changeEl) {
    if (change >= 0) {
      changeEl.textContent = formatIDR(change);
      changeEl.classList.remove('text-rose-600');
      changeEl.classList.add('text-indigo-900');
    } else {
      changeEl.textContent = 'Dana Kurang!';
      changeEl.classList.remove('text-indigo-900');
      changeEl.classList.add('text-rose-600');
    }
  }
}

// === VIEW C: CHECK-OUT DESK ===
function setupCheckoutUnitSelects() {
  const selectCheckout = document.getElementById('checkout-room-select');
  if (!selectCheckout) return;
  selectCheckout.innerHTML = '<option value="">-- Pilih Kamar Terisi --</option>';

  const occupiedRooms = rooms.filter(r => r.status === 'Occupied');
  occupiedRooms.forEach(room => {
    const opt = document.createElement('option');
    opt.value = room.number;
    opt.textContent = `KAMAR ${room.number} (${room.type})`;
    selectCheckout.appendChild(opt);
  });

  // Re-run current calculations or reset details
  triggerCheckoutFormDetails();
}

function triggerCheckoutFormDetails() {
  const rmNo = document.getElementById('checkout-room-select').value;
  const emptyState = document.getElementById('checkout-empty-state');
  const detailsCard = document.getElementById('checkout-details-card');

  if (!rmNo) {
    emptyState.classList.remove('hidden');
    detailsCard.classList.add('hidden');
    document.getElementById('checkout-calc-grandtotal').textContent = formatIDR(0);
    document.getElementById('checkout-calc-surcharges-sum').textContent = formatIDR(0);
    return;
  }

  emptyState.classList.add('hidden');
  detailsCard.classList.remove('hidden');

  // Load occupant details
  const activeRes = reservations.find(r => r.roomNumber === rmNo && r.status === 'CheckedIn');
  if (activeRes) {
    document.getElementById('checkout-guest-name').textContent = activeRes.guestName;
    document.getElementById('checkout-guest-identity').textContent = `NIK / ID: ${activeRes.identityNo || 'Tidak Terdaftar'}`;
    document.getElementById('checkout-room-badge').textContent = `Kamar ${activeRes.roomNumber}`;
    document.getElementById('checkout-room-type').textContent = activeRes.roomType;
    document.getElementById('checkout-ci-date').textContent = activeRes.checkInDate;
    document.getElementById('checkout-co-date').textContent = activeRes.checkOutDate;
    document.getElementById('checkout-duration').textContent = activeRes.durationDays;
    document.getElementById('checkout-is-online').textContent = activeRes.isOnlineBooking ? 'Online Booking OTA' : 'Walk-in Offline';
  }

  calculateCheckoutBill();
}

function calculateCheckoutBill() {
  const late = parseInt(document.getElementById('checkout-surcharge-late').value) || 0;
  const mini = parseInt(document.getElementById('checkout-surcharge-minibar').value) || 0;
  const dmg = parseInt(document.getElementById('checkout-surcharge-damage').value) || 0;

  const surchargesSum = late + mini + dmg;
  document.getElementById('checkout-calc-surcharges-sum').textContent = formatIDR(surchargesSum);
  document.getElementById('checkout-calc-grandtotal').textContent = formatIDR(surchargesSum);
}

// === VIEW D: RESERVATIONS MASTER LIST ===
function renderReservations() {
  const tbody = document.getElementById('reservations-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  // Tab counters update
  const tabAll = document.getElementById('res-tab-all');
  const tabConf = document.getElementById('res-tab-confirmed');
  const tabIn = document.getElementById('res-tab-checkedin');
  const tabOut = document.getElementById('res-tab-checkedout');

  tabAll.textContent = `Semua (${reservations.length})`;
  tabConf.textContent = `Confirmed (${reservations.filter(r => r.status === 'Confirmed').length})`;
  tabIn.textContent = `Checked In (${reservations.filter(r => r.status === 'CheckedIn').length})`;
  tabOut.textContent = `Checked Out (${reservations.filter(r => r.status === 'CheckedOut').length})`;

  const filtered = reservations.filter(r => {
    // Current tab match status
    let matchTab = true;
    if (currentReservationsTab === 'confirmed') matchTab = (r.status === 'Confirmed');
    else if (currentReservationsTab === 'checkedin') matchTab = (r.status === 'CheckedIn');
    else if (currentReservationsTab === 'checkedout') matchTab = (r.status === 'CheckedOut');

    // Search bar matching criteria
    const matchSearch = !searchFilterStr ||
      r.guestName.toLowerCase().includes(searchFilterStr.toLowerCase()) ||
      r.id.toLowerCase().includes(searchFilterStr.toLowerCase()) ||
      (r.roomNumber && r.roomNumber.includes(searchFilterStr));

    return matchTab && matchSearch;
  });

  filtered.forEach(res => {
    let statusClass = 'bg-blue-50 text-blue-700 border-blue-150 border';
    if (res.status === 'CheckedIn') statusClass = 'bg-amber-50 text-amber-700 border-amber-100 border';
    else if (res.status === 'CheckedOut') statusClass = 'bg-emerald-50 text-emerald-700 border-emerald-100 border';
    else if (res.status === 'Cancelled') statusClass = 'bg-slate-100 text-slate-400';

    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/50 transition-all';
    
    // Actions are accessible to both Admin and Receptionist users
    const actBtn = (activeUser.role === 'Admin' || activeUser.role === 'Receptionist') ? `
      <div class="flex items-center justify-center gap-1.5">
        <button class="res-edit-btn px-2.5 py-1.5 bg-slate-50 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800 border border-slate-200 hover:border-indigo-100 rounded-lg font-black transition cursor-pointer" data-id="${res.id}">
          Ubah
        </button>
        <button class="res-del-btn px-2 py-1.5 bg-slate-50 text-rose-500 hover:bg-rose-50 border border-slate-200 hover:border-rose-100 rounded-lg font-black transition cursor-pointer" data-id="${res.id}">
          Hapus
        </button>
      </div>
    ` : `
      <span class="text-[10px] text-slate-400 font-bold block text-center">N/A</span>
    `;

    tr.innerHTML = `
      <td class="py-4.5 px-4 font-mono font-black text-indigo-650 text-indigo-600 leading-tight">${res.id}</td>
      <td class="py-4.5 px-4 block truncate max-w-[130px] font-black leading-tight text-slate-900">${res.guestName}</td>
      <td class="py-4.5 px-4 font-semibold text-slate-500 leading-none">${res.phone}</td>
      <td class="py-4.5 px-4 leading-none"><span class="px-2.5 py-1 text-[10px] bg-slate-100 rounded-lg font-black font-semibold text-slate-700 border border-slate-200/50">${res.roomType}</span></td>
      <td class="py-4.5 px-4 font-mono font-extrabold text-slate-800 text-center">${res.roomNumber || '-'}</td>
      <td class="py-4.5 px-4 leading-normal text-[11px] text-slate-500">
        <div>In: ${res.checkInDate}</div>
        <div class="text-[10px] text-slate-400">Out: ${res.checkOutDate} (${res.durationDays} Malam)</div>
      </td>
      <td class="py-4.5 px-4 font-mono font-black text-right text-slate-800">${formatIDR(res.totalCharge)}</td>
      <td class="py-4.5 px-4 text-center">
        <span class="px-2 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider ${statusClass}">${res.status}</span>
      </td>
      <td class="py-4.5 px-4 text-center">${actBtn}</td>
    `;

    // Hook listeners
    const editBtn = tr.querySelector('.res-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => openEditReservationModal(res.id));
    }
    const delBtn = tr.querySelector('.res-del-btn');
    if (delBtn) {
      delBtn.addEventListener('click', () => handleDeleteReservation(res.id));
    }

    tbody.appendChild(tr);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="py-16 text-center text-slate-400 font-semibold text-xs">
          Tidak ada data booking / reservasi terdaftar yang cocok dengan kriteria pencarian ini.
        </td>
      </tr>
    `;
  }
}

// === VIEW E: RIWAYAT TRANSAKSI kasir ===
function renderHistory() {
  const tbody = document.getElementById('history-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  const filtered = transactions.filter(t => {
    return activeHistoryMethod === 'All' || t.paymentMethod === activeHistoryMethod;
  });

  // Calculate KPIs stats dynamically
  let totalRevenue = 0;
  let checkInsCount = 0;
  let checkOutsCount = 0;

  filtered.forEach(t => {
    totalRevenue += t.amount || 0;
    if (t.type === 'Check In') checkInsCount++;
    else if (t.type === 'Check Out') checkOutsCount++;

    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/50 font-semibold text-[11.5px]';
    
    // Status colors format
    const isCI = t.type === 'Check In';
    const actBadge = isCI 
      ? '<span class="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[8.5px] font-black uppercase tracking-wider border border-amber-100">Check-In</span>'
      : '<span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[8.5px] font-black uppercase tracking-wider border border-emerald-100">Check-Out</span>';

    tr.innerHTML = `
      <td class="px-3 py-3.5 font-mono font-black text-indigo-600">${t.id}</td>
      <td class="px-3 py-3.5 text-slate-400 font-medium leading-none">${new Date(t.date).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})} WIB</td>
      <td class="px-3 py-3.5 font-black text-slate-800 truncate max-w-[120px] leading-tight">${t.guestName}</td>
      <td class="px-3 py-3.5 font-mono text-center text-slate-600">Kamar ${t.roomNumber}</td>
      <td class="px-3 py-3.5 text-center">${actBadge}</td>
      <td class="px-3 py-3.5 text-right font-mono font-extrabold text-slate-900">${formatIDR(t.amount)}</td>
      <td class="px-3 py-3.5 text-center">
        <button class="print-receipt-btn px-2 py-1 bg-slate-100 border border-slate-205 hover:bg-indigo-50 border-slate-200 text-[10px] text-indigo-650 text-indigo-600 rounded-lg transition-all font-black hover:border-indigo-150 cursor-pointer" data-id="${t.id}">Cetak</button>
      </td>
    `;

    // Click trigger updates printing simulator box
    tr.querySelector('.print-receipt-btn').addEventListener('click', () => {
      showThermalReceiptSimulator(t.id);
    });

    tbody.appendChild(tr);
  });

  // Write stats KPI
  document.getElementById('hist-total-revenue').textContent = formatIDR(totalRevenue);
  document.getElementById('hist-checkin-count').textContent = `${checkInsCount} trx`;
  document.getElementById('hist-checkout-count').textContent = `${checkOutsCount} trx`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-12 text-center text-slate-400 font-semibold">
          Tidak ada data transaksi finansial kasir tercatat untuk kriteria pembayaran terpilih.
        </td>
      </tr>
    `;
  }
}

function showThermalReceiptSimulator(trxId) {
  const prtBox = document.getElementById('receipt-printer-box');
  if (!prtBox) return;

  const trx = transactions.find(t => t.id === trxId);
  if (!trx) return;

  // Render a lovely paper roll receipts layout inside sidecard
  prtBox.innerHTML = `
    <div class="bg-[#FCFCFC] border border-slate-250 border-indigo-100 p-5 rounded-xl shadow-inner text-left font-mono text-slate-700 text-[11px] animate-fadeIn leading-relaxed space-y-4">
      <div class="text-center space-y-1">
        <h4 class="font-extrabold text-slate-900 text-xs tracking-tight uppercase">LUMINA STAY HOTELS</h4>
        <p class="text-[9px] text-slate-400 leading-tight">PITUROOMS GROUP INNS</p>
        <p class="text-[9px] text-slate-400 leading-none">Jl. Pitu No.7, Surakarta, Jawa Tengah</p>
        <p class="text-[8.5px] text-slate-400">Telp: +62 271-778899</p>
      </div>

      <div class="border-b border-dashed border-slate-300 py-1 flex justify-between text-[9px] text-slate-400 leading-none">
        <span>No: ${trx.id}</span>
        <span>${new Date(trx.date).toLocaleString('id-ID')}</span>
      </div>

      <div class="space-y-1.5 py-1">
        <div class="flex justify-between">
          <span class="font-bold text-slate-400 uppercase">Tamu:</span>
          <span class="font-bold text-slate-800 text-right truncate max-w-[150px]">${trx.guestName}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-bold text-slate-400 uppercase">Akomodasi:</span>
          <span class="font-bold text-slate-800 text-right">${trx.roomType} (${trx.roomNumber})</span>
        </div>
        <div class="flex justify-between">
          <span class="font-bold text-slate-400 uppercase">Transaksi:</span>
          <span class="font-bold text-[#10b981] text-right uppercase">${trx.type}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-bold text-slate-400 uppercase">Kanal Transaksi:</span>
          <span class="font-bold text-slate-800 text-right">${trx.paymentMethod}</span>
        </div>
      </div>

      <div class="border-t border-b border-dashed border-slate-350 border-slate-300 py-3.5 flex justify-between text-xs my-2 font-black text-slate-900 leading-none bg-slate-50/50 px-2 rounded">
        <span>TOTAL SETTLMENT:</span>
        <span>${formatIDR(trx.amount)}</span>
      </div>

      <div class="text-center space-y-1 text-[8.5px] text-slate-400 pt-3">
        <p>Kasir/Penerima: ${trx.resepsionis || 'Sistem HOS'}</p>
        <p class="font-bold uppercase tracking-widest text-[7px] mt-1 text-slate-350">*** TERIMA KASIH ATAS KUNJUNGAN KELUARGA ANDA ***</p>
      </div>

      <div class="pt-3 border-t border-dashed border-slate-150 flex gap-2">
        <button onclick="alert('Mengirim sinyal cetak ke printer kasir miniatur...')" class="w-full bg-slate-950/90 hover:bg-slate-900 border text-white rounded-lg text-[9px] font-black px-2.5 py-2 uppercase select-none cursor-pointer text-center leading-none">Print Receipt</button>
      </div>
    </div>
  `;
}

// === VIEW F: ADMIN EXECUTIVE DASHBOARD ===
function renderAdminDashboard() {
  const cFoodList = document.getElementById('culinary-food-list');
  if (!cFoodList) return;
  cFoodList.innerHTML = '';

  INITIAL_CULINARY_ORDERS.forEach(food => {
    const d = document.createElement('div');
    d.className = 'p-3 hover:bg-slate-50 transition border border-dashed border-slate-100 rounded-xl flex justify-between items-center';
    d.innerHTML = `
      <div class="leading-tight">
        <h5 class="font-extrabold text-slate-900 text-xs">${food.name}</h5>
        <p class="text-[9.5px] text-slate-400 font-bold mt-0.5 uppercase tracking-wide">${food.type}</p>
      </div>
      <div class="text-right flex items-center gap-3">
        <div class="leading-none text-right">
          <span class="text-xs font-black text-slate-850 text-slate-800 block">${food.ordersCount}x</span>
          <p class="text-[7.5px] text-slate-400 font-black tracking-wider uppercase mt-0.5 block leading-none">Kuantitas</p>
        </div>
        <span class="px-2 py-1 rounded text-[8.5px] font-black ${food.tagColor} border leading-none">${food.rating} ★</span>
      </div>
    `;
    cFoodList.appendChild(d);
  });
}

// === VIEW G: ADMIN ROOMS MANAGER ===
function renderAdminRooms() {
  const grid = document.getElementById('admin-rooms-list');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = rooms.filter(r => {
    if (currentAdminRoomsFilter === 'available') return r.status === 'Available';
    if (currentAdminRoomsFilter === 'occupied') return r.status === 'Occupied';
    if (currentAdminRoomsFilter === 'outoforder') return r.status === 'OutofOrder';
    return true; // all
  });

  filtered.forEach(room => {
    const isAvailable = room.status === 'Available';
    const isOccupied = room.status === 'Occupied';
    const isRepair = room.status === 'OutofOrder';

    let selectBorder = 'border-slate-200 hover:border-slate-350';
    let statusClass = 'text-slate-800';
    if (isAvailable) statusClass = 'text-emerald-700 bg-emerald-50 border-emerald-100 border';
    else if (isOccupied) statusClass = 'text-amber-700 bg-amber-50 border-amber-100 border';
    else if (isRepair) statusClass = 'text-rose-700 bg-rose-50 border-rose-100 border';

    const card = document.createElement('div');
    card.className = `p-4.5 bg-white border rounded-xl shadow-xs transition-all ${selectBorder} text-xs font-semibold flex flex-col justify-between min-h-[145px] animate-fadeIn`;
    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <span class="text-[8.5px] text-slate-400 font-black uppercase">Unit ID: ${room.id}</span>
          <h4 class="text-sm font-black text-slate-900 mt-0.5 leading-none">Kamar #${room.number}</h4>
          <span class="text-[9.5px] font-black text-indigo-600 block mt-1 uppercase">${room.type}</span>
        </div>
        <span class="px-2 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider ${statusClass}">${room.status}</span>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-100/60 leading-tight space-y-3">
        <p class="text-slate-500 font-medium">Beban Menginap: <span class="font-mono font-bold text-slate-900">${formatIDR(room.pricePerNight)}</span> / Malam</p>
        
        <div class="flex items-center gap-2">
          <span class="text-[9px] uppercase font-bold text-slate-400">Set Status:</span>
          <select class="admin-room-status-select px-2.5 py-1 text-[10px] font-black border border-slate-200 rounded-lg bg-white shrink-0 focus:outline-none" data-id="${room.id}">
            <option value="Available" ${isAvailable ? 'selected' : ''}>Available</option>
            <option value="Occupied" ${isOccupied ? 'selected' : ''}>Occupied</option>
            <option value="OutofOrder" ${isRepair ? 'selected' : ''}>Out of Order</option>
          </select>
        </div>
      </div>
    `;

    // Direct state controller
    card.querySelector('.admin-room-status-select').addEventListener('change', (e) => {
      const targetRoom = rooms.find(rm => rm.id === room.id);
      if (targetRoom) {
        targetRoom.status = e.target.value;
        syncToLocalStorage();
        triggerSubRenderers();
      }
    });

    grid.appendChild(card);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400 font-semibold">
        Tidak ada kamar terdaftar yang sesuai.
      </div>
    `;
  }
}

// === VIEW H: ADMIN USERS MANAGER ===
function renderAdminUsers() {
  const tbody = document.getElementById('admin-users-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  document.getElementById('admin-user-count').textContent = users.length;

  users.forEach(u => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/50';

    const roleColor = u.role === 'Admin' ? 'text-emerald-700 bg-emerald-50 border-emerald-100 border' : 'text-blue-700 bg-blue-50 border-blue-100 border';

    tr.innerHTML = `
      <td class="px-6 py-4 font-black text-slate-800 tracking-tight leading-none">${u.fullname}</td>
      <td class="px-6 py-4 font-mono font-bold text-slate-500 text-xs">${u.username}</td>
      <td class="px-6 py-4 leading-none">
        <span class="px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${roleColor}">${u.role}</span>
      </td>
      <td class="px-6 py-4 text-right">
        <div class="flex items-center justify-end gap-1.5 select-none">
          <button class="user-edit-btn px-2 py-1 bg-slate-50 border border-slate-200 text-indigo-600 font-black hover:bg-slate-100 rounded-lg text-[10px] cursor-pointer" data-id="${u.id}">Edit</button>
          <button class="user-del-btn px-2 py-1 bg-slate-50 border border-slate-205 text-rose-500 font-black hover:bg-rose-50 rounded-lg text-[10px] cursor-pointer" data-id="${u.id}">Hapus</button>
        </div>
      </td>
    `;

    tr.querySelector('.user-edit-btn').addEventListener('click', () => openAdminUserEdit(u.id));
    tr.querySelector('.user-del-btn').addEventListener('click', () => deleteAdminUser(u.id));

    tbody.appendChild(tr);
  });
}

function openAdminUserEdit(userId) {
  const user = users.find(u => u.id === userId);
  if (!user) return;

  document.getElementById('admin-user-form-title').textContent = 'Ubah Akun Karyawan';
  document.getElementById('admin-user-form-sub').textContent = `Menyunting data akun #${user.username}`;
  document.getElementById('admin-user-edit-id').value = user.id;
  document.getElementById('admin-user-fullname').value = user.fullname;
  document.getElementById('admin-user-username').value = user.username;
  document.getElementById('admin-user-password').value = user.password;
  
  // Set role radio options
  document.querySelectorAll('input[name="admin-user-role"]').forEach(radio => {
    radio.checked = (radio.value === user.role);
  });

  // Display cancel option
  document.getElementById('admin-user-btn-cancel').classList.remove('hidden');
}

function cleanUserForms() {
  document.getElementById('admin-user-form-title').textContent = 'Registrasi Pengguna Baru';
  document.getElementById('admin-user-form-sub').textContent = 'Buat kredensial login unik HOS.';
  document.getElementById('admin-user-edit-id').value = '';
  document.getElementById('admin-user-fullname').value = '';
  document.getElementById('admin-user-username').value = '';
  document.getElementById('admin-user-password').value = '';
  document.getElementById('admin-user-btn-cancel').classList.add('hidden');
}

// === VIEW I: GUEST DATABASE CHEETS ===
function renderAdminGuests() {
  const tbody = document.getElementById('admin-guest-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  // Tab dynamic KPI counters
  document.getElementById('kpi-guests-inhouse').textContent = `${reservations.filter(r => r.status === 'CheckedIn').length} Tamu`;
  document.getElementById('kpi-guests-confirmed').textContent = `${reservations.filter(r => r.status === 'Confirmed').length} Booking`;
  document.getElementById('kpi-guests-checkedout').textContent = `${reservations.filter(r => r.status === 'CheckedOut').length} Pengunjung`;

  const filtered = reservations.filter(res => {
    let matchTab = true;
    if (currentGuestsTab === 'inhouse') matchTab = (res.status === 'CheckedIn');
    else if (currentGuestsTab === 'pending') matchTab = (res.status === 'Confirmed');
    else if (currentGuestsTab === 'out') matchTab = (res.status === 'CheckedOut');

    const matchSearch = !searchFilterStr ||
      res.guestName.toLowerCase().includes(searchFilterStr.toLowerCase()) ||
      res.phone.includes(searchFilterStr) ||
      (res.roomNumber && res.roomNumber.includes(searchFilterStr));

    return matchTab && matchSearch;
  });

  filtered.forEach(res => {
    let statusClass = 'bg-blue-50 text-blue-700 border-blue-150 border';
    if (res.status === 'CheckedIn') statusClass = 'bg-amber-50 text-amber-700 border border-amber-100';
    else if (res.status === 'CheckedOut') statusClass = 'bg-emerald-50 text-emerald-700 border border-emerald-100';

    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/50 leading-tight';
    tr.innerHTML = `
      <td class="px-6 py-4.5">
        <div class="font-black text-slate-800 text-xs">${res.guestName}</div>
        <div class="text-[10px] text-slate-400 font-mono mt-0.5">ID: ${res.identityNo || '-'}</div>
      </td>
      <td class="px-6 py-4.5">
        <div class="text-slate-600 font-bold">${res.phone}</div>
        <div class="text-[10px] text-slate-400 font-medium">${res.email || '-'}</div>
      </td>
      <td class="px-6 py-4.5">
        <div class="font-extrabold text-[#1a73e8]">${res.roomType} Class</div>
        <div class="text-[10px] font-mono text-slate-450 mt-0.5">No. Unit: <span class="font-bold text-slate-800">${res.roomNumber || '-'}</span></div>
      </td>
      <td class="px-6 py-4.5 text-[11px] text-slate-500 font-bold">
        <div>Dari: <span class="text-slate-800">${res.checkInDate}</span></div>
        <div class="mt-0.5">Hingga: <span class="text-slate-800">${res.checkOutDate}</span></div>
      </td>
      <td class="px-6 py-4.5">
        <span class="px-2.5 py-1 bg-slate-100 border border-slate-200 hover:bg-slate-150 rounded text-[9.5px] font-black uppercase text-slate-600">${res.isOnlineBooking ? 'Online OTA' : 'Offline Walk-In'}</span>
      </td>
      <td class="px-6 py-4.5 text-center">
        <span class="px-2 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider ${statusClass}">${res.status}</span>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-12 text-center text-slate-400 font-bold">
          Tidak ada data log yang cocok dengan tab pencarian saat ini.
        </td>
      </tr>
    `;
  }
}


// --- 5. MODAL FORM OVERLAYS ACTIONS ---

// Open add Form
function openAddReservationModal() {
  const m = document.getElementById('modal-add-reservation');
  if (m) {
    m.classList.remove('hidden');
    // Set minimal values default to current system date
    const todayStr = new Date().toISOString().substring(0, 10);
    document.getElementById('modal-add-res-ci').value = todayStr;
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('modal-add-res-co').value = tomorrow.toISOString().substring(0, 10);
    
    calculateModalTotalPrice();
  }
}

function calculateModalTotalPrice() {
  const type = document.getElementById('modal-add-res-room-type').value;
  const days = parseInt(document.getElementById('modal-add-res-duration').value) || 1;
  const rate = type === 'Deluxe' ? 850000 : 600000;
  
  document.getElementById('modal-add-res-total-price').textContent = formatIDR(rate * days);
}

// Open edit form in Admin reserves
function openEditReservationModal(resId) {
  const modal = document.getElementById('modal-edit-reservation');
  const res = reservations.find(r => r.id === resId);
  if (!modal || !res) return;

  modal.classList.remove('hidden');
  document.getElementById('modal-edit-id-label').textContent = `#${res.id}`;
  document.getElementById('modal-edit-id-field').value = res.id;
  document.getElementById('modal-edit-res-name').value = res.guestName;
  document.getElementById('modal-edit-res-identity').value = res.identityNo || '';
  document.getElementById('modal-edit-res-phone').value = res.phone;
  document.getElementById('modal-edit-res-email').value = res.email || '';
  document.getElementById('modal-edit-res-room-type').value = res.roomType;
  document.getElementById('modal-edit-res-ci').value = res.checkInDate;
  document.getElementById('modal-edit-res-co').value = res.checkOutDate;
  document.getElementById('modal-edit-res-duration').value = res.durationDays;
  document.getElementById('modal-edit-res-room-number').value = res.roomNumber || '';
  document.getElementById('modal-edit-res-status').value = res.status;

  calculateModalEditTotalPrice();
}

function calculateModalEditTotalPrice() {
  const type = document.getElementById('modal-edit-res-room-type').value;
  const days = parseInt(document.getElementById('modal-edit-res-duration').value) || 1;
  const rate = type === 'Deluxe' ? 850000 : 600000;
  
  document.getElementById('modal-edit-res-total-price').textContent = formatIDR(rate * days);
}


// --- 6. CORE LOGIC WORKFLOW ACTIONS ---

// Active Login submit handler
function handleLogin(e) {
  e.preventDefault();
  const userNameVal = document.getElementById('login-username').value.trim();
  const passWordVal = document.getElementById('login-password').value.trim();

  // Search profiles matching
  const matchingUser = users.find(u => u.username === userNameVal && u.password === passWordVal);

  if (matchingUser) {
    activeUser = matchingUser;
    localStorage.setItem('lumina_active_user', JSON.stringify(activeUser));
    
    // Clear form and display screen transitions
    document.getElementById('login-form').reset();
    document.getElementById('login-error').classList.add('hidden');
    
    launchSystemSession();
  } else {
    document.getElementById('login-error').classList.remove('hidden');
  }
}

// System boots up
function launchSystemSession() {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('app-container').classList.remove('hidden');

  // Trigger role visibility constraints
  const isAdmin = (activeUser.role === 'Admin');
  const adminNav = document.getElementById('admin-nav-group');
  const receptionistNav = document.getElementById('receptionist-nav-group');
  if (adminNav) {
    if (isAdmin) adminNav.classList.remove('hidden');
    else adminNav.classList.add('hidden');
  }
  if (receptionistNav) {
    if (isAdmin) receptionistNav.classList.add('hidden');
    else receptionistNav.classList.remove('hidden');
  }

  // Populate profiles labels at top headers and sidebar bases
  document.getElementById('user-initials').textContent = activeUser.fullname.charAt(0);
  document.getElementById('user-name').textContent = activeUser.fullname;
  document.getElementById('user-role').textContent = activeUser.role === 'Admin' ? 'Admin Eksekutif' : 'Staf Resepsionis';
  
  document.getElementById('header-avatar').textContent = activeUser.fullname.charAt(0);
  document.getElementById('header-user-name').textContent = activeUser.fullname;
  document.getElementById('header-user-role').textContent = activeUser.role === 'Admin' ? 'ADMIN OS' : 'RESEPTIONSIT';

  // Open default menu
  if (isAdmin) navigate('adminDashboard');
  else navigate('dashboard');
}

function handleLogout() {
  activeUser = null;
  localStorage.removeItem('lumina_active_user');
  
  document.getElementById('app-container').classList.add('hidden');
  document.getElementById('login-container').classList.remove('hidden');
}


// --- 7. COMPLETE DYNAMIC ACTIONS SUBMISSION & HANDLERS ---

// A. Walk-in or Reservation Check-In processing submit
function executeCompleteCheckin() {
  const isWalkin = !document.getElementById('panel-checkin-walkin').classList.contains('hidden');

  // Form selections and data pushes
  if (isWalkin) {
    const guestN = document.getElementById('walkin-name').value.trim();
    const identity = document.getElementById('walkin-identity').value.trim();
    const phone = document.getElementById('walkin-phone').value.trim();
    const email = document.getElementById('walkin-email').value.trim();
    const rType = document.getElementById('walkin-room-type').value;
    const roomN = document.getElementById('walkin-room-number').value;
    const checkin = document.getElementById('walkin-checkin-date').value;
    const checkout = document.getElementById('walkin-checkout-date').value;
    const duration = parseInt(document.getElementById('walkin-duration').value) || 1;
    const payMethod = document.querySelector('input[name="payment-method"]:checked').value;

    if (!guestN || !identity || !phone || !roomN || !checkin || !checkout) {
      alert('Mohon isi seluruh bidang formulir walk-in berstatus wajib (*) terlebih dahulu!');
      return;
    }

    // Double validations of money received on cash method
    const roomPrice = rType === 'Deluxe' ? 850000 : 600000;
    const totalCharge = roomPrice * duration;

    let payAmt = totalCharge;
    let changeAmt = 0;
    if (payMethod === 'Cash') {
      payAmt = parseInt(document.getElementById('payment-amount-paid').value) || 0;
      if (payAmt < totalCharge) {
        alert('Nominal tunai yang diserahkan kurang dari subtotal biaya menginap!');
        return;
      }
      changeAmt = payAmt - totalCharge;
    }

    // Set Room status to Occupied
    const roomObj = rooms.find(r => r.number === roomN);
    if (roomObj) roomObj.status = 'Occupied';

    // Build reservation record
    const resId = 'RES-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newRes = {
      id: resId,
      guestName: guestN,
      identityNo: identity,
      phone: phone,
      email: email,
      roomType: rType,
      roomNumber: roomN,
      checkInDate: checkin,
      checkOutDate: checkout,
      durationDays: duration,
      totalCharge: totalCharge,
      isOnlineBooking: false,
      status: 'CheckedIn',
      paymentMethod: payMethod,
      amountPaid: payAmt,
      changeAmount: changeAmt
    };

    reservations.unshift(newRes);

    // Build checkout transaction Ledger log
    const trxId = 'TRX-' + Math.floor(1000 + Math.random() * 9000);
    const newTrx = {
      id: trxId,
      date: new Date().toISOString(),
      guestName: guestN,
      roomType: rType,
      roomNumber: roomN,
      type: 'Check In',
      amount: totalCharge,
      paymentMethod: payMethod,
      resepsionis: activeUser.fullname
    };

    transactions.unshift(newTrx);
    syncToLocalStorage();
    alert(`Sukses Walk-in! Tamu ${guestN} ditempatkan di Kamar #${roomN}.`);
    
    // Clear forms and reset lists
    document.getElementById('walkin-name').value = '';
    document.getElementById('walkin-identity').value = '';
    document.getElementById('walkin-phone').value = '';
    document.getElementById('walkin-email').value = '';
    document.getElementById('payment-amount-paid').value = '';

    navigate('dashboard');

  } else {
    // Online code mode
    const bookCode = document.getElementById('online-booking-code').value.trim();
    const roomN = document.getElementById('online-room-number').value;

    if (!bookCode || !roomN) {
      alert('Verifikasi kode Booking dan masukkan alokasi nomor unit kamar terlebih dahulu!');
      return;
    }

    const resObj = reservations.find(r => r.id === bookCode && r.status === 'Confirmed');
    if (!resObj) {
      alert('Pencarian database gagal atau status tamu bukan Confirmed!');
      return;
    }

    // Update Room statuses
    const roomObj = rooms.find(r => r.number === roomN);
    if (roomObj) roomObj.status = 'Occupied';

    // Update reservations statuses values
    resObj.status = 'CheckedIn';
    resObj.roomNumber = roomN;
    resObj.paymentMethod = 'Online Paid';
    resObj.amountPaid = resObj.totalCharge;
    resObj.changeAmount = 0;

    // Update Firebase booking juga, jika booking berasal dari Firebase
    if (resObj.firebaseId && typeof database !== 'undefined' && database && database.ref) {
      database.ref(`bookings/${resObj.firebaseId}`).update({
        status: 'CheckedIn',
        roomNumber: roomN,
        paymentStatus: 'Lunas',
        checkedInAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }).catch(err => console.warn('Gagal update status Firebase:', err));
    }

    // Log transaction history
    const trxId = 'TRX-' + Math.floor(1000 + Math.random() * 9000);
    const newTrx = {
      id: trxId,
      date: new Date().toISOString(),
      guestName: resObj.guestName,
      roomType: resObj.roomType,
      roomNumber: roomN,
      type: 'Check In',
      amount: resObj.totalCharge,
      paymentMethod: 'Online Paid',
      resepsionis: activeUser.fullname
    };

    transactions.unshift(newTrx);
    syncToLocalStorage();

    alert(`Sukses Pelunasan OTA! Tamu ${resObj.guestName} check-in ke Kamar #${roomN}.`);
    
    // Reset indicators
    document.getElementById('online-booking-code').value = '';
    document.getElementById('online-verified-card').classList.add('hidden');
    
    navigate('dashboard');
  }
}

// B. OTA Code verifications checking
function normalizeOTACode(code) {
  return String(code || '').trim().toUpperCase().replace(/\s+/g, '');
}

function withTimeout(promise, ms = 8000) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase terlalu lama merespons')), ms))
  ]);
}

function mapFirebaseBookingToReservation(booking) {
  const code = booking.code || booking.bookingCode || booking.otaCode || booking.reservationCode || booking.invoiceCode || booking.id;
  const checkIn = booking.checkIn || booking.checkin || booking.checkInDate || '';
  const checkOut = booking.checkOut || booking.checkout || booking.checkOutDate || '';
  const duration = Number(booking.duration || booking.durationDays || 1) || 1;
  const total = Number(booking.total || booking.totalCharge || booking.subtotal || 0) || 0;
  const roomTypeRaw = booking.roomType || booking.roomName || 'Deluxe';
  const roomType = String(roomTypeRaw).toLowerCase().includes('studio') ? 'Studio' : 'Deluxe';

  return {
    id: normalizeOTACode(code),
    firebaseId: booking.id || booking.bookingId || '',
    bookingCode: normalizeOTACode(code),
    guestName: booking.guestName || booking.customerName || booking.name || '-',
    identityNo: booking.identity || booking.identityNo || '-',
    phone: booking.customerPhone || booking.phone || '-',
    email: booking.customerEmail || booking.email || '-',
    roomType,
    roomNumber: booking.roomNumber || '',
    checkInDate: checkIn,
    checkOutDate: checkOut,
    durationDays: duration,
    totalCharge: total,
    isOnlineBooking: true,
    status: booking.status || 'Confirmed',
    paymentMethod: booking.paymentMethod || booking.paymentSubMethod || 'Online Paid',
    paymentStatus: booking.paymentStatus || 'Lunas',
    amountPaid: String(booking.paymentStatus || '').toLowerCase().includes('belum') ? 0 : total,
    changeAmount: 0
  };
}

async function findBookingInFirebaseOrLocal(code) {
  const cleanCode = normalizeOTACode(code);

  // 1) Firebase langsung dari path bookings
  if (typeof getBookingByCode === 'function') {
    try {
      const result = await withTimeout(getBookingByCode(cleanCode), 8000);
      if (result && result.success && result.booking) {
        return mapFirebaseBookingToReservation(result.booking);
      }
    } catch (err) {
      console.warn('Firebase search gagal / timeout:', err);
    }
  }

  // 2) Fallback manual Firebase, kalau fungsi global tidak terbaca
  if (typeof database !== 'undefined' && database && database.ref) {
    try {
      const snapshot = await withTimeout(database.ref('bookings').once('value'), 8000);
      let found = null;
      snapshot.forEach(child => {
        const booking = { id: child.key, ...child.val() };
        const firebaseCode = normalizeOTACode(
          booking.code || booking.bookingCode || booking.otaCode || booking.reservationCode || booking.invoiceCode
        );
        if (firebaseCode === cleanCode) found = booking;
      });
      if (found) return mapFirebaseBookingToReservation(found);
    } catch (err) {
      console.warn('Manual Firebase search gagal / timeout:', err);
    }
  }

  // 3) Fallback lokal dummy/localStorage
  return reservations.find(r => {
    const localCode = normalizeOTACode(r.id || r.bookingCode || r.code);
    return localCode === cleanCode;
  }) || null;
}

async function handleVerifyOTABooking(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const btn = document.getElementById('verify-booking-btn');
  const input = document.getElementById('online-booking-code');
  const card = document.getElementById('online-verified-card');
  const selectUnit = document.getElementById('online-room-number');
  const originalText = btn ? btn.textContent : 'Verifikasi & Cari Kode';
  const code = normalizeOTACode(input ? input.value : '');

  if (!code) {
    alert('Masukkan kode booking terlebih dahulu!');
    return;
  }

  try {
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Mencari...';
      btn.classList.add('opacity-70', 'cursor-not-allowed');
    }
    if (card) card.classList.add('hidden');

    let res = await findBookingInFirebaseOrLocal(code);

    if (!res) {
      alert('Kode booking tidak ditemukan di Firebase atau data lokal. Pastikan kode sama persis dengan invoice customer.');
      return;
    }

    if (res.status === 'CheckedIn') {
      alert('Kode booking ditemukan, tetapi statusnya sudah Checked-In.');
      return;
    }

    // Simpan / update ke data lokal resepsionis supaya tombol check-in bisa memprosesnya.
    const idx = reservations.findIndex(r => normalizeOTACode(r.id || r.bookingCode || r.code) === code);
    if (idx >= 0) reservations[idx] = { ...reservations[idx], ...res, status: res.status || reservations[idx].status || 'Confirmed' };
    else reservations.unshift({ ...res, status: res.status || 'Confirmed' });
    syncToLocalStorage();

    const activeRes = reservations.find(r => normalizeOTACode(r.id || r.bookingCode || r.code) === code);
    if (!activeRes) {
      alert('Kode booking berhasil dibaca, tetapi gagal dimuat ke data resepsionis.');
      return;
    }

    if (card) card.classList.remove('hidden');
    document.getElementById('verified-guest-name').textContent = activeRes.guestName || '-';
    document.getElementById('verified-guest-phone').textContent = activeRes.phone || '-';
    document.getElementById('verified-room-type').textContent = `${activeRes.roomType || '-'} Type`;
    document.getElementById('verified-ci-date').textContent = activeRes.checkInDate || '-';
    document.getElementById('verified-co-date').textContent = activeRes.checkOutDate || '-';
    document.getElementById('verified-duration').textContent = activeRes.durationDays || 1;

    if (selectUnit) {
      selectUnit.innerHTML = '';
      const available = rooms.filter(r => r.type === activeRes.roomType && r.status === 'Available');
      available.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.number;
        opt.textContent = `KAMAR ${r.number} - (Tersedia)`;
        selectUnit.appendChild(opt);
      });
      if (available.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'Kamar penuh untuk kategori ini!';
        selectUnit.appendChild(opt);
      }
    }

    document.getElementById('payment-calc-subtotal').textContent = 'LUNAS DI OTA';
    alert('Kode booking ditemukan. Silakan pilih kamar lalu klik Proses & Aktifkan Kunci Kamar.');

  } catch (error) {
    console.error('Error verifikasi kode booking:', error);
    alert('Gagal mencari kode booking: ' + (error.message || error));
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = originalText || 'Verifikasi & Cari Kode';
      btn.classList.remove('opacity-70', 'cursor-not-allowed');
    }
  }
}

// C. Settle checkout and penalty releases
function executeCompleteCheckout() {
  const roomN = document.getElementById('checkout-room-select').value;
  if (!roomN) {
    alert('Pilih nomor kamar terlebih dahulu!');
    return;
  }

  // Find active occupier
  const activeRes = reservations.find(r => r.roomNumber === roomN && r.status === 'CheckedIn');
  if (!activeRes) return;

  const late = parseInt(document.getElementById('checkout-surcharge-late').value) || 0;
  const mini = parseInt(document.getElementById('checkout-surcharge-minibar').value) || 0;
  const dmg = parseInt(document.getElementById('checkout-surcharge-damage').value) || 0;
  const remarks = document.getElementById('checkout-remarks').value.trim();
  const payMethod = document.querySelector('input[name="checkout-payment-method"]:checked').value;

  const extrasSum = late + mini + dmg;

  // Settle room to Available
  const roomObj = rooms.find(r => r.number === roomN);
  if (roomObj) roomObj.status = 'Available';

  // Set reservation to CheckedOut
  activeRes.status = 'CheckedOut';

  // Push new transaction financial log if surcharges are present, otherwise log exit zero
  const trxId = 'TRX-' + Math.floor(1000 + Math.random() * 9000);
  const newTrx = {
    id: trxId,
    date: new Date().toISOString(),
    guestName: activeRes.guestName,
    roomType: activeRes.roomType,
    roomNumber: roomN,
    type: 'Check Out',
    amount: extrasSum,
    paymentMethod: payMethod,
    resepsionis: activeUser.fullname
  };

  transactions.unshift(newTrx);
  syncToLocalStorage();

  alert(`Checkout berhasil! Kamar ${roomN} dikembalikan statusnya ke Tersedia.`);
  
  // Clear forms
  document.getElementById('checkout-surcharge-late').value = '0';
  document.getElementById('checkout-surcharge-minibar').value = '0';
  document.getElementById('checkout-surcharge-damage').value = '0';
  document.getElementById('checkout-remarks').value = '';

  // Show thermal receipt in transaction view after auto navigation
  navigate('history');
  showThermalReceiptSimulator(trxId);
}

// D. Add dynamic reservations from receptionist
function handleAddReservationSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('modal-add-res-name').value.trim();
  const identity = document.getElementById('modal-add-res-identity').value.trim();
  const phone = document.getElementById('modal-add-res-phone').value.trim();
  const email = document.getElementById('modal-add-res-email').value.trim();
  const roomType = document.getElementById('modal-add-res-room-type').value;
  const ci = document.getElementById('modal-add-res-ci').value;
  const co = document.getElementById('modal-add-res-co').value;
  const duration = parseInt(document.getElementById('modal-add-res-duration').value) || 1;
  const isOnline = document.querySelector('input[name="modal-add-res-cat"]:checked').value === 'Online';

  const rate = roomType === 'Deluxe' ? 850000 : 600000;
  const total = rate * duration;

  // Online code starts with PITU-, walkin with RES-
  const bookId = isOnline ? 'PITU-' + Math.floor(1000 + Math.random() * 9000) : 'RES-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  const newRes = {
    id: bookId,
    guestName: name,
    identityNo: identity,
    phone: phone,
    email: email,
    roomType: roomType,
    roomNumber: '',
    checkInDate: ci,
    checkOutDate: co,
    durationDays: duration,
    totalCharge: total,
    isOnlineBooking: isOnline,
    status: 'Confirmed'
  };

  reservations.unshift(newRes);
  syncToLocalStorage();

  alert(`Reservasi Baru Terbentuk! ID Booking: ${bookId}`);
  document.getElementById('modal-add-res-form').reset();
  document.getElementById('modal-add-reservation').classList.add('hidden');

  triggerSubRenderers();
}

// E. Edit reservations from Admin
function handleEditReservationSubmit(e) {
  e.preventDefault();

  const resId = document.getElementById('modal-edit-id-field').value;
  const targetRes = reservations.find(r => r.id === resId);
  if (!targetRes) return;

  const oNo = targetRes.roomNumber;

  targetRes.guestName = document.getElementById('modal-edit-res-name').value.trim();
  targetRes.identityNo = document.getElementById('modal-edit-res-identity').value.trim();
  targetRes.phone = document.getElementById('modal-edit-res-phone').value.trim();
  targetRes.email = document.getElementById('modal-edit-res-email').value.trim();
  targetRes.roomType = document.getElementById('modal-edit-res-room-type').value;
  targetRes.checkInDate = document.getElementById('modal-edit-res-ci').value;
  targetRes.checkOutDate = document.getElementById('modal-edit-res-co').value;
  targetRes.durationDays = parseInt(document.getElementById('modal-edit-res-duration').value) || 1;
  
  const nNo = document.getElementById('modal-edit-res-room-number').value.trim();
  targetRes.roomNumber = nNo;
  targetRes.status = document.getElementById('modal-edit-res-status').value;

  const rate = targetRes.roomType === 'Deluxe' ? 850000 : 600000;
  targetRes.totalCharge = rate * targetRes.durationDays;

  // Synchronize room occupancy states if room assignment changes or status turns CheckedIn
  if (targetRes.status === 'CheckedIn' && nNo) {
    const roomObj = rooms.find(r => r.number === nNo);
    if (roomObj) roomObj.status = 'Occupied';
  } else if (targetRes.status === 'CheckedOut' && nNo) {
    const roomObj = rooms.find(r => r.number === nNo);
    if (roomObj) roomObj.status = 'Available';
  }

  // Free older room if updated
  if (oNo && oNo !== nNo) {
    const oldRm = rooms.find(r => r.number === oNo);
    if (oldRm) oldRm.status = 'Available';
  }

  syncToLocalStorage();
  alert(`Booking rincian #${resId} berhasil diperbarui!`);
  
  document.getElementById('modal-edit-reservation').classList.add('hidden');
  triggerSubRenderers();
}

function handleDeleteReservation(resId) {
  if (confirm(`Apakah Anda benar-benar yakin menghapus reservasi data #${resId}?`)) {
    const res = reservations.find(r => r.id === resId);
    if (res && res.roomNumber) {
      const room = rooms.find(r => r.number === res.roomNumber);
      if (room) room.status = 'Available';
    }

    reservations = reservations.filter(r => r.id !== resId);
    syncToLocalStorage();
    triggerSubRenderers();
  }
}

// F. Admin Room Creation form
function handleAddRoom(e) {
  e.preventDefault();

  const num = document.getElementById('add-room-number').value.trim();
  const type = document.querySelector('input[name="add-room-type"]:checked').value;
  const price = parseInt(document.getElementById('add-room-price').value) || 0;
  const status = document.getElementById('add-room-status').value;

  // Duplicate checks
  if (rooms.some(r => r.number === num)) {
    alert(`Nomor unit Kamar ${num} sudah terdaftar sebelumnya!`);
    return;
  }

  const newId = (type === 'Deluxe' ? 'd' : 's') + num;
  const newRoom = {
    id: newId,
    number: num,
    type: type,
    status: status,
    pricePerNight: price
  };

  rooms.push(newRoom);
  syncToLocalStorage();

  alert(`Kamar #${num} (${type}) sukses ditambahkan ke daftar properti hotel.`);
  document.getElementById('add-room-form').reset();
  triggerSubRenderers();
}

// G. Admin Users accounts additions or edits CRUD
function handleAdminUserSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('admin-user-edit-id').value;
  const fullname = document.getElementById('admin-user-fullname').value.trim();
  const username = document.getElementById('admin-user-username').value.trim();
  const password = document.getElementById('admin-user-password').value.trim();
  const role = document.querySelector('input[name="admin-user-role"]:checked').value;

  if (editId) {
    // Edit flow
    const user = users.find(u => u.id === editId);
    if (user) {
      user.fullname = fullname;
      user.username = username;
      user.password = password;
      user.role = role;
    }
  } else {
    // Add flow
    if (users.some(u => u.username === username)) {
      alert('Username tersebut sudah digunakan oleh akun karyawan lain!');
      return;
    }
    const newId = 'usr_' + Math.random().toString(36).substring(2, 6);
    users.push({
      id: newId,
      fullname: fullname,
      username: username,
      password: password,
      role: role
    });
  }

  syncToLocalStorage();
  alert('Data pengguna berhasil didaftarkan / disinkronkan.');
  document.getElementById('admin-user-form').reset();
  cleanUserForms();
  triggerSubRenderers();
}

function deleteAdminUser(id) {
  if (id === activeUser.id) {
    alert('Anda dilarang menghapus akun log-In Anda sendiri yang sedang aktif di loket!');
    return;
  }
  if (confirm('Apakah Anda yakin ingin meluncurkan penghapusan permanen akun staf?')) {
    users = users.filter(u => u.id !== id);
    syncToLocalStorage();
    triggerSubRenderers();
  }
}


// --- 8. GLOBAL EVENT LISTENERS ATTACHMENTS ---

window.addEventListener('DOMContentLoaded', () => {

  // A. Checking if already logged in via Session storage
  if (activeUser) {
    launchSystemSession();
  } else {
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
  }

  // B. Login form binding events
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // C. Log out buttons binding events
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // D. Sidebar Menu router switching hooks binding
  const menuBtnIds = [
    'dashboard', 'checkIn', 'checkOut', 'reservations', 'history',
    'adminDashboard', 'adminRooms', 'adminUsers', 'adminGuests'
  ];
  menuBtnIds.forEach(id => {
    const el = document.getElementById(`menu-btn-${id}`);
    if (el) {
      el.addEventListener('click', () => navigate(id));
    }
  });

  // E. Master Header Search Box listener filtering active panels on keyup
  const hSearch = document.getElementById('header-search-input');
  if (hSearch) {
    hSearch.addEventListener('input', (e) => {
      searchFilterStr = e.target.value.trim();
      
      // Instantly rerender appropriate lists
      if (currentMenu === 'dashboard') renderDashboard();
      else if (currentMenu === 'reservations') renderReservations();
      else if (currentMenu === 'adminGuests') renderAdminGuests();
    });
  }

  // F. View-specific listeners configurations:
  // F1. Room category filter highlights in Dashboard
  document.getElementById('dash-rooms-all').addEventListener('click', (e) => {
    currentRoomsFilter = 'all';
    document.querySelectorAll('[id^="dash-rooms-"]').forEach(btn => btn.className = 'px-3 py-1.5 font-bold rounded-lg transition-all text-slate-500 cursor-pointer');
    e.target.className = 'px-3.5 py-1.5 font-bold rounded-lg transition-all bg-white text-slate-900 shadow-sm cursor-pointer';
    renderDashboard();
  });
  document.getElementById('dash-rooms-deluxe').addEventListener('click', (e) => {
    currentRoomsFilter = 'Deluxe';
    document.querySelectorAll('[id^="dash-rooms-"]').forEach(btn => btn.className = 'px-3 py-1.5 font-bold rounded-lg transition-all text-slate-500 cursor-pointer');
    e.target.className = 'px-3.5 py-1.5 font-bold rounded-lg transition-all bg-indigo-50 text-indigo-700 shadow-sm cursor-pointer';
    renderDashboard();
  });
  document.getElementById('dash-rooms-studio').addEventListener('click', (e) => {
    currentRoomsFilter = 'Studio';
    document.querySelectorAll('[id^="dash-rooms-"]').forEach(btn => btn.className = 'px-3 py-1.5 font-bold rounded-lg transition-all text-slate-500 cursor-pointer');
    e.target.className = 'px-3.5 py-1.5 font-bold rounded-lg transition-all bg-indigo-50 text-indigo-700 shadow-sm cursor-pointer';
    renderDashboard();
  });

  // Category Summaries click router shortcuts
  document.getElementById('filter-type-deluxe-summary').addEventListener('click', () => {
    currentRoomsFilter = 'Deluxe';
    document.getElementById('dash-rooms-deluxe').click();
  });
  document.getElementById('filter-type-studio-summary').addEventListener('click', () => {
    currentRoomsFilter = 'Studio';
    document.getElementById('dash-rooms-studio').click();
  });

  // F2. Checkin Tab options bindings
  const tabWalk = document.getElementById('tab-checkin-walkin');
  const tabOnline = document.getElementById('tab-checkin-online');
  const panelWalk = document.getElementById('panel-checkin-walkin');
  const panelOnline = document.getElementById('panel-checkin-online');
  const completeCheckinBtn = document.getElementById('complete-checkin-btn');

  tabWalk.addEventListener('click', () => {
    tabWalk.className = 'px-5 py-3 border-b-2 border-indigo-600 text-indigo-600 font-extrabold cursor-pointer';
    tabOnline.className = 'px-5 py-3 border-b-2 border-transparent text-slate-400 hover:text-slate-800 cursor-pointer';
    panelWalk.classList.remove('hidden');
    panelOnline.classList.add('hidden');
    document.getElementById('payment-options-block').classList.remove('hidden');
    document.getElementById('cash-change-container').classList.remove('hidden');
    completeCheckinBtn.textContent = 'Proses & Aktifkan Kunci Kamar ➔';
    calculateWalkinTotalPrice();
  });

  tabOnline.addEventListener('click', () => {
    tabOnline.className = 'px-5 py-3 border-b-2 border-indigo-600 text-indigo-600 font-extrabold cursor-pointer';
    tabWalk.className = 'px-5 py-3 border-b-2 border-transparent text-slate-400 hover:text-slate-800 cursor-pointer';
    panelOnline.classList.remove('hidden');
    panelWalk.classList.add('hidden');
    document.getElementById('payment-options-block').classList.add('hidden');
    document.getElementById('cash-change-container').classList.add('hidden');
    completeCheckinBtn.textContent = 'Konfirmasi Pelunasan OTA & Check-In ➔';
    
    // Total price becomes Lunas
    document.getElementById('payment-calc-subtotal').textContent = 'LUNAS DI OTA';
  });

  // Dynamic calculations inputs
  const walkinRoomTypeInput = document.getElementById('walkin-room-type');
  const walkinRoomNumberSelect = document.getElementById('walkin-room-number');

  if (walkinRoomTypeInput) {
    walkinRoomTypeInput.addEventListener('change', () => {
      setupCheckinUnitSelects();
      calculateWalkinTotalPrice();
    });
  }

  if (walkinRoomNumberSelect) {
    walkinRoomNumberSelect.addEventListener('change', () => {
      renderWalkinRoomButtons();
    });
  }

  document.getElementById('walkin-duration').addEventListener('input', calculateWalkinTotalPrice);
  document.getElementById('payment-amount-paid').addEventListener('input', calculateWalkinTotalPrice);

  // Radio button animations inside walk-in payments method
  document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('input[name="payment-method"]').forEach(r => {
        r.parentElement.className = 'border border-slate-200 rounded-xl p-2.5 flex flex-col items-center gap-1 cursor-pointer transition-all hover:bg-slate-50 group';
      });
      e.target.parentElement.className = 'border-2 border-indigo-650 rounded-xl p-2.5 flex flex-col items-center gap-1 cursor-pointer transition-all hover:bg-slate-50 group';
      
      if (e.target.value === 'Cash') {
        document.getElementById('cash-change-container').classList.remove('hidden');
      } else {
        document.getElementById('cash-change-container').classList.add('hidden');
      }
    });
  });

  // QRIS or Debit selection visual highlight checkouts
  document.querySelectorAll('input[name="checkout-payment-method"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('input[name="checkout-payment-method"]').forEach(r => {
        r.parentElement.className = 'border border-slate-200 rounded-xl p-2.5 flex flex-col items-center gap-1 cursor-pointer transition-all hover:bg-slate-50 select-none';
      });
      e.target.parentElement.className = 'border-2 border-indigo-650 rounded-xl p-2.5 flex flex-col items-center gap-1 cursor-pointer transition-all hover:bg-slate-50 select-none';
    });
  });

  // Process checkout button hook
  document.getElementById('complete-checkin-btn').addEventListener('click', executeCompleteCheckin);
  document.getElementById('verify-booking-btn').addEventListener('click', handleVerifyOTABooking);

  // F3. Checkout selections room details updates binding
  document.getElementById('checkout-room-select').addEventListener('change', triggerCheckoutFormDetails);
  document.getElementById('checkout-surcharge-late').addEventListener('input', calculateCheckoutBill);
  document.getElementById('checkout-surcharge-minibar').addEventListener('input', calculateCheckoutBill);
  document.getElementById('checkout-surcharge-damage').addEventListener('input', calculateCheckoutBill);
  document.getElementById('complete-checkout-btn').addEventListener('click', executeCompleteCheckout);

  // F4. Reservations tabs listeners bindings
  document.getElementById('res-tab-all').addEventListener('click', (e) => {
    currentReservationsTab = 'all';
    document.querySelectorAll('[id^="res-tab-"]').forEach(b => b.className = 'px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-50 cursor-pointer');
    e.target.className = 'px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 cursor-pointer';
    renderReservations();
  });
  document.getElementById('res-tab-confirmed').addEventListener('click', (e) => {
    currentReservationsTab = 'confirmed';
    document.querySelectorAll('[id^="res-tab-"]').forEach(b => b.className = 'px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-50 cursor-pointer');
    e.target.className = 'px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 cursor-pointer';
    renderReservations();
  });
  document.getElementById('res-tab-checkedin').addEventListener('click', (e) => {
    currentReservationsTab = 'checkedin';
    document.querySelectorAll('[id^="res-tab-"]').forEach(b => b.className = 'px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-50 cursor-pointer');
    e.target.className = 'px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 cursor-pointer';
    renderReservations();
  });
  document.getElementById('res-tab-checkedout').addEventListener('click', (e) => {
    currentReservationsTab = 'checkedout';
    document.querySelectorAll('[id^="res-tab-"]').forEach(b => b.className = 'px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-50 cursor-pointer');
    e.target.className = 'px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 cursor-pointer';
    renderReservations();
  });

  // F5. Jurnal history filtration
  document.getElementById('history-method-select').addEventListener('change', (e) => {
    activeHistoryMethod = e.target.value;
    renderHistory();
  });

  // F6. Admin Rooms filter classifications
  document.getElementById('filter-admrooms-all').addEventListener('click', (e) => {
    currentAdminRoomsFilter = 'all';
    document.querySelectorAll('[id^="filter-admrooms-"]').forEach(b => b.className = 'px-3.5 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 text-[11px]');
    e.target.className = 'px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg';
    renderAdminRooms();
  });
  document.getElementById('filter-admrooms-available').addEventListener('click', (e) => {
    currentAdminRoomsFilter = 'available';
    document.querySelectorAll('[id^="filter-admrooms-"]').forEach(b => b.className = 'px-3.5 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 text-[11px]');
    e.target.className = 'px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg';
    renderAdminRooms();
  });
  document.getElementById('filter-admrooms-occupied').addEventListener('click', (e) => {
    currentAdminRoomsFilter = 'occupied';
    document.querySelectorAll('[id^="filter-admrooms-"]').forEach(b => b.className = 'px-3.5 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 text-[11px]');
    e.target.className = 'px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg';
    renderAdminRooms();
  });
  document.getElementById('filter-admrooms-outoforder').addEventListener('click', (e) => {
    currentAdminRoomsFilter = 'outoforder';
    document.querySelectorAll('[id^="filter-admrooms-"]').forEach(b => b.className = 'px-3.5 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 text-[11px]');
    e.target.className = 'px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg';
    renderAdminRooms();
  });

  // Add room submit registration form
  document.getElementById('add-room-form').addEventListener('submit', handleAddRoom);

  // F7. Admin Users form CRUD controls
  document.getElementById('admin-user-form').addEventListener('submit', handleAdminUserSubmit);
  document.getElementById('admin-user-btn-cancel').addEventListener('click', cleanUserForms);

  // F8. Admin Guests roster segmentation filters tabs
  document.getElementById('filter-guests-all').addEventListener('click', (e) => {
    currentGuestsTab = 'all';
    document.querySelectorAll('[id^="filter-guests-"]').forEach(b => b.className = 'px-3.5 py-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-[11px]');
    e.target.className = 'px-3.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700';
    renderAdminGuests();
  });
  document.getElementById('filter-guests-inhouse').addEventListener('click', (e) => {
    currentGuestsTab = 'inhouse';
    document.querySelectorAll('[id^="filter-guests-"]').forEach(b => b.className = 'px-3.5 py-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-[11px]');
    e.target.className = 'px-3.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700';
    renderAdminGuests();
  });
  document.getElementById('filter-guests-pending').addEventListener('click', (e) => {
    currentGuestsTab = 'pending';
    document.querySelectorAll('[id^="filter-guests-"]').forEach(b => b.className = 'px-3.5 py-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-[11px]');
    e.target.className = 'px-3.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700';
    renderAdminGuests();
  });
  document.getElementById('filter-guests-out').addEventListener('click', (e) => {
    currentGuestsTab = 'out';
    document.querySelectorAll('[id^="filter-guests-"]').forEach(b => b.className = 'px-3.5 py-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-[11px]');
    e.target.className = 'px-3.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700';
    renderAdminGuests();
  });

  // CORES. Popups modal triggers closures
  document.getElementById('create-reservation-btn-trigger').addEventListener('click', openAddReservationModal);
  
  // Close x Add modal
  document.getElementById('modal-add-res-close-x').addEventListener('click', () => {
    document.getElementById('modal-add-reservation').classList.add('hidden');
  });
  document.getElementById('modal-add-res-btn-cancel').addEventListener('click', () => {
    document.getElementById('modal-add-reservation').classList.add('hidden');
  });
  
  // Close x edit modal
  document.getElementById('modal-edit-res-close-x').addEventListener('click', () => {
    document.getElementById('modal-edit-reservation').classList.add('hidden');
  });
  document.getElementById('modal-edit-res-btn-cancel').addEventListener('click', () => {
    document.getElementById('modal-edit-reservation').classList.add('hidden');
  });

  document.getElementById('modal-add-res-room-type').addEventListener('change', calculateModalTotalPrice);
  document.getElementById('modal-add-res-duration').addEventListener('input', calculateModalTotalPrice);
  
  document.getElementById('modal-edit-res-room-type').addEventListener('change', calculateModalEditTotalPrice);
  document.getElementById('modal-edit-res-duration').addEventListener('input', calculateModalEditTotalPrice);

  // Forms submissions handles
  document.getElementById('modal-add-res-form').addEventListener('submit', handleAddReservationSubmit);
  document.getElementById('modal-edit-res-form').addEventListener('submit', handleEditReservationSubmit);


  // --- G. REAL TIME DATE/TIME COUNTERS DISPLAY ---
  function updateTimeCounter() {
    const clockLabel = document.getElementById('header-time');
    const dateLabel = document.getElementById('header-date');
    if (!clockLabel || !dateLabel) return;

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const date = new Date();
    const dayName = days[date.getDay()];
    const dateNum = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    dateLabel.textContent = `${dayName}, ${dateNum} ${monthName} ${year}`;
    
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    clockLabel.textContent = `Pukul ${h}:${m}:${s} WIB`;
  }

  // Set real active date updates
  updateTimeCounter();
  setInterval(updateTimeCounter, 1000);

});
