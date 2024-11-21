# Invoice Generator

The **Invoice Generator** is a full-stack application for generating and managing invoices. It features a React-based frontend and a Node.js/Express backend. Users can create, edit, and view invoices, manage products, and handle currency settings.

Deployed Link: https://invoice-product-manager.vercel.app/

## Table of Contents

1. [Technologies Used](#technologies-used)  
2. [Installation](#installation)  
3. [Project Structure](#project-structure)  
4. [Components Overview](#components-overview)  
5. [Usage](#usage)  
6. [Backend API Endpoints](#backend-api-endpoints)  

---

## Technologies Used

### **Frontend**
- React.js
- Redux Toolkit
- CSS (with modular structure)

### **Backend**
- Node.js
- Express
- Multer (file uploads)
- Google Generative AI API integration

---

## Installation

### **Clone the repository:**
```bash
git clone https://github.com/Ayushpal11/Invoice-Product-Manager.git
```

### **Navigate to the project directory:**
```bash
cd Invoice-Generator
```

### **Install backend dependencies:**
```bash
cd backend
npm install
```

### **Install frontend dependencies:**
```bash
cd ../frontend
npm install
```

### **Set up environment variables:**
Create `.env` files in both the backend and frontend directories.

#### **Backend `.env`**
```
GOOGLE_API_KEY=your_google_api_key_here
PORT=5000
```

---

## Project Structure

```
Invoice-Generator/
├── backend/
│   ├── backend.js               # Backend server
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment variables
├── frontend/
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── product/         # Product-related UI components
│   │   │   ├── EditableField.js
│   │   │   ├── InvoiceForm.jsx  # Invoice form
│   │   │   ├── InvoiceItem.jsx
│   │   │   ├── InvoiceModal.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/               # Main app pages
│   │   │   ├── Invoice.jsx
│   │   │   ├── InvoiceList.jsx
│   │   │   └── ProductList.jsx
│   │   ├── redux/               # Redux slices and state
│   │   │   ├── currenciesSlice.js
│   │   │   ├── invoicesSlice.js
│   │   │   ├── productsSlice.js
│   │   │   └── hooks.js         # Redux hooks
│   │   ├── utils/               # Utility functions
│   │   │   └── generateRandomId.js
│   │   └── App.css              # Styling
│   └── .env                     # Environment variables
├── README.md                    # Documentation
```

---

## Components Overview

### **Reusable Components**

#### **EditableField.jsx**
- Renders an editable text field.
- Allows users to modify product or invoice details dynamically.

#### **InvoiceForm.jsx**
- Centralized form for creating or editing invoices.
- Features include product selection, price calculations, and dynamic currency conversion.

#### **InvoiceItem.jsx**
- Displays a single invoice item.
- Includes functionality for updating quantity, price, and product description.

#### **InvoiceModal.jsx**
- Popup modal for confirming actions like deleting or submitting invoices.

#### **Sidebar.jsx**
- Persistent sidebar navigation.
- Includes links to Invoice List, Product List, and other pages.

---

### **Pages**

#### **Invoice.jsx**
- Main page for creating and managing an invoice.
- Integrates `InvoiceForm` and `InvoiceItem` components.

#### **InvoiceList.jsx**
- Displays a list of saved invoices.
- Allows users to edit or delete existing invoices.

#### **ProductList.jsx**
- Page for managing products.
- Users can add, edit, or delete products.

---

### **Redux Slices**

#### **currenciesSlice.js**
- Manages the state of currency options.
- Handles currency conversion rates.

#### **invoicesSlice.js**
- Manages the state of invoices, including CRUD operations.

#### **productsSlice.js**
- Manages the state of products used in invoices.

---

### **Utils**

#### **generateRandomId.js**
- Generates unique IDs for invoices and products.
- Ensures no duplication in state management.

---

## Usage

### **Run the backend:**
```bash
cd backend
node backend.js
```

### **Run the frontend:**
```bash
cd frontend
npm start
```

### **Access the app:**
- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend API: [http://localhost:5000](http://localhost:5000)

---

## Backend API Endpoints

### **File Upload and Invoice Parsing**
**POST** `/upload-and-parse`  
- Uploads an invoice file (PDF) and extracts details using Google Generative AI.  
- **Request:** `multipart/form-data` with a `file` field.  
- **Response:** JSON with extracted invoice details.  

