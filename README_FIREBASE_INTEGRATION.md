# 🏨 Lumina Stay Hotel - Integrated Booking System
## Receptionist (HOS) + Admin + Customer Website (Firebase)

---

## 📋 Struktur Aplikasi

```
Lumina Stay System terdiri dari 3 platform yang saling terhubung:

1. **HOS (Hotel Operating System)** - Receptionist App
   - Folder: `/` (root)
   - File: `index.html`, `script.js`, `style.css`
   - Fungsi: Check-in/out tamu, lihat kamar tersedia, manajemen booking
   - User: Receptionist & Admin

2. **Customer Website** - Booking Online
   - Folder: `/Customer`
   - File: `index.html`, `script.js`, `style.css`
   - Fungsi: Browse kamar, buat reservasi, pembayaran
   - User: Customer (public)

3. **Firebase Database** - Backend Terpusat
   - Realtime Database untuk sync data antar platform
   - Authentication untuk login/security
   - Struktur: users, rooms, bookings, transactions, settings
```

---

## 🔥 Setup Firebase (Step-by-Step)

### 1. Create Firebase Project

```
1. Buka https://console.firebase.google.com/
2. Klik "Add Project"
3. Nama Project: "Lumina Stay Hotel"
4. Uncheck "Enable Google Analytics" (opsional)
5. Tunggu project created
```

### 2. Aktifkan Services

**Authentication:**
```
- Klik "Authentication" di sidebar kiri
- Klik "Get Started"
- Enable: Email/Password
- (Opsional) Enable: Google Sign-in
- Save
```

**Realtime Database:**
```
- Klik "Realtime Database" di sidebar
- Klik "Create Database"
- Location: asia-southeast2 (Singapore)
- Start in: Test Mode (untuk development)
- Enable
```

### 3. Copy Firebase Config

```
- Klik Settings (icon gear) → Project Settings
- Scroll ke "Your apps"
- Klik Web app icon (</>)
- Copy Firebase config JSON
```

Contoh config akan terlihat seperti:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "lumina-stay-xxxx.firebaseapp.com",
  projectId: "lumina-stay-xxxx",
  storageBucket: "lumina-stay-xxxx.appspot.com",
  messagingSenderId: "123456789",
  databaseURL: "https://lumina-stay-xxxx-default-rtdb.asia-southeast2.firebaseiodb.com",
  appId: "1:123456789:web:abcdef..."
};
```

### 4. Paste Config ke firebase-config.js

Di file `/firebase-config.js`, ganti section:
```javascript
const firebaseConfig = {
  // PASTE CONFIG FIREBASE ANDA DI SINI
  apiKey: "PASTE_DARI_FIREBASE_CONSOLE",
  authDomain: "PASTE_DARI_FIREBASE_CONSOLE",
  projectId: "PASTE_DARI_FIREBASE_CONSOLE",
  // ... dst
};
```

### 5. Setup Database Rules

Di Firebase Console → Realtime Database → Rules, paste:

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

Klik "Publish"

### 6. Create Demo Users (Firebase Authentication)

Di Firebase Console → Authentication → Users, klik "Add User":

**User 1: Receptionist**
```
Email: receptionist@lumina.com
Password: recep123
```

**User 2: Admin**
```
Email: admin@lumina.com
Password: admin123
```

**User 3: Customer**
```
Email: customer1@lumina.com
Password: customer123
```

### 7. Add User Roles di Database

Di Firebase Console → Realtime Database, buat struktur:

```
users/
  {receptionist-uid}/
    email: "receptionist@lumina.com"
    name: "Petugas Resepsionis"
    phone: "+62812xxxx"
    role: "receptionist"
    createdAt: "2026-05-25"
    lastLogin: null

  {admin-uid}/
    email: "admin@lumina.com"
    name: "Admin Eksekutif"
    phone: "+62812xxxx"
    role: "admin"
    createdAt: "2026-05-25"
    lastLogin: null

  {customer-uid}/
    email: "customer1@lumina.com"
    name: "Customer Test"
    phone: "+62812xxxx"
    role: "customer"
    createdAt: "2026-05-25"
    lastLogin: null
```

### 8. Add Rooms Data

Di Database, buat:

```
rooms/
  room1/
    number: "101"
    type: "Deluxe"
    price: 850000
    capacity: 2
    floor: 1
    status: "Available"
    facilities: ["AC", "WiFi", "TV Smart", ...]
    createdAt: "2026-05-25"
    lastUpdated: "2026-05-25"

  room2/
    number: "102"
    type: "Studio"
    price: 600000
    capacity: 1
    floor: 1
    status: "Available"
    facilities: ["AC", "WiFi", "TV", ...]
    createdAt: "2026-05-25"
    lastUpdated: "2026-05-25"

  ... (add more rooms)
