# Installation Guide

## System Requirements

- Node.js 16 or higher
- PostgreSQL 12 or higher
- npm 8 or higher
- Git

## Backend Installation

### 1. Clone the Repository

```bash
git clone https://github.com/oniflexz/e-exam-system.git
cd e-exam-system/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and update the following:

```
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=e_exam_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=24h

CLIENT_URL=http://localhost:3000
```

### 4. Setup Database

#### Using PostgreSQL CLI

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE e_exam_db;

# Connect to the database
\c e_exam_db

# Run migrations
\i migrations/001_initial_schema.sql
```

#### Or using Node.js migration runner

```bash
npm run migrate
```

### 5. Start Backend Server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The server should be running at `http://localhost:5000`

## Frontend Installation

### 1. Navigate to Frontend Directory

```bash
cd ../frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file:

```
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Frontend Development Server

```bash
npm run dev
```

The frontend should be running at `http://localhost:3000`

## Docker Setup (Optional)

### 1. Create Docker Compose File

The `docker-compose.yml` is included in the project root.

### 2. Build and Start Services

```bash
docker-compose up -d
```

### 3. Initialize Database

```bash
docker-compose exec backend npm run migrate
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- PostgreSQL: localhost:5432

## Verification

### Check Backend Health

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Test Frontend

Open http://localhost:3000 in your browser. You should see the login page.

## Troubleshooting

### Database Connection Error

- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists: `psql -U postgres -l`

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Create test user accounts
2. Create sample exams
3. Add questions and options
4. Configure email notifications (optional)
5. Set up SSL certificates for production
