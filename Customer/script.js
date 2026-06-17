// ======================================================
// Lumina Stay - Clean Booking System
// UI baru, tanpa looping, tanpa alert Firebase timeout
// ======================================================


const TAX_RATE = 0.10;
const FIREBASE_TIMEOUT_MS = 25000;

const ROOMS = [
  {
    id: "Deluxe",
    name: "Deluxe Class",
    subtitle: "Nyaman untuk 2 tamu, cocok untuk staycation.",
    price: 850000,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop",
    facilities: ["2 Tamu", "Air Panas", "Free WiFi", "Balkon"]
  },
  {
    id: "Studio",
    name: "Studio Suite",
    subtitle: "Ringkas, modern, dan cocok untuk perjalanan bisnis.",
    price: 600000,
    image: "https://images.unsplash.com/photo-1578926078328-123c1a1efc26?w=1200&h=800&fit=crop",
    facilities: ["1-2 Tamu", "AC", "Smart TV", "Kulkas Mini"]
  }
];

let firebaseDb = null;
let firebaseAuth = null;
let currentBookingData = null;
let pendingBookingData = null;
let toastTimer = null;

window.addEventListener("DOMContentLoaded", initApp, { once: true });

function initApp() {
  initFirebase();
  renderRoomCards();
  renderRoomOptions();
  setMinDates();
  bindEvents();
  updateSummary();
  refreshIcons();
}

function initFirebase() {
  try {
    if (typeof firebase === "undefined") {
      console.warn("Firebase SDK belum dimuat.");
      return;
    }

    // firebase-config.js sudah dipanggil di HTML dan sudah menjalankan firebase.initializeApp().
    // Jadi di sini kita hanya mengambil database/auth yang sudah aktif.
    if (!firebase.apps.length) {
      console.error("Firebase belum diinisialisasi. Cek path ../firebase-config.js di Customer/index.html.");
      return;
    }

    firebaseDb = firebase.database();
    firebaseAuth = firebase.auth ? firebase.auth() : null;

    console.log("Firebase customer aktif:", firebase.app().options.databaseURL);
  } catch (error) {
    firebaseDb = null;
    console.warn("Firebase tidak aktif:", error.message);
  }
}

function bindEvents() {
  const form = $("booking-form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  ["booking-room-type", "booking-quantity", "booking-checkin", "booking-checkout"].forEach(id => {
    const el = $(id);
    if (el) {
      el.addEventListener("input", updateSummary);
      el.addEventListener("change", updateSummary);
    }
  });

  document.querySelectorAll('input[name="payment-method"]').forEach(input => {
    input.addEventListener("change", updateSummary);
  });

  onClick("cancel-confirm-btn", closeConfirmModal);
  onClick("submit-confirm-btn", submitBooking);
  onClick("download-invoice-btn", downloadCurrentInvoice);
  onClick("close-success-btn", closeSuccessModal);
  onClick("search-invoice-btn", searchInvoiceByCode);
}

function onClick(id, handler) {
  const el = $(id);
  if (!el) return;

  el.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    handler(event);
  });
}

