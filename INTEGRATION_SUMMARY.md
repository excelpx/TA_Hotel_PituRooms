# 🔧 Firebase Integration Summary

## ✅ File yang Sudah Diintegrasikan

### 1. **firebase-config.js** (Root)
- **Lokasi:** `/firebase-config.js`
- **Fungsi:** Central configuration & shared functions untuk semua platform
- **Exports:**
  - `firebaseLogin()` - Login dengan email/password
  - `firebaseRegister()` - Register customer baru
  - `firebaseLogout()` - Logout user
  - `getCurrentUser()` - Get session user
  - `getRooms()`, `getRoom()` - Fetch rooms data
  - `updateRoomStatus()` - Update status kamar
  - `createBooking()` - Create new booking
  - `checkInGuest()`, `checkOutGuest()` - Guest operations
  - `getBookings()`, `getTransactions()` - Get history
  - `listenToRooms()`, `listenToBookings()` - Real-time listeners
  - `formatCurrency()`, `formatDate()` - Helper functions

**Setup:**
```javascript
// EDIT firebase-config.js
// Copy Firebase config dari console.firebase.google.com
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  databaseURL: "https://your-project-default-rtdb.asia-southeast2.firebaseiodb.com",
  // ... copy semua dari Firebase Console
};
```

---

### 2. **HOS - Receptionist App** (Root)
- **Main File:** `/index.html`
- **Script:** `/script.js` (updated dengan Firebase)
- **Changes:**
  ✅ Added Firebase SDK imports
  ✅ Changed login dari hardcoded demo ke Firebase Auth
  ✅ Auto-load rooms dari Firebase Database
  ✅ Real-time sync dashboard dengan Rooms & Bookings
  ✅ Check-in/Check-out menggunakan Firebase functions

**Features:**
- Login dengan email/password (Firebase)
- Dashboard dengan real-time room status
- Check-in/Check-out tamu
- View booking history
- Admin features (jika role = admin)

**Test Login:**
```
Email: receptionist@lumina.com
Password: recep123
```

---

### 3. **Customer Website** (Customer Folder)
- **Main File:** `/Customer/index.html`
- **Script:** `/Customer/script.js` (updated)
- **Changes:**
  ✅ Added Firebase SDK imports
  ✅ Auto-register customer saat booking
  ✅ Booking saved ke Firebase Database
  ✅ Real-time room availability check
  ✅ Booking code generated & saved

**Features:**
- Browse rooms from Firebase
- Online booking form
- Multiple payment methods (Cash/Cashless)
- Auto-register/login customer
- Invoice generation

**Test Flow:**
1. Fill booking form
2. Payment confirmation
3. Auto-register if new customer
4. Booking saved to Firebase
5. Success page dengan booking code

---

### 4. **Dokumentasi**
- **Setup Guide:** `/FIREBASE_SETUP.md`
- **Integration Guide:** `/README_FIREBASE_INTEGRATION.md`

---

## 🗄️ Firebase Database Structure

```
lumina-stay-hotel/
│
├── users/
│   ├── {userId}/
│   │   ├── email: string
│   │   ├── name: string
│   │   ├── phone: string
│   │   ├── role: "admin" | "receptionist" | "customer"
│   │   ├── createdAt: timestamp
│   │   └── lastLogin: timestamp
│
├── rooms/
│   ├── {roomId}/
│   │   ├── number: string
│   │   ├── type: "Deluxe" | "Studio"
│   │   ├── price: number (850000 or 600000)
│   │   ├── capacity: number
│   │   ├── floor: number
│   │   ├── status: "Available" | "Occupied" | "OutOfOrder"
│   │   ├── facilities: array
│   │   ├── images: array
│   │   ├── createdAt: timestamp
│   │   └── lastUpdated: timestamp
│
├── bookings/
│   ├── {bookingId}/
│   │   ├── code: "PITU-ABC123"
│   │   ├── customerId: string
│   │   ├── customerName: string
│   │   ├── customerEmail: string
│   │   ├── customerPhone: string
│   │   ├── roomType: "Deluxe" | "Studio"
│   │   ├── checkIn: date string
│   │   ├── checkOut: date string
│   │   ├── duration: number (nights)
│   │   ├── pricePerNight: number
│   │   ├── subtotal: number
│   │   ├── tax: number
│   │   ├── total: number
│   │   ├── paymentMethod: "Cash" | "Cashless"
│   │   ├── status: "Confirmed" | "CheckedIn" | "CheckedOut" | "Cancelled"
│   │   ├── notes: string
│   │   ├── createdAt: timestamp
│   │   ├── updatedAt: timestamp
│   │   └── checkInBy: userId
│
├── transactions/
│   ├── {transactionId}/
│   │   ├── bookingId: string
│   │   ├── type: "CheckIn" | "CheckOut" | "Payment"
│   │   ├── amount: number
│   │   ├── paymentMethod: string
│   │   ├── processedBy: userId
│   │   ├── timestamp: timestamp
│   │   └── notes: string
│
└── settings/
    └── hotel/
        ├── name: "Lumina Stay"
        ├── address: string
        ├── phone: string
        ├── email: string
        └── taxRate: 0.10
```

