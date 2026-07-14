# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Development Setup

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Start development servers
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

## Code Style

- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages
- Add comments for complex logic

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Build/dependencies

### Example

```
feat(auth): add two-factor authentication

Implement TOTP-based 2FA for enhanced security

Closes #123
```

## Testing

Write tests for new features:

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

## Pull Request Process

1. Update README.md with relevant changes
2. Add tests for new functionality
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## Coding Standards

### Backend (Node.js)
- Use async/await for asynchronous operations
- Use middleware for cross-cutting concerns
- Validate all inputs
- Use meaningful variable names
- Keep functions small and focused

### Frontend (React)
- Use functional components with hooks
- Keep components small and reusable
- Use proper prop types
- Organize components by feature
- Avoid prop drilling; use context/stores

## Performance Guidelines

- Minimize database queries (use JOINs efficiently)
- Implement pagination for large datasets
- Use indexes for frequently queried columns
- Cache responses where appropriate
- Lazy load components on the frontend

## Security Guidelines

- Never commit secrets or credentials
- Validate all user inputs
- Use prepared statements to prevent SQL injection
- Implement rate limiting
- Use HTTPS in production
- Keep dependencies updated

## Reporting Issues

Include:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/logs if applicable
- System information
