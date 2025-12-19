# Full Stack CRUD Assignment

## Candidate Name
**Shreya Arjugade**

## Assignment Title
**Full Stack CRUD Application – Student Management System**

---

## Project Description
This is a **full-stack CRUD (Create, Read, Update, Delete) web application** developed as part of the assignment submission. The application performs real-time validation on frontend forms to ensure that student data entered is complete and correctly formatted, complementing backend validation.

The application allows users to manage student records, including:

- Adding new students
- Viewing student list and details
- Editing and updating student information
- Deleting students with confirmation
- Searching by Name, ID, or Course
- Pagination
- Sorting

The backend is developed using **Spring Boot** and the frontend is built using **React**.

---

## Technology Stack

### Backend
- Java 17  
- Spring Boot  
- Spring Web  
- Spring Data JPA  
- Hibernate  
- Maven  
- MySQL (or H2 Database for testing)  

### Frontend
- React (Vite)  
- JavaScript (ES6)  
- Axios  
- CSS  

---

## Database Details

**Database Name:** `assignment_db`  
**Table:** `students`  

| Column Name | Data Type         | Description    |
|-------------|-----------------|----------------|
| id          | INT (Primary Key) | Student ID     |
| name        | VARCHAR(50)       | Student Name   |
| email       | VARCHAR(50)       | Student Email  |
| course      | VARCHAR(50)       | Course Name    |
| mobile      | VARCHAR(15)       | Contact Number |

**Example MySQL Script:**
```sql
CREATE DATABASE IF NOT EXISTS assignment_db;

USE assignment_db;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    course VARCHAR(50),
    mobile VARCHAR(15)
);

---
⚙️ Steps to Set Up and Run the Application

### Backend Setup

**Prerequisites:**
- Java 17
- Maven
- MySQL (or H2)

**Steps:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend server will start at:
http://localhost:8081

---
### Frontend Setup

**Prerequisites:**
-Node.js (v18 or above)
-npm

**Steps:**
```bash
cd frontend
npm install
npm run dev
```

The frontend server will start at:
http://localhost:5173

📡 Backend API Endpoints
    -------------------------------------------------------------------------------------
    | HTTP Method | Endpoint           | Description                                    |
    | ----------- | ------------------ | ---------------------------------------------- |
    | GET         | /api/students      | Fetch students (supports pagination & sorting) |
    | GET         | /api/students/{id} | Fetch a single student by ID                   |
    | POST        | /api/students      | Add a new student                              |
    | PUT         | /api/students/{id} | Update student information                     |
    | DELETE      | /api/students/{id} | Delete a student                               |
    -------------------------------------------------------------------------------------

**Pagination & Sorting Parameters:**

?page=0 → page number (starts from 0)

&size=5 → number of records per page

&sort=name,asc → sorting field and direction (asc or desc)


## Features Implemented

-Add student

-View student list

-View student details

-Edit and update student

-Delete student with confirmation

-Search student by Name / ID / Course

-Pagination (backend-driven)

-Sorting (backend-driven)

- Backend and frontend validation for student forms
  - Ensures required fields (Name, Email, Course) are filled
  - Validates email format
  - Validates mobile number format


-Global exception handling

-CORS configuration

## Screenshots / Demo

### Student List Page
![Student List](assets/student-list.png)

### Add New Student
![Add Student](assets/add-student.png)

### Edit Student
![Edit Student](assets/edit-student.png)

### Search Student
![Search Student](assets/search-student.png)

### Delete Confirmation
![Delete Confirmation](assets/delete-confirm.png)

## Assumptions, Limitations & Pending Enhancements:-

**Assumptions:**

Application is intended for basic student record management.

Single-user access (authentication not implemented).

**Limitations:**

Authentication and authorization are not implemented.

Frontend pagination UI can be further enhanced.

**Pending Enhancements:**

Authentication & authorization

Advanced filtering and search

UI-level pagination controls

Deployment to a cloud platform


📂 Repository Structure :-

fullstack-crud-assignment/
 ├── backend/       # Spring Boot backend
 ├── frontend/      # React frontend
 └── README.md      # Project documentation


📎 Submission Note

This repository contains the complete source code for both backend and frontend as required by the assignment guidelines.