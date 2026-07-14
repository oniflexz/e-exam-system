# Electronic Examination System

A comprehensive, real-time electronic examination platform with authentication, proctoring, and result analytics.

## Features

- **User Management**: Authentication for students, teachers, and admins
- **Exam Management**: Create, schedule, and manage exams
- **Question Bank**: Multiple question types with options
- **Real-time Proctoring**: Monitor exam sessions in real-time
- **Result Analytics**: Comprehensive result tracking and analytics
- **Responsive UI**: Mobile-friendly React frontend
- **Real-time Communication**: Socket.io for live updates

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Real-time**: Socket.io

### Frontend
- **Framework**: React 18
- **Router**: React Router v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Project Structure

```
e-exam-system/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── migrations/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── docs/
├── tests/
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update database credentials in .env

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile
- `GET /api/users/all` - Get all users (admin)

### Exams
- `POST /api/exams` - Create exam
- `GET /api/exams` - Get all exams
- `GET /api/exams/:id` - Get exam details
- `POST /api/exams/:id/start` - Start exam
- `POST /api/exams/:id/submit` - Submit exam

### Questions
- `POST /api/questions` - Create question
- `GET /api/questions/exam/:examId` - Get exam questions
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question

### Results
- `GET /api/results/my-results` - Get student results
- `GET /api/results/exam/:examId` - Get exam results (teacher/admin)
- `GET /api/results/:id` - Get result details

### Proctoring
- `POST /api/proctoring/start` - Start proctoring
- `POST /api/proctoring/activity` - Log activity
- `GET /api/proctoring/report/:examId` - Get proctoring report

## Database Schema

### Tables
- `users` - User accounts
- `exams` - Exam definitions
- `questions` - Exam questions
- `question_options` - MCQ options
- `exam_attempts` - Student exam attempts
- `student_answers` - Student answers
- `proctoring_logs` - Proctoring events

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Docker Deployment

```bash
# Build and start containers
docker-compose up -d

# Stop containers
docker-compose down
```

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (RBAC)
- SQL injection prevention
- CORS configuration
- Input validation

## Performance Optimization

- Database indexing on frequently queried columns
- Connection pooling
- Frontend code splitting with Vite
- Lazy loading of components
- Caching strategies

## Future Enhancements

- [ ] Video proctoring integration
- [ ] Advanced analytics dashboard
- [ ] Export results to PDF
- [ ] Mobile app (React Native)
- [ ] AI-powered question generation
- [ ] Plagiarism detection
- [ ] Integration with LMS
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@eexamsystem.com or open an issue on GitHub.
