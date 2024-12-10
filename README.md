
# Project Management System

This project is a **Project Management System** that allows users to manage projects and their payments efficiently. It supports adding, updating, and listing projects with due dates and statuses, as well as managing associated payments.

## Features

### Projects Management
- Add new projects with a name, due date, and status.
- Update existing projects.
- Prevent duplicate project names.
  
### Payments Management
- Add payments for specific projects with an amount and payment status (Paid/Unpaid).
- Prevent duplicate payments for the same project.
- Mark payments as paid.

### Notifications
- Real-time toast notifications using **React Toastify** for success, error, and warning messages.

### Local Storage
- Projects and payments data are persisted using `localStorage`.

---

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Notifications**: React Toastify
- **Data Storage**: localStorage (Browser)

---

## Installation and Setup

### Prerequisites
- Node.js installed on your system
- npm or yarn package manager

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ShaileshVSavani/Freelancer-Project-Management-System.git
   ```
2. Navigate to the project directory:
   ```bash
   cd project-management-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Deployment Link

The live version of the project is available at:  
**[Project Management System - Live Deployment](https://freelancer-project-management-system.vercel.app/)**

---

## Usage

### Adding a Project
1. Click on "Add New Project".
2. Fill in the project name and due date.
3. Click "Add Project".
4. A toast notification confirms the action.

### Managing Payments
1. Navigate to the "Payments" section.
2. Select a project and add payment details.
3. Mark payments as paid when necessary.

---

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **React Toastify**: For toast notifications.
- **Tailwind CSS**: A utility-first CSS framework.

---

## Acknowledgements

- [React](https://reactjs.org/)
- [React Toastify](https://github.com/fkhadra/react-toastify)
- [Tailwind CSS](https://tailwindcss.com/)

---
