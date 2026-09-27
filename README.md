# 🏥 Hospital Management System

## 📌 Project Description

The Hospital Management System is a full-stack web application designed to simplify and organize common hospital management activities in one place.

The system provides a centralized interface for administrators to manage patient information, doctors, appointments, prescriptions, medical records, and billing details.

The application uses a React.js frontend for the user interface, Django REST Framework for building REST APIs, and PostgreSQL for storing and managing application data. JWT authentication is implemented to secure the application and protect API endpoints.

This project was developed as a local portfolio project to demonstrate full-stack development skills, CRUD operations, REST API development, authentication, database integration, and React-Django integration.

---

## ✨ Features

### 🔐 Login & Authentication
- JWT-based user authentication
- Access and refresh token handling
- Protected application routes
- Authenticated API requests
- Logout functionality

### 📊 Dashboard
- Total patients
- Total doctors
- Appointment overview
- Pending billing information
- Recent appointments
- Recent patients

### 👤 Patients
- Add new patients
- View patient information
- Edit patient information
- Delete patient records
- Manage patient contact and basic details

### 👨‍⚕️ Doctors
- Add doctors
- View doctor information
- Edit doctor information
- Delete doctors
- Manage specialization and contact details

### 📅 Appointments
- Schedule appointments
- Select patient and doctor
- Set appointment date and time
- Add appointment reason
- Manage appointment status
- Edit appointments
- Delete appointments

### 💊 Prescriptions
- Create prescriptions
- Select patient and doctor
- Add medicine and dosage
- Add prescription instructions
- View prescription history
- Edit prescriptions
- Delete prescriptions

### 🏥 Medical Records
- Create medical records
- Select patient and doctor
- Record diagnosis
- Record symptoms
- Record treatment details
- View medical history
- Edit records
- Delete records

### 💰 Billing & Payments
- Create patient bills
- Add billing description
- Record billing amount
- Track payment status
- View billing information
- Edit bills
- Delete bills

---

## 🧭 Application Modules

The application sidebar contains:

- 🏠 Dashboard
- 👤 Patients
- 👨‍⚕️ Doctors
- 📅 Appointments
- 💊 Prescriptions
- 🏥 Medical Records
- 💰 Billing & Payments

---

## 🛠️ Technologies Used

### Frontend

- **React.js** – Used to build the interactive user interface
- **Vite** – Used as the frontend development and build tool
- **JavaScript** – Used for frontend logic and functionality
- **Tailwind CSS** – Used for responsive and modern UI styling
- **Axios** – Used to communicate with the Django REST APIs
- **React Router** – Used for navigation and protected routes

### Backend

- **Python** – Core backend programming language
- **Django** – Used to build the backend application
- **Django REST Framework** – Used to create RESTful APIs
- **Simple JWT** – Used for JWT-based authentication

### Database

- **PostgreSQL** – Used to store and manage hospital data

### Version Control

- **Git** – Used for source code version control
- **GitHub** – Used to store and manage the project repository

### 🔧 Tech Stack Summary

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript, Tailwind CSS |
| API Communication | Axios |
| Routing | React Router |
| Backend | Python, Django, Django REST Framework |
| Authentication | JWT / Simple JWT |
| Database | PostgreSQL |
| Version Control | Git, GitHub |

---

## 🏗️ Project Architecture

```text
                 Hospital Management System
                           │
             ┌─────────────┴─────────────┐
             │                           │
       React Frontend              Django Backend
             │                           │
       Tailwind CSS               Django REST API
             │                           │
          Axios ────────────────────────►│
                                         │
                                  Django ORM
                                         │
                                         ▼
                                    PostgreSQL