```

---

## 🚀 Run Applications

### Opsi 1: Local Development (No Server Needed)

```bash
# HOS (Receptionist) - Buka di browser
file:///path/to/piturooms/index.html

# Customer Website - Buka di browser
file:///path/to/piturooms/Customer/index.html
```

### Opsi 2: Local Server (Recommended)

**Python 3:**
```bash
cd /path/to/piturooms
python -m http.server 8000
```

Buka di browser:
- HOS: http://localhost:8000
- Customer: http://localhost:8000/Customer

**Node.js (with http-server):**
```bash
npm install -g http-server
cd /path/to/piturooms
http-server
```

---

## 📱 How to Use

### Customer Website Flow:

1. **Open:** `http://localhost:8000/Customer/index.html`
2. **Browse Rooms:** Klik "Lihat Detail & Fasilitas"
3. **Book:** 
   - Isi data pribadi (Nama, Email, Telepon, KTP)
   - Pilih tipe kamar
   - Pilih tanggal check-in/checkout
   - Pilih metode pembayaran (Cash/Cashless)
   - Klik "Lanjut ke Pembayaran"
4. **Confirm:** Klik "Konfirmasi & Pesan"
5. **Success:** Dapatkan Booking Code (PITU-XXXX)
6. **Email:** Invoice akan dikirim ke email (demo: console log)

### Receptionist App (HOS) Flow:

1. **Open:** `http://localhost:8000/index.html`
2. **Login:** 
   - Email: receptionist@lumina.com
   - Password: recep123
3. **Dashboard:** Lihat kamar tersedia, pending bookings
4. **Check-In:** 
   - Verifikasi booking code
   - Alokasi kamar
   - Proses pembayaran
5. **Check-Out:** 
   - Pilih kamar terisi
   - Hitung surcharge (jika ada)
   - Proses checkout

### Admin Dashboard:

1. **Open:** `http://localhost:8000/index.html`
2. **Login:**
   - Email: admin@lumina.com
   - Password: admin123
3. **Features:**
   - Executive Analytics
   - Manage Rooms & Inventory
   - User Accounts
   - Guest Database
   - Transaction History

---

## 🔄 Real-Time Sync (Firebase)

Semua perubahan sync real-time antar aplikasi:

```
Customer membuat booking
↓
Firebase: bookings/{id} created
↓
HOS refresh dashboard (pending bookings updated)
↓
Receptionist check-in guest
↓
Firebase: bookings/{id} status updated
↓
Customer dapat notifikasi (jika implementasi)
↓
Room status changed: Occupied
↓
Admin dashboard updated
```

---

## 📧 Email Integration (Optional)

Untuk mengirim invoice email, setup backend:

**Express.js + NodeMailer:**
```javascript
// backend/send-invoice.js
const express = require('express');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'app-specific-password'
  }
});

app.post('/api/send-invoice', async (req, res) => {
  const { email, subject, htmlContent } = req.body;
  
  try {
    await transporter.sendMail({
      from: 'noreply@luminastay.com',
      to: email,
      subject: subject,
      html: htmlContent
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

Update `Customer/script.js`:
```javascript
// Ketika booking berhasil, kirim invoice email
const invoiceHTML = generateInvoiceHTML(invoiceData);

fetch('http://your-backend.com/api/send-invoice', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: email,
    subject: `Invoice Booking PITU-${bookingCode}`,
    htmlContent: invoiceHTML
  })
});
```

---

## 🔐 Security Tips

1. **Firebase Rules:** Selalu gunakan security rules yang ketat (sudah disediakan)
2. **Environment Variables:** Jangan hardcode API keys (gunakan .env untuk production)
3. **HTTPS:** Selalu gunakan HTTPS di production
4. **Validation:** Validate input di frontend DAN backend
5. **Rate Limiting:** Protect API endpoints dengan rate limiting

---

## 🐛 Troubleshooting

| Error | Solution |
|-------|----------|
| "Firebase is not defined" | Pastikan Firebase SDK CDN dimuat sebelum firebase-config.js |
| "Permission denied" | Check Firebase Rules dan user role di database |
| "Rooms tidak muncul" | Pastikan rooms sudah ada di database |
| "Login gagal" | Pastikan email/password benar & user sudah ada di Authentication |

---

## 📞 Support & Contact

**Hotel Lumina Stay:**
- Phone: +62 812-3456-7890
- Email: support@luminastay.com
- Address: Jln. Contoh No. 123, Jakarta

---

## 📝 Changelog

- **v1.0** (2026-05-25): Initial release dengan Firebase integration
  - HOS (Receptionist) + Customer Website
  - Firebase Authentication & Realtime Database
  - Booking system dengan multi-currency support

---

**Happy Booking! 🎉**