function renderRoomCards() {
  const container = $("room-list");
  if (!container) return;

  container.innerHTML = ROOMS.map(room => `
    <article class="room-card">
      <img src="${room.image}" alt="${escapeHtml(room.name)}" />
      <div class="room-card-body">
        <h3>${escapeHtml(room.name)}</h3>
        <p>${escapeHtml(room.subtitle)}</p>
        <div class="room-facilities">
          ${room.facilities.map(item => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
        <div class="room-footer">
          <div class="room-price">
            <strong>${formatCurrency(room.price)}</strong>
            <small>per malam</small>
          </div>
          <button type="button" class="btn btn-primary choose-room-btn" data-room-id="${room.id}">Pilih Kamar</button>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".choose-room-btn").forEach(button => {
    button.addEventListener("click", function () {
      const roomId = this.dataset.roomId;
      const select = $("booking-room-type");
      if (select) {
        select.value = roomId;
        updateSummary();
      }
      const bookingSection = $("booking-section");
      if (bookingSection) bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderRoomOptions() {
  const select = $("booking-room-type");
  if (!select) return;

  select.innerHTML = ROOMS.map(room => `
    <option value="${room.id}">${room.name} - ${formatCurrency(room.price)}</option>
  `).join("");
}

function setMinDates() {
  const today = new Date().toISOString().split("T")[0];
  const checkin = $("booking-checkin");
  const checkout = $("booking-checkout");

  if (checkin) checkin.min = today;
  if (checkout) checkout.min = today;

  if (checkin) {
    checkin.addEventListener("change", () => {
      if (checkout) checkout.min = checkin.value || today;
      updateSummary();
    });
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const data = collectBookingData();
  const validation = validateBooking(data);

  if (!validation.valid) {
    showToast(validation.message);
    return;
  }

  pendingBookingData = data;
  openConfirmModal(data);
}

function collectBookingData() {
  const roomId = val("booking-room-type") || ROOMS[0].id;
  const room = getRoom(roomId);
  const quantity = Math.max(1, Number(val("booking-quantity")) || 1);
  const checkIn = val("booking-checkin");
  const checkOut = val("booking-checkout");
  const duration = calculateDuration(checkIn, checkOut);
  const subtotal = duration > 0 ? room.price * duration * quantity : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;
  const paymentMethod = getPaymentMethod();

  return {
    bookingCode: "",
    name: val("booking-name"),
    email: val("booking-email"),
    phone: val("booking-phone"),
    identity: val("booking-identity"),
    guestName: val("booking-guest-name") || val("booking-name"),
    roomType: room.id,
    roomName: room.name,
    pricePerNight: room.price,
    quantity,
    checkIn,
    checkOut,
    duration,
    subtotal,
    tax,
    total,
    paymentMethod,
    paymentStatus: paymentMethod === "Cash" ? "Belum Dibayar" : "Lunas",
    notes: val("booking-notes"),
    status: "Confirmed",
    source: "ONLINE_OTA"
  };
}

function validateBooking(data) {
  if (!data.name || !data.email || !data.phone || !data.identity || !data.checkIn || !data.checkOut) {
    return { valid: false, message: "Lengkapi semua data yang bertanda *." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { valid: false, message: "Format email belum benar." };
  }

  if (data.duration <= 0) {
    return { valid: false, message: "Tanggal check-out harus setelah check-in." };
  }

  return { valid: true };
}

function updateSummary() {
  const data = collectBookingData();

  setText("summary-room", data.roomName);
  setText("summary-price", formatCurrency(data.pricePerNight));
  setText("summary-duration", `${Math.max(0, data.duration)} malam`);
  setText("summary-qty", `${data.quantity} kamar`);
  setText("summary-subtotal", formatCurrency(data.subtotal));
  setText("summary-tax", formatCurrency(data.tax));
  setText("summary-total", formatCurrency(data.total));
}

function openConfirmModal(data) {
  const detail = $("confirm-detail");
  if (!detail) return;

  detail.innerHTML = `
    <div class="modal-row"><span>Nama</span><strong>${escapeHtml(data.name)}</strong></div>
    <div class="modal-row"><span>Email</span><strong>${escapeHtml(data.email)}</strong></div>
    <div class="modal-row"><span>Telepon</span><strong>${escapeHtml(data.phone)}</strong></div>
    <div class="modal-row"><span>Kamar</span><strong>${escapeHtml(data.roomName)}</strong></div>
    <div class="modal-row"><span>Tanggal</span><strong>${formatDate(data.checkIn)} - ${formatDate(data.checkOut)}</strong></div>
    <div class="modal-row"><span>Durasi</span><strong>${data.duration} malam • ${data.quantity} kamar</strong></div>
    <div class="modal-row"><span>Pembayaran</span><strong>${escapeHtml(data.paymentMethod)} • ${escapeHtml(data.paymentStatus)}</strong></div>
    <div class="modal-row modal-total"><span>Total</span><strong>${formatCurrency(data.total)}</strong></div>
  `;

  showModal("confirm-modal");
}

function closeConfirmModal() {
  hideModal("confirm-modal");
}

async function submitBooking() {
  if (!pendingBookingData) return;

  const button = $("submit-confirm-btn");
  setButtonLoading(button, true, "Memproses...");

  const bookingData = {
    ...pendingBookingData,
    bookingCode: generateBookingCode(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  bookingData.code = bookingData.bookingCode;
  bookingData.invoiceHTML = generateInvoiceHTML(bookingData);

  saveLocalBooking(bookingData);
  currentBookingData = bookingData;

  closeConfirmModal();
  openSuccessModal(bookingData, "Menyimpan ke Firebase...");

  const firebaseResult = await saveBookingToFirebase(bookingData);

  if (firebaseResult.success) {
    bookingData.id = firebaseResult.id;
    bookingData.firebaseSaved = true;
    saveLocalBooking(bookingData);
    updateSuccessStatus("Tersimpan ke Firebase dan invoice siap diunduh.", "ok");
  } else {
    bookingData.firebaseSaved = false;
    saveLocalBooking(bookingData);
    updateSuccessStatus("Firebase belum tersimpan. Cek Rules / koneksi, lalu coba lagi. Invoice tetap bisa diunduh sebagai cadangan.", "warn");
    console.warn("Firebase save failed:", firebaseResult.error);
  }

  setButtonLoading(button, false, "Konfirmasi & Pesan");
  pendingBookingData = null;
}

async function saveBookingToFirebase(data) {
  const ready = await ensureFirebaseReady();

  if (!ready || !firebaseDb) {
    return { success: false, error: "Firebase Database tidak aktif. Cek SDK Firebase dan databaseURL." };
  }

  try {
    const ref = firebaseDb.ref("bookings").push();
    const record = buildFirebaseRecord(data);
    const safeCode = normalizeCode(data.bookingCode || data.code).replace(/[.#$\[\]\/]/g, "_");

    const updates = {};
    updates[`bookings/${ref.key}`] = record;
    updates[`bookingCodes/${safeCode}`] = {
      bookingId: ref.key,
      code: record.code,
      bookingCode: record.bookingCode,
      customerName: record.customerName,
      customerPhone: record.customerPhone,
      roomType: record.roomType,
      status: record.status,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt
    };

    await withTimeout(firebaseDb.ref().update(updates), FIREBASE_TIMEOUT_MS);

    return { success: true, id: ref.key };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function ensureFirebaseReady() {
  try {
    if (!firebaseDb) initFirebase();
    if (!firebaseDb) return false;

    // Jika Firebase Rules mewajibkan auth != null, login anonymous membantu write database.
    // Kalau Anonymous Auth belum diaktifkan, proses tetap lanjut mencoba write sesuai Rules kamu.
    if (firebaseAuth && !firebaseAuth.currentUser) {
      try {
        await withTimeout(firebaseAuth.signInAnonymously(), 12000);
      } catch (authError) {
        console.warn("Anonymous auth tidak aktif / gagal:", authError.message);
      }
    }

    return true;
  } catch (error) {
    console.warn("Firebase belum siap:", error.message);
    return false;
  }
}

function buildFirebaseRecord(data) {
  return {
    code: data.bookingCode,
    bookingCode: data.bookingCode,
    customerId: "guest",
    customerName: data.name,
    customerEmail: data.email,
    customerPhone: data.phone,
    identity: data.identity,
    guestName: data.guestName,
    roomId: data.roomType,
    roomType: data.roomType,
    roomName: data.roomName,
    roomNumber: "",
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    duration: data.duration,
    quantity: data.quantity,
    pricePerNight: data.pricePerNight,
    subtotal: data.subtotal,
    tax: data.tax,
    total: data.total,
    paymentMethod: data.paymentMethod,
    paymentSubMethod: data.paymentMethod,
    paymentStatus: data.paymentStatus,
    status: data.status,
    source: data.source,
    notes: data.notes || "",
    invoiceHTML: data.invoiceHTML,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
}

function openSuccessModal(data, statusText) {
  setText("success-code", data.bookingCode);
  updateSuccessStatus(statusText, "");
  showModal("success-modal");
  refreshIcons();
}

function closeSuccessModal() {
  hideModal("success-modal");
  resetFormAfterBooking();
}

function updateSuccessStatus(text, type) {
  const el = $("success-status");
  if (!el) return;
  el.textContent = text;
  el.className = `success-status ${type || ""}`.trim();
}

function downloadCurrentInvoice() {
  const data = currentBookingData || getLatestLocalBooking();
  if (!data) {
    showToast("Data invoice belum tersedia.");
    return;
  }

  downloadInvoice(data);
}

async function searchInvoiceByCode() {
  const code = normalizeCode(val("invoice-code-input"));
  if (!code) {
    showToast("Masukkan kode booking terlebih dahulu.");
    return;
  }

  showToast("Mencari invoice...");

  let booking = await findBookingInFirebase(code);
  if (!booking) booking = findLocalBooking(code);

  if (!booking) {
    showToast("Kode booking tidak ditemukan.");
    return;
  }

  currentBookingData = normalizeBookingForInvoice(booking);
  downloadInvoice(currentBookingData);
}

async function findBookingInFirebase(code) {
  if (!firebaseDb) return null;

  try {
    const snapshot = await withTimeout(firebaseDb.ref("bookings").once("value"), FIREBASE_TIMEOUT_MS);
    let found = null;

    snapshot.forEach(child => {
      const booking = { id: child.key, ...child.val() };
      const firebaseCode = normalizeCode(booking.bookingCode || booking.code);
      if (firebaseCode === code) found = booking;
    });

    return found;
  } catch (error) {
    console.warn("Firebase search failed:", error.message);
    return null;
  }
}

function normalizeBookingForInvoice(booking) {
  return {
    bookingCode: booking.bookingCode || booking.code,
    code: booking.bookingCode || booking.code,
    name: booking.name || booking.customerName,
    email: booking.email || booking.customerEmail,
    phone: booking.phone || booking.customerPhone,
    identity: booking.identity || "-",
    guestName: booking.guestName || booking.customerName || booking.name,
    roomType: booking.roomType,
    roomName: booking.roomName || getRoom(booking.roomType).name,
    pricePerNight: Number(booking.pricePerNight || 0),
    quantity: Number(booking.quantity || 1),
    checkIn: booking.checkIn || booking.checkin,
    checkOut: booking.checkOut || booking.checkout,
    duration: Number(booking.duration || 0),
    subtotal: Number(booking.subtotal || 0),
    tax: Number(booking.tax || 0),
    total: Number(booking.total || 0),
    paymentMethod: booking.paymentMethod || "-",
    paymentStatus: booking.paymentStatus || "-",
    notes: booking.notes || "",
    invoiceHTML: booking.invoiceHTML || ""
  };
}

function downloadInvoice(data) {
  const html = data.invoiceHTML || generateInvoiceHTML(data);
  const code = data.bookingCode || data.code || "INVOICE";

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `Invoice-${code}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  showToast("Invoice berhasil diunduh.");
}

function generateInvoiceHTML(data) {
  const code = data.bookingCode || data.code || "-";
  const checkIn = data.checkIn || data.checkin;
  const checkOut = data.checkOut || data.checkout;

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Invoice ${escapeHtml(code)}</title>
  <style>
    body { margin: 0; padding: 32px; background: #f5f7fb; font-family: Arial, sans-serif; color: #0f172a; }
    .invoice { max-width: 820px; margin: auto; background: white; border-radius: 28px; overflow: hidden; box-shadow: 0 22px 65px rgba(15,23,42,.14); }
    .head { padding: 34px; color: white; background: linear-gradient(135deg, #4f46e5, #3730a3); }
    .head h1 { margin: 0; font-size: 34px; }
    .head p { margin: 8px 0 0; color: #e0e7ff; }
    .body { padding: 34px; }
    .code { display: inline-block; padding: 14px 18px; border-radius: 16px; background: #eef2ff; color: #4f46e5; font-size: 24px; font-weight: 900; margin-bottom: 26px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    .box { border: 1px solid #e2e8f0; border-radius: 20px; padding: 20px; }
    .box h2 { margin: 0 0 14px; font-size: 18px; }
    .row { display: flex; justify-content: space-between; gap: 18px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
    .row:last-child { border-bottom: 0; }
    .row span { color: #64748b; }
    .row strong { text-align: right; }
    .total { margin-top: 20px; padding: 20px; border-radius: 18px; background: #eef2ff; color: #4f46e5; display: flex; justify-content: space-between; font-size: 26px; font-weight: 900; }
    .footer { padding: 22px 34px; background: #f8fafc; color: #64748b; text-align: center; font-size: 13px; }
    @media print { body { background: white; padding: 0; } .invoice { box-shadow: none; } }
    @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } body { padding: 14px; } }
  </style>
</head>
<body>
  <div class="invoice">
    <div class="head">
      <h1>Invoice Pemesanan Kamar</h1>
      <p>Lumina Stay - Piturooms Hotels</p>
    </div>
    <div class="body">
      <div class="code">Kode Booking: ${escapeHtml(code)}</div>
      <div class="grid">
        <div class="box">
          <h2>Data Pemesan</h2>
          <div class="row"><span>Nama</span><strong>${escapeHtml(data.name || "-")}</strong></div>
          <div class="row"><span>Nama Tamu</span><strong>${escapeHtml(data.guestName || data.name || "-")}</strong></div>
          <div class="row"><span>Email</span><strong>${escapeHtml(data.email || "-")}</strong></div>
          <div class="row"><span>Telepon</span><strong>${escapeHtml(data.phone || "-")}</strong></div>
        </div>
        <div class="box">
          <h2>Detail Reservasi</h2>
          <div class="row"><span>Kamar</span><strong>${escapeHtml(data.roomName || "-")}</strong></div>
          <div class="row"><span>Check-In</span><strong>${formatDate(checkIn)}</strong></div>
          <div class="row"><span>Check-Out</span><strong>${formatDate(checkOut)}</strong></div>
          <div class="row"><span>Durasi</span><strong>${data.duration || 0} malam</strong></div>
          <div class="row"><span>Jumlah</span><strong>${data.quantity || 1} kamar</strong></div>
        </div>
      </div>
      <div class="box" style="margin-top:18px">
        <h2>Pembayaran</h2>
        <div class="row"><span>Metode</span><strong>${escapeHtml(data.paymentMethod || "-")}</strong></div>
        <div class="row"><span>Status</span><strong>${escapeHtml(data.paymentStatus || "-")}</strong></div>
        <div class="row"><span>Harga/Malam</span><strong>${formatCurrency(data.pricePerNight || 0)}</strong></div>
        <div class="row"><span>Subtotal</span><strong>${formatCurrency(data.subtotal || 0)}</strong></div>
        <div class="row"><span>Pajak 10%</span><strong>${formatCurrency(data.tax || 0)}</strong></div>
        <div class="total"><span>Total</span><strong>${formatCurrency(data.total || 0)}</strong></div>
      </div>
    </div>
    <div class="footer">Simpan invoice dan tunjukkan kode booking saat check-in.</div>
  </div>
</body>
</html>`;
}

function resetFormAfterBooking() {
  const form = $("booking-form");
  if (form) form.reset();
  renderRoomOptions();
  setMinDates();
  updateSummary();
}

function saveLocalBooking(data) {
  localStorage.setItem("latestBooking", JSON.stringify(data));

  const bookings = JSON.parse(localStorage.getItem("hotelBookings") || "[]");
  const code = normalizeCode(data.bookingCode || data.code);
  const filtered = bookings.filter(item => normalizeCode(item.bookingCode || item.code) !== code);
  filtered.push(data);
  localStorage.setItem("hotelBookings", JSON.stringify(filtered));
}

function getLatestLocalBooking() {
  try {
    const raw = localStorage.getItem("latestBooking");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function findLocalBooking(code) {
  try {
    const bookings = JSON.parse(localStorage.getItem("hotelBookings") || "[]");
    return bookings.find(item => normalizeCode(item.bookingCode || item.code) === code) || null;
  } catch {
    return null;
  }
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Firebase timeout")), ms))
  ]);
}

function getRoom(roomId) {
  return ROOMS.find(room => room.id === roomId) || ROOMS[0];
}

function getPaymentMethod() {
  return document.querySelector('input[name="payment-method"]:checked')?.value || "QRIS";
}

function calculateDuration(start, end) {
  if (!start || !end) return 0;
  const startDate = new Date(start + "T00:00:00");
  const endDate = new Date(end + "T00:00:00");
  return Math.ceil((endDate - startDate) / 86400000);
}

function generateBookingCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "PITU-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(Number(amount || 0));
}

function formatDate(dateValue) {
  if (!dateValue) return "-";
  const date = new Date(dateValue + (String(dateValue).includes("T") ? "" : "T00:00:00"));
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}

function normalizeCode(code) {
  return String(code || "").trim().toUpperCase();
}

function showModal(id) {
  const modal = $(id);
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function hideModal(id) {
  const modal = $(id);
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");

  if (!document.querySelector(".modal:not(.hidden)")) {
    document.body.style.overflow = "";
  }
}

function setButtonLoading(button, isLoading, text) {
  if (!button) return;
  button.disabled = isLoading;
  button.textContent = text;
}

function showToast(message) {
  const toast = $("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 3200);
}

function setText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

function val(id) {
  return ($(id)?.value || "").trim();
}

function $(id) {
  return document.getElementById(id);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[char]));
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}