---

## 🔄 Real-Time Data Flow

### Contoh 1: Customer membuat booking

```
Customer Website
  ↓ (fill booking form)
  ↓ (click "Konfirmasi & Pesan")
  ↓ (createBooking() -> Firebase)

Firebase Realtime Database
  ✓ bookings/{id} created dengan status "Confirmed"
  ✓ Triggering listeners...
  ↓
HOS Receptionist Dashboard
  ✓ stat-booking-code-pending updated
  ✓ Notifikasi booking baru muncul
  ↓
Admin Dashboard
  ✓ New booking ditampilkan
```

### Contoh 2: Receptionist check-in guest

```
HOS (Receptionist)
  ↓ (select booking & click "Check-In")
  ↓ (checkInGuest() -> Firebase)

Firebase
  ✓ booking.status = "CheckedIn"
  ✓ booking.roomNumber = "101"
  ✓ transaction created (type: "CheckIn")
  ↓
Customer Website (jika login)
  ✓ Booking status updated
  ✓ Check-in confirmation
  ↓
Admin Dashboard
  ✓ Kamar status updated: Occupied
  ✓ Transaction logged
```

---

## 📋 Database Rules (Security)

Sudah dikonfigurasi di `/firebase-config.js` dan dokumentasi:

```
✓ Users: Private (hanya user sendiri atau admin bisa baca/tulis)
✓ Rooms: Public read, Admin/Receptionist can write
✓ Bookings: Authenticated users, owner dan staff bisa access
✓ Transactions: Staff only (admin/receptionist)
✓ Settings: Public read, Admin only write
```

---

## 🚀 Deployment Checklist

- [ ] Setup Firebase project di console.firebase.google.com
- [ ] Copy Firebase config ke `firebase-config.js`
- [ ] Setup Database Rules
- [ ] Create demo users di Authentication
- [ ] Create demo rooms di Database
- [ ] Test HOS login dengan receptionist@lumina.com / recep123
- [ ] Test Customer booking
- [ ] Test real-time sync antar aplikasi
- [ ] (Optional) Setup email service untuk send invoice

---

## 🔗 Integration Points

### Antara HOS & Customer Website:

**Melalui Firebase Database:**

1. **Rooms Data Sync:**
   - Customer website read rooms dari Firebase
   - HOS dapat update room status saat check-in/out
   - Status langsung sync ke Customer website

2. **Bookings Sync:**
   - Customer create booking → Firebase
   - HOS read pending bookings → Real-time update
   - Receptionist check-in → Room status updated
   - Sync kembali ke Customer website

3. **User Authentications:**
   - Both platforms use Firebase Auth
   - Same user credentials
   - Session management terpusat

---

## 📱 Platform Features Comparison

| Feature | HOS | Customer | Admin |
|---------|-----|----------|-------|
| Login | ✅ | ✅ | ✅ |
| View Rooms | ✅ | ✅ | ✅ |
| Create Booking | ❌ | ✅ | ✅ |
| Check-In/Out | ✅ | ❌ | ✅ |
| Update Room Status | ✅ | ❌ | ✅ |
| View Bookings | ✅ | ✅ | ✅ |
| View Transactions | ✅ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |
| Real-time Updates | ✅ | ✅ | ✅ |

---

## 🎯 Next Steps (Optional Enhancements)

1. **Email Service:**
   - Integrate SendGrid atau Gmail API
   - Send invoice otomatis saat booking

2. **Payment Gateway:**
   - Integrate Midtrans atau Stripe
   - Process pembayaran cashless

3. **Mobile App:**
   - Build React Native app
   - Use same Firebase backend

4. **Admin Dashboard:**
   - Create dedicated admin panel
   - Real-time analytics & reports

5. **SMS Notifications:**
   - Integrate Twilio
   - Send check-in reminder

6. **QR Code Check-in:**
   - Generate QR per booking
   - Scan untuk auto-check-in

---

## 💡 Tips & Best Practices

1. **Development Mode:**
   - Use Test Mode rules untuk Firebase
   - Setup proper security rules sebelum production

2. **Performance:**
   - Use indexes untuk queries yang sering
   - Limit real-time listeners hanya untuk data yang dibutuhkan
   - Offload heavy computations ke backend

3. **Error Handling:**
   - Selalu check result.success sebelum use data
   - Show user-friendly error messages
   - Log errors untuk debugging

4. **User Experience:**
   - Show loading states saat fetch data
   - Handle offline scenarios
   - Provide fallback jika Firebase down

5. **Security:**
   - Never expose Firebase config API key di production
   - Use environment variables
   - Implement rate limiting
   - Validate input di backend

---

## 🆘 Support

Untuk pertanyaan atau masalah:
1. Check FIREBASE_SETUP.md untuk setup issues
2. Check README_FIREBASE_INTEGRATION.md untuk usage
3. Check browser console untuk error messages
4. Verify Firebase config & database rules

---

**Terima kasih telah menggunakan Lumina Stay Hotel System! 🎉**
