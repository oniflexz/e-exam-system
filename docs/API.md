# API Documentation

## Overview

The E-Exam System API is a RESTful API built with Express.js and PostgreSQL. All requests require authentication using JWT tokens.

## Authentication

### Register

**Endpoint**: `POST /api/auth/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "role": "student"
}
```

**Response**:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "student"
  }
}
```

### Login

**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "student"
  }
}
```

## Exams

### Create Exam (Teacher/Admin)

**Endpoint**: `POST /api/exams`

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "title": "Mathematics Final",
  "description": "Final exam for Mathematics",
  "duration_minutes": 120,
  "total_questions": 50,
  "passing_percentage": 60
}
```

### Get All Exams

**Endpoint**: `GET /api/exams`

**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
[
  {
    "id": 1,
    "title": "Mathematics Final",
    "description": "Final exam for Mathematics",
    "duration_minutes": 120,
    "total_questions": 50,
    "passing_percentage": 60,
    "is_published": true,
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### Get Exam Details

**Endpoint**: `GET /api/exams/:id`

**Headers**: `Authorization: Bearer {token}`

## Questions

### Create Question (Teacher/Admin)

**Endpoint**: `POST /api/questions`

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "exam_id": 1,
  "question_text": "What is 2+2?",
  "question_type": "mcq",
  "marks": 1,
  "difficulty_level": "easy",
  "options": [
    { "option_text": "3", "is_correct": false },
    { "option_text": "4", "is_correct": true },
    { "option_text": "5", "is_correct": false }
  ]
}
```

### Get Exam Questions

**Endpoint**: `GET /api/questions/exam/:examId`

**Headers**: `Authorization: Bearer {token}`

## Results

### Get My Results

**Endpoint**: `GET /api/results/my-results`

**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
[
  {
    "id": 1,
    "exam_title": "Mathematics Final",
    "score": 85.5,
    "passed": true,
    "end_time": "2024-01-15T12:30:00Z"
  }
]
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error"
}
```

## Rate Limiting

API endpoints are rate-limited to 100 requests per hour per user.

## Pagination

List endpoints support pagination:

```
GET /api/exams?page=1&limit=10
```

## Filtering and Sorting

Supported query parameters:
- `sort`: Field to sort by (e.g., `created_at`)
- `order`: ASC or DESC
- `filter`: Filter criteria
