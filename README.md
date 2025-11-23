# Portfolio Project - Full Stack Application

A complete portfolio application with authentication, role-based access, and project management.

## 🎯 What This Project Does

- **Public Pages**: Home, Projects, About, Contact (anyone can view)
- **Admin Panel**: Create, edit, delete projects (admin only)
- **Authentication**: Login system using Keycloak
- **Role-Based Access**: Different permissions for admin vs regular users

## 🏗️ Architecture

```
Frontend (React) → Backend API (Spring Boot) → MySQL Database
         ↓
    Keycloak (Authentication)
```

### Technologies Used

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend | React + Vite + Tailwind | User interface |
| **Backend** | Spring Boot (Java) | API and business logic |
| **Database** | MySQL | Data storage |
| **Authentication** | Keycloak | Login, security, roles |
| **Deployment** | Docker Compose | Easy setup and deployment |

## 🚀 Quick Setup (3 Steps)

### Step 1: Fix MySQL Permissions

**Why?** Docker containers need permission to connect to your MySQL.

```bash
mysql -u root -p
```

Then run:
```sql
CREATE DATABASE IF NOT EXISTS keycloak_db;
CREATE DATABASE IF NOT EXISTS portfolio_db;

CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY 'YOUR_MYSQL_PASSWORD';
GRANT ALL PRIVILEGES ON keycloak_db.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
EXIT;
```

**Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL password.**

### Step 2: Update Password in docker-compose.yml

Open `docker-compose.yml` and find these 2 lines (around line 36 and 83):

```yaml
KC_DB_PASSWORD: "YOUR_MYSQL_PASSWORD"
SPRING_DATASOURCE_PASSWORD: "YOUR_MYSQL_PASSWORD"
```

**Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL password.**

### Step 3: Start Services

```bash
cd portfolio-project
docker compose up --build
```

Wait 2-5 minutes for everything to start.

## ✅ Verify It Works

1. **Frontend**: http://localhost:3000
2. **Backend API**: http://localhost:8080/api/projects
3. **Keycloak Admin**: http://localhost:8081 (admin/admin)

### Test Login

1. Go to http://localhost:3000
2. Click "Login"
3. Login with: `admin` / `admin123`
4. Click "Admin" in navbar
5. You should see the admin dashboard

## 📁 Project Structure

```
portfolio-project/
├── frontend/              # React application
│   ├── src/
│   │   ├── pages/        # Home, Projects, About, Contact, Admin
│   │   ├── components/    # Navbar, ProtectedRoute
│   │   ├── context/      # KeycloakContext (authentication)
│   │   └── services/     # API service
│   └── Dockerfile
│
├── backend/               # Spring Boot API
│   ├── src/main/java/
│   │   └── com/example/portfolio/
│   │       ├── config/      # SecurityConfig
│   │       ├── controller/  # ProjectController, AdminController
│   │       ├── model/       # Project entity
│   │       ├── repository/  # ProjectRepository
│   │       ├── security/    # KeycloakRoleConverter
│   │       └── service/     # ProjectService
│   └── Dockerfile
│
├── keycloak-26.4.4/       # Your Keycloak with providers
├── keycloak-realm-export.json  # Keycloak realm config
└── docker-compose.yml     # Orchestrates all services
```

## 🔧 How It Works

### Authentication Flow

1. User clicks "Login" → Redirected to Keycloak
2. User enters credentials → Keycloak validates
3. Keycloak generates JWT token → User redirected back
4. Frontend stores token → Sends with API requests
5. Backend validates token → Checks user role
6. Access granted/denied based on role

### Data Flow

1. User requests data → Frontend makes API call
2. Backend receives request → Validates token
3. Backend queries MySQL → Gets data
4. Backend returns JSON → Frontend displays

### Role-Based Access

- **Regular User**: Can view projects, cannot access admin
- **Admin User**: Can view projects + create/edit/delete

## 🛠️ Common Commands

```bash
# Start all services
docker compose up --build

# Stop all services
docker compose down

# View logs
docker compose logs

# Check service status
docker compose ps

# Restart a service
docker compose restart keycloak
```

## 🔐 Default Credentials

- **Keycloak Admin**: `admin` / `admin`
- **Application User**: `admin` / `admin123`
- **MySQL**: `root` / `YOUR_PASSWORD`

## 🐛 Troubleshooting

### "Access denied for user 'root'@'localhost'"

**Fix**: Run Step 1 (MySQL permissions) again. Make sure you see `root@%` when you run:
```sql
SELECT user, host FROM mysql.user WHERE user = 'root';
```

### "Port already in use"

**Fix**: Stop the application using that port, or change the port in `docker-compose.yml`.

### "Cannot connect to MySQL"

**Fix**: 
- Check MySQL is running: `mysql -u root -p`
- Verify password in `docker-compose.yml` matches your MySQL password
- Check MySQL is listening on all interfaces (not just localhost)

## 📚 Understanding the Technologies

### Why React?
- Industry standard for building user interfaces
- Component-based (reusable code)
- Fast and responsive

### Why Spring Boot?
- Secure and powerful Java framework
- Handles security, database connections automatically
- Industry standard for enterprise applications

### Why Keycloak?
- Professional authentication system
- Handles login, tokens, roles automatically
- Don't need to build security from scratch

### Why Docker?
- Consistent environment (works the same everywhere)
- Easy to deploy
- Isolated services (one doesn't affect another)

### Why MySQL?
- Reliable database
- You already have it set up
- Works well with Java/Spring Boot

## 🎓 Key Concepts

### JWT Tokens
- Secure way to prove identity
- Like an ID card that can't be forged
- Contains user info and roles

### CORS
- Allows frontend (port 3000) to call backend (port 8080)
- Security feature in browsers

### Docker Volumes
- Persistent storage (data survives container restarts)
- Keycloak data is stored in a volume

## 🚀 Next Steps

1. **Customize**: Change colors, add features
2. **Deploy**: Put it on a server (AWS, Heroku, etc.)
3. **Learn**: Explore the code, understand each component
4. **Extend**: Add user profiles, comments, etc.

## 📝 Notes

- MySQL runs on your machine (not in Docker)
- Keycloak providers are mounted from `keycloak-26.4.4/providers`
- All services communicate through Docker network
- Frontend is served via Nginx in production mode

---

**Ready to start?** Follow the 3 steps above!
