# PrimeKart 🛒

A modern, scalable **Next.js eCommerce frontend** built with clean architecture and user‑focused design. PrimeKart provides a fast and interactive shopping experience, modular components, reusable logic, and a clean folder structure ideal for production‑ready applications.

---

## 🚀 Features

* **Next.js App Router** with server & client components
* **Context API** for global state management
* **Reusable UI Components** for faster development
* **Optimized Performance** using Next.js image optimization & routing
* **Modern Styling** with PostCSS / Tailwind (if used)
* **API Integration Ready** with modular service structures
* **Responsive Design** for mobile, tablet, and desktop

---

## 📁 Project Structure

```
PrimeKart-Client
│
├── public/             # Static assets
├── src/
│   ├── Component/      # UI components
│   ├── Context/        # Global state providers
│   ├── app/            # Pages & layouts (Next.js App Router)
│   ├── lib/            # Utilities & config
│   └── middleware.js   # Next.js middleware
│
├── package.json        # Dependencies & scripts
├── next.config.mjs     # Next.js configuration
└── README.md           # Project documentation
```

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-repo/PrimeKart-Client.git
cd PrimeKart-Client
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Run the Development Server**

```bash
npm run dev
```

Visit: **[http://localhost:3000](http://localhost:3000)**

### **4️⃣ Build for Production**

```bash
npm run build
npm start
```

---

## 🔧 Tech Stack

* **Next.js 14+** (App Router)
* **React 18**
* **PostCSS**
* **ESLint**
* **Context API**
* **Node.js** (for setup & tooling)

---

## 🤝 Contributing

Contributions, ideas, and improvements are welcome! Feel free to open a PR or issue.

---

## 🧩 Backend Overview

PrimeKart includes a fully‑functional **Express.js + MongoDB server** providing authentication, product management, and order processing.

### 🔐 Authentication & Authorization

* JWT‑based authentication
* Password hashing using **bcryptjs**
* Google OAuth login support
* Role‑based access (admin/user)

### 🛍️ Product Management

* Public product retrieval endpoints
* Admin‑only product creation, update, and deletion

### 📦 Order Management

* Users can place orders
* Users can fetch their own orders
* Admins can manage and update all orders

### 📊 Admin Summary API

* Total users
* Total products
* Orders overview
* Recent orders
* Pending count

### 🗄️ MongoDB Collections

* **users**
* **products**
* **orders**

---

## 📌 Upcoming Features

Here are meaningful upcoming enhancements that are **not already implemented** in your backend or frontend, focusing on improvements beyond the current features.

### **🔹 Advanced Product Filtering System**

* Multi-filter (category, price range, ratings, brand)
* Debounced search with suggestions
* Server-side pagination for large product lists

### **🔹 Enhanced Cart & Checkout Experience**

* Coupon/discount system
* Delivery charges & tax calculation
* Saved addresses for quick checkout

### **🔹 Admin Dashboard Expansion**

* Graphs & analytics (sales trends, popular products)
* Revenue dashboard
* Admin activity logs

### **🔹 Notification System**

* Email notifications for orders
* Admin alerts for low stock
* Optional SMS integration

### **🔹 Review & Rating System**

* Product reviews from verified buyers
* Star ratings & helpful votes

### **🔹 Wishlist / Favorites System**

* Save products for later
* Sync between devices

### **🔹 Performance & SEO Enhancements**

* Image optimization pipeline
* SSR + ISR improvements
* Core Web Vitals optimization

### **💡 Future Innovative Ideas**

* AI‑powered product recommendations
* Multi-vendor marketplace mode
* Personalized user feeds

---
