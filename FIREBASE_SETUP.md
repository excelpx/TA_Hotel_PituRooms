<!-- Firebase Config dan Setup Guide -->

# 🔥 Firebase Integration Guide - Lumina Stay Hotel System

## 1. Setup Firebase Project

### Step 1: Buat Project Firebase
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add Project" → Nama: "Lumina Stay Hotel"
3. Aktifkan Google Analytics (opsional)
4. Tunggu project selesai dibuat

### Step 2: Aktifkan Services
1. **Authentication:**
   - Klik "Authentication" di sidebar
   - Klik "Get Started"
   - Enable: Email/Password, Google Sign-in
   
2. **Realtime Database:**
   - Klik "Realtime Database"
   - Klik "Create Database"
   - Start in Test Mode (untuk development)
   - Choose region: "asia-southeast2" (Singapore)

3. **Firestore** (Optional, untuk backup):
   - Klik "Firestore Database"
   - Create Database in Test Mode

### Step 3: Copy Firebase Config
1. Project Settings → Project Settings (ikon gear)
2. Scroll ke "Your apps"
3. Click Web app icon (</>) 
4. Copy Firebase config
5. Paste di `firebase-config.js` (file yang akan dibuat)

---

## 2. Firebase Database Structure

```
lumina-stay-hotel/
├── users/
│   ├── {userId}/
│   │   ├── email: string
│   │   ├── name: string
│   │   ├── role: "admin" | "receptionist" | "customer"
│   │   ├── phone: string
│   │   ├── createdAt: timestamp
│   │   └── lastLogin: timestamp
│
├── rooms/
│   ├── {roomId}/
│   │   ├── number: string (e.g., "101", "102")
│   │   ├── type: "Deluxe" | "Studio"
│   │   ├── price: number
│   │   ├── status: "Available" | "Occupied" | "OutOfOrder"
│   │   ├── capacity: number
│   │   ├── floor: number
│   │   ├── facilities: array
│   │   ├── images: array
│   │   ├── createdAt: timestamp
│   │   └── lastUpdated: timestamp
│
├── bookings/
│   ├── {bookingId}/
│   │   ├── code: string (e.g., "PITU-ABC123")
│   │   ├── customerId: string
│   │   ├── customerName: string
│   │   ├── customerEmail: string
│   │   ├── customerPhone: string
│   │   ├── roomId: string
│   │   ├── roomType: string
│   │   ├── roomNumber: string
│   │   ├── checkIn: date
│   │   ├── checkOut: date
│   │   ├── duration: number
│   │   ├── pricePerNight: number
│   │   ├── subtotal: number
│   │   ├── tax: number
│   │   ├── total: number
│   │   ├── paymentMethod: "Cash" | "Cashless"
│   │   ├── status: "Confirmed" | "CheckedIn" | "CheckedOut" | "Cancelled"
│   │   ├── notes: string
│   │   ├── createdAt: timestamp
│   │   ├── updatedAt: timestamp
│   │   └── checkInBy: string (userId)
│
├── transactions/
│   ├── {transactionId}/
│   │   ├── bookingId: string
│   │   ├── type: "CheckIn" | "CheckOut" | "Payment"
│   │   ├── amount: number
│   │   ├── paymentMethod: string
│   │   ├── processedBy: string (userId)
│   │   ├── timestamp: timestamp
│   │   └── notes: string
│
└── settings/
    └── hotel/
        ├── name: "Lumina Stay"
        ├── address: string
        ├── phone: string
        ├── email: string
        └── taxRate: number (0.10 = 10%)
```

---

## 3. Security Rules untuk Realtime Database

Paste ini di Firebase Realtime Database Rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'",
        ".write": "$uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'"
      }
    },
    "rooms": {
      ".read": true,
      ".write": "root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'receptionist'"
    },
    "bookings": {
      "$bookingId": {
        ".read": "auth.uid !== null",
        ".write": "root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'receptionist' || root.child('bookings').child($bookingId).child('customerId').val() === auth.uid"
      }
    },
    "transactions": {
      ".read": "root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'receptionist'",
      ".write": "root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'receptionist'"
    },
    "settings": {
      ".read": true,
      ".write": "root.child('users').child(auth.uid).child('role').val() === 'admin'"
    }
  }
}
```

---

## 4. Demo Users (Create Manually di Firebase Auth)

| Email | Password | Role | Aplikasi |
|-------|----------|------|----------|
| receptionist@lumina.com | recep123 | receptionist | HOS (Receptionist App) |
| admin@lumina.com | admin123 | admin | Admin Dashboard |
| customer1@lumina.com | customer123 | customer | Customer Website |

---

## 5. Files to Create/Update

- ✅ `firebase-config.js` - Config & shared functions
- ✅ `index.html` - HOS (Receptionist) - Add Firebase Auth
- ✅ `Customer/index.html` - Customer App - Add Firebase booking
- ✅ Admin app - Add Firebase integration

---

## Next Steps:
1. Setup Firebase project & copy config
2. Run initialization script di console
3. Test login di semua platform
4. Verify real-time sync

