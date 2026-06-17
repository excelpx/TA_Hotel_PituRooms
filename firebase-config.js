/**
 * Firebase Configuration & Shared Functions
 * Digunakan oleh: HOS Receptionist, Admin, dan Customer Website
 */

// ============ FIREBASE CONFIGURATION ============

const firebaseConfig = {
  apiKey: "AIzaSyBFJvXh7FRHHzCSEDoI6sHE3KEfzruzQ1E",
  authDomain: "hotel-piturooms.firebaseapp.com",
  databaseURL: "https://hotel-piturooms-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hotel-piturooms",
  storageBucket: "hotel-piturooms.firebasestorage.app",
  messagingSenderId: "389991891524",
  appId: "1:389991891524:web:2ddcc165a1327c1d69f211",
  measurementId: "G-H720W6G44W"
};

// ============ INITIALIZE FIREBASE ============

if (typeof firebase !== "undefined") {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
} else {
  console.error("Firebase SDK belum dimuat. Pastikan script firebase compat sudah dipanggil di HTML.");
}

const auth = firebase.auth();
const database = firebase.database();

// ============ GLOBAL STATE ============

let currentUser = null;
let userRole = null;

// ============ AUTHENTICATION FUNCTIONS ============

async function firebaseLogin(email, password) {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    currentUser = result.user;

    const userRef = database.ref(`users/${currentUser.uid}`);
    const snapshot = await userRef.once("value");
    const userData = snapshot.val();

    if (userData) {
      userRole = userData.role;

      await userRef.update({
        lastLogin: new Date().toISOString()
      });

      return {
        success: true,
        user: currentUser,
        role: userData.role,
        userData
      };
    }

    return {
      success: false,
      error: "User role not found"
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function firebaseRegister(email, password, userData) {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    const uid = result.user.uid;

    await database.ref(`users/${uid}`).set({
      email: email,
      name: userData.name || "Customer",
      phone: userData.phone || "",
      role: "customer",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    });

    currentUser = result.user;
    userRole = "customer";

    return {
      success: true,
      uid
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function firebaseLogout() {
  try {
    await auth.signOut();
    currentUser = null;
    userRole = null;

    return {
      success: true
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

function getCurrentUser() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(user => {
      currentUser = user;

      if (user) {
        database.ref(`users/${user.uid}`).once("value", snapshot => {
          const userData = snapshot.val();
          userRole = userData ? userData.role : null;

          resolve({
            user,
            role: userRole,
            userData
          });
        });
      } else {
        resolve(null);
      }
    });
  });
}

// ============ ROOMS FUNCTIONS ============

async function getRooms(filterStatus = null) {
  try {
    const snapshot = await database.ref("rooms").once("value");
    const rooms = [];

    snapshot.forEach(childSnapshot => {
      const room = {
        id: childSnapshot.key,
        ...childSnapshot.val()
      };

      if (!filterStatus || room.status === filterStatus) {
        rooms.push(room);
      }
    });

    return {
      success: true,
      rooms
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function getRoom(roomId) {
  try {
    const snapshot = await database.ref(`rooms/${roomId}`).once("value");
    const room = snapshot.val();

    if (room) {
      return {
        success: true,
        room: {
          id: roomId,
          ...room
        }
      };
    }

    return {
      success: false,
      error: "Room not found"
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function updateRoomStatus(roomId, status) {
  try {
    await database.ref(`rooms/${roomId}`).update({
      status: status,
      lastUpdated: new Date().toISOString()
    });

    return {
      success: true
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function addRoom(roomData) {
  try {
    const newRoomRef = database.ref("rooms").push();

    await newRoomRef.set({
      number: roomData.number,
      type: roomData.type,
      price: roomData.price,
      capacity: roomData.capacity || 2,
      floor: roomData.floor || 1,
      status: roomData.status || "Available",
      facilities: roomData.facilities || [],
      images: roomData.images || [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    });

    return {
      success: true,
      roomId: newRoomRef.key
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ============ BOOKINGS FUNCTIONS ============

async function getBookings(filterStatus = null, customerId = null) {
  try {
    const snapshot = await database.ref("bookings").once("value");
    const bookings = [];

    snapshot.forEach(childSnapshot => {
      const booking = {
        id: childSnapshot.key,
        ...childSnapshot.val()
      };

      let include = true;

      if (filterStatus && booking.status !== filterStatus) include = false;
      if (customerId && booking.customerId !== customerId) include = false;

      if (include) bookings.push(booking);
    });

    return {
      success: true,
      bookings
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function getBookingByCode(code) {
  try {
    const cleanCode = normalizeBookingCode(code);
    const snapshot = await database.ref("bookings").once("value");

    let foundBooking = null;

    snapshot.forEach(childSnapshot => {
      const booking = {
        id: childSnapshot.key,
        ...childSnapshot.val()
      };

      const firebaseCode = normalizeBookingCode(
        booking.code ||
        booking.bookingCode ||
        booking.otaCode ||
        booking.reservationCode ||
        booking.invoiceCode
      );

      if (firebaseCode === cleanCode) {
        foundBooking = booking;
      }
    });

    if (foundBooking) {
      return {
        success: true,
        booking: foundBooking
      };
    }

    return {
      success: false,
      error: "Kode booking tidak ditemukan"
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function createBooking(bookingData) {
  try {
    const bookingCode = bookingData.bookingCode || bookingData.code || generateBookingCode();
    const newBookingRef = database.ref("bookings").push();
    const customerId = bookingData.customerId || (currentUser ? currentUser.uid : "guest");

    const paymentStatus = bookingData.paymentMethod === "Cash" ? "Belum Dibayar" : "Lunas";

    const bookingRecord = {
      code: bookingCode,
      bookingCode: bookingCode,

      customerId: customerId,
      customerName: bookingData.customerName || bookingData.name || "",
      customerEmail: bookingData.customerEmail || bookingData.email || "",
      customerPhone: bookingData.customerPhone || bookingData.phone || "",

      guestName: bookingData.guestName || bookingData.customerName || bookingData.name || "",

      roomId: bookingData.roomId || "",
      roomType: bookingData.roomType || "",
      roomName: bookingData.roomName || "",
      roomNumber: bookingData.roomNumber || "",

      checkIn: bookingData.checkIn || bookingData.checkin || "",
      checkOut: bookingData.checkOut || bookingData.checkout || "",
      duration: bookingData.duration || 1,
      quantity: bookingData.quantity || 1,

      pricePerNight: bookingData.pricePerNight || 0,
      subtotal: bookingData.subtotal || 0,
      tax: bookingData.tax || 0,
      total: bookingData.total || 0,

      paymentMethod: bookingData.paymentMethod || "",
      paymentSubMethod: bookingData.paymentSubMethod || bookingData.paymentMethod || "",
      paymentStatus: bookingData.paymentStatus || paymentStatus,

      status: bookingData.status || "Confirmed",
      source: bookingData.source || "ONLINE_OTA",

      notes: bookingData.notes || "",
      specialRequests: bookingData.specialRequests || "",
      invoiceHTML: bookingData.invoiceHTML || bookingData.html || "",

      createdAt: bookingData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await newBookingRef.set(bookingRecord);

    return {
      success: true,
      bookingId: newBookingRef.key,
      bookingCode: bookingCode,
      booking: {
        id: newBookingRef.key,
        ...bookingRecord
      }
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function updateBookingStatus(bookingId, status) {
  try {
    await database.ref(`bookings/${bookingId}`).update({
      status: status,
      updatedAt: new Date().toISOString()
    });

    return {
      success: true
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function checkInGuest(bookingId, roomNumber) {
  try {
    const updateData = {
      status: "CheckedIn",
      roomNumber: roomNumber || "",
      checkedInAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (currentUser && currentUser.uid) {
      updateData.checkInBy = currentUser.uid;
    }

    await database.ref(`bookings/${bookingId}`).update(updateData);

    return {
      success: true
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function checkOutGuest(bookingId, surcharges = 0) {
  try {
    await database.ref(`bookings/${bookingId}`).update({
      status: "CheckedOut",
      surcharges: surcharges || 0,
      checkedOutAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return {
      success: true
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ============ TRANSACTIONS FUNCTIONS ============

async function recordTransaction(transactionData) {
  try {
    const newTransRef = database.ref("transactions").push();

    await newTransRef.set({
      bookingId: transactionData.bookingId || "",
      type: transactionData.type || "",
      amount: transactionData.amount || 0,
      paymentMethod: transactionData.paymentMethod || "",
      processedBy: transactionData.processedBy || "",
      timestamp: new Date().toISOString(),
      notes: transactionData.notes || ""
    });

    return {
      success: true,
      transactionId: newTransRef.key
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function getTransactions(limit = 50) {
  try {
    const snapshot = await database.ref("transactions")
      .orderByChild("timestamp")
      .limitToLast(limit)
      .once("value");

    const transactions = [];

    snapshot.forEach(childSnapshot => {
      transactions.unshift({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });

    return {
      success: true,
      transactions
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ============ REAL-TIME LISTENERS ============

function listenToRooms(callback) {
  database.ref("rooms").on("value", snapshot => {
    const rooms = [];

    snapshot.forEach(childSnapshot => {
      rooms.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });

    callback(rooms);
  });

  return () => database.ref("rooms").off();
}

function listenToBookings(callback) {
  database.ref("bookings").on("value", snapshot => {
    const bookings = [];

    snapshot.forEach(childSnapshot => {
      bookings.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });

    callback(bookings);
  });

  return () => database.ref("bookings").off();
}

function listenToBooking(bookingId, callback) {
  database.ref(`bookings/${bookingId}`).on("value", snapshot => {
    const booking = snapshot.val();

    if (booking) {
      callback({
        id: bookingId,
        ...booking
      });
    }
  });

  return () => database.ref(`bookings/${bookingId}`).off();
}

// ============ HELPER FUNCTIONS ============

function generateBookingCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "PITU-";

  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}

function normalizeBookingCode(code) {
  return String(code || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(Number(amount) || 0);
}

function formatDate(date) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}

function isAuthenticated() {
  return currentUser !== null;
}

function hasRole(roles) {
  if (typeof roles === "string") roles = [roles];
  return roles.includes(userRole);
}