# N5ARPITA - Luxury Cosmetics E-Commerce Platform

![N5ARPITA Logo](https://img.shields.io/badge/N5ARPITA-Luxury_Cosmetics-gold?style=for-the-badge)

**Tagline:** *"Luxury in Every Drop"*

A premium, full-stack e-commerce platform for luxury cosmetics built with Spring Boot (Java 17) and React (Vite).

---

## 🌟 Features

### Customer Features
- ✨ Browse luxury cosmetic products by category
- 🔍 Search and filter products
- 🛒 Shopping cart management
- 👤 User authentication (Register/Login)
- 🎯 Featured products showcase
- 💳 Order placement (checkout flow)
- 📦 Order history and tracking
- ⭐ Product reviews and ratings

### Admin Features
- 📊 Admin dashboard
- ➕ Create, update, and delete products
- 📦 Order management and status updates
- 🎫 Coupon/promo code management
- 👥 User management

### Technical Features
- 🔐 JWT-based authentication
- 🎨 Luxury dark theme with gold accents
- 📱 Fully responsive design
- 🚀 RESTful API architecture
- 🐳 Docker containerization
- 💾 MySQL database
- 🎭 Premium UI/UX with animations

---

## 🏗️ Architecture

```
n5arpita/
├── backend/          # Spring Boot REST API
├── frontend/         # React (Vite) SPA
└── docker-compose.yml
```

**Tech Stack:**
- **Backend:** Spring Boot 3.2, Spring Security, JPA/Hibernate, JWT
- **Frontend:** React 18, Vite, React Router, Axios
- **Database:** MySQL 8
- **Containerization:** Docker & Docker Compose

---

## 🚀 Quick Start

### Prerequisites
- Docker Desktop (includes Docker Compose)
- Java 17+ (for local dev)
- Node.js 18+ (for local dev)

### Run with Docker (Recommended)

1. **Clone/Navigate to the project:**
   ```bash
   cd /Users/jenishpadasala004477/Desktop/portfolio-project/n5arpita
   ```

2. **Start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - **Frontend:** http://localhost:5173
   - **Backend API:** http://localhost:8080
   - **Database:** localhost:3307

4. **Default Admin Credentials** (Create manually after startup):
   - Email: `admin@n5arpita.com`
   - Password: `admin123`
   
   To create admin user, use the API:
   ```bash
   curl -X POST http://localhost:8080/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Admin",
       "email": "admin@n5arpita.com",
       "password": "admin123"
     }'
   ```
   Then manually update the role to `ADMIN` in the database.

### Stop Services
```bash
docker-compose down
```

### Clear All Data and Restart
```bash
docker-compose down -v
docker-compose up --build
```

---

## 💻 Local Development (Without Docker)

### Backend (Spring Boot)

1. **Install MySQL and create database:**
   ```sql
   CREATE DATABASE n5arpita;
   CREATE USER 'n5arpita_user'@'localhost' IDENTIFIED BY 'n5arpita_password';
   GRANT ALL PRIVILEGES ON n5arpita.* TO 'n5arpita_user'@'localhost';
   ```

2. **Update `backend/src/main/resources/application.properties`:**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/n5arpita
   ```

3. **Run backend:**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

### Frontend (React)

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Update Vite proxy** (if needed) in `vite.config.js`:
   ```javascript
   proxy: {
     '/api': {
       target: 'http://localhost:8080',
       changeOrigin: true
     }
   }
   ```

3. **Run frontend:**
   ```bash
   npm run dev
   ```

---

## 📊 Database Schema

Key entities:
- **User** - Customer and admin accounts
- **Product** - Cosmetic products
- **Category** - Product categories
- **Cart** - Shopping carts
- **Order** - Placed orders
- **Review** - Product reviews
- **Coupon** - Discount codes

---

## 🎨 Design Philosophy

**Brand Identity:**
- **Colors:** Black (#0a0a0a), Gold (#d4af37)
- **Typography:** Playfair Display (headings), Inter (body)
- **Aesthetic:** Premium, elegant, luxurious

**Key Design Elements:**
- Dark theme with gold accents
- Smooth animations and transitions
- Glassmorphism effects
- Responsive mobile-first approach

---

## 🔒 Security

- JWT-based authentication
- Password hashing with BCrypt
- Role-based access control (CUSTOMER, ADMIN)
- CORS configuration for frontend-backend communication
- SQL injection prevention via JPA

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - List products (with pagination)
- `GET /api/products/{id}` - Get product details
- `GET /api/products/featured` - Get featured products

### Cart (Authenticated)
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/{productId}` - Update quantity
- `DELETE /api/cart/items/{productId}` - Remove item

### Orders (Authenticated)
- `POST /api/orders` - Create order
- `GET /api/orders/my` - Get user orders

### Admin (Admin Only)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product
- `GET /api/admin/orders` - List all orders
- `PUT /api/admin/orders/{id}/status` - Update order status

---

## 🛠️ Development

### Adding Sample Data

You can add sample categories and products via the API or directly in MySQL:

```sql
-- Sample Category
INSERT INTO categories (name, slug, description, active, display_order, created_at) 
VALUES ('Skin Care', 'skin-care', 'Premium skin care products', true, 1, NOW());

-- Sample Product (replace category_id with actual ID)
INSERT INTO products (name, slug, description, price, mrp, sku, category_id, active, featured, stock_quantity, created_at) 
VALUES ('Gold Serum', 'gold-serum', 'Luxury gold-infused face serum', 2999.00, 3999.00, 'N5A-SERUM-001', 1, true, true, 50, NOW());
```

### Building for Production

**Backend:**
```bash
cd backend
./mvnw clean package
java -jar target/*.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve dist/ folder with any static server
```

---

## 📝 License

© 2024 N5ARPITA. All rights reserved.

---

## 🤝 Support

For issues or questions, please create an issue in the repository.

---

**N5ARPITA - Pure. Elegant. You.**
