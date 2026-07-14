# System Architecture

## Overview

The E-Exam System is built using a modern three-tier architecture.

## Component Diagram

### Backend Components

```
Routes
  ├── auth.js (login, register)
  ├── exams.js (CRUD operations)
  ├── questions.js (question management)
  ├── results.js (result tracking)
  └── proctoring.js (monitoring)
       ↓
Controllers
  ├── authController.js
  ├── examController.js
  ├── questionController.js
  ├── resultController.js
  └── proctoringController.js
       ↓
Middleware
  ├── auth.js (JWT verification)
  ├── validation.js
  └── errorHandler.js
       ↓
Database Layer
  └── config/database.js (Connection Pool)
```

### Frontend Components

```
App.jsx (Router)
  ├── LoginPage
  ├── RegisterPage
  ├── DashboardPage
  ├── ExamPage
  ├── ResultsPage
  └── AdminDashboard
       ↓
Components
  ├── PrivateRoute
  ├── ExamTimer
  ├── QuestionCard
  └── ResultCard
       ↓
Services
  ├── api.js (Axios Client)
  └── socket.js (WebSocket)
       ↓
Stores (Zustand)
  ├── authStore
  ├── examStore
  └── resultStore
```

## Data Flow

### User Authentication Flow

```
User Input (Email, Password)
  ↓
LoginPage Component
  ↓
API Service (POST /auth/login)
  ↓
authController.register/login
  ↓
Database Query
  ↓
JWT Token Generation
  ↓
Store Token in localStorage
  ↓
Redirect to Dashboard
```

### Exam Taking Flow

```
User Clicks "Start Exam"
  ↓
DashboardPage → ExamPage
  ↓
Fetch Exam & Questions (API)
  ↓
Start Timer (Frontend State)
  ↓
Display Question & Options
  ↓
User Selects Answer → Store in State
  ↓
Navigate Between Questions
  ↓
Submit Exam (POST /exams/:id/submit)
  ↓
Grade Answers (Backend)
  ↓
Store Result in Database
  ↓
Redirect to Results Page
```

## Database Schema Relationships

```
users
  ├── 1:N → exams (created_by)
  ├── 1:N → exam_attempts (student_id)
  └── 1:N → questions (created_by)

exams
  ├── 1:N → questions
  └── 1:N → exam_attempts

questions
  ├── 1:N → question_options
  └── 1:N → student_answers

exam_attempts
  ├── N:1 → users
  ├── N:1 → exams
  ├── 1:N → student_answers
  └── 1:N → proctoring_logs

student_answers
  ├── N:1 → exam_attempts
  ├── N:1 → questions
  └── N:1 → question_options (selected_option_id)

proctoring_logs
  └── N:1 → exam_attempts
```

## Security Architecture

- Authentication Layer: JWT Token Validation, Password Hashing (bcryptjs), Role-Based Access Control
- Authorization Layer: Route Protection, Permission Checks, Data Ownership Verification
- Input Validation Layer: Schema Validation (Joi), Sanitization, SQL Injection Prevention

## Deployment Architecture

```
Docker Containers
├── Frontend Container
│   ├── React App (Vite)
│   └── Nginx Reverse Proxy
├── Backend Container
│   ├── Express Server
│   └── Node.js Runtime
└── Database Container
    └── PostgreSQL
```

## Scaling Considerations

1. **Database**: Use read replicas for scaled reads
2. **Backend**: Horizontal scaling with load balancer
3. **Frontend**: CDN for static assets
4. **Caching**: Redis for session management
5. **Async Jobs**: Queue system for result generation
