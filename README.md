# Task Management System with Ethara ai

A full-stack Task Management System built using Django REST Framework and ReactJS.

Admin Users can:

- Register/Login
- Create Projects
- Assign Tasks to users
- Manage Team Members
- Dashboard of all project,task,memebers

Admin Users can:

- Register/Login
- see all project and task according to member
- update task status
  

---

# Features

- JWT Authentication
- Role Based Access
- Project Management
- members management
- Task Assignment
- Real-time UI Updates
- Responsive Design

---

# Technologies Used

## Backend

- Django
- Django REST Framework
- MySQL
- JWT Authentication

## Frontend

- ReactJS
- Axios
- Bootstrap

## Deployment

- Railway



# Project Structure

```bash
project-root/

├── taskmanagement_team/
│   ├── manage.py
│   ├── requirements.txt
│   └── task_management/
    └── taskmanagement/



├── taskfront/
│   ├── package.json
│   └── src/
```

---

# Backend Setup

## Clone Repository

https://github.com/RajMasihi/green_rider_ethara_ai

## Move to Backend


cd taskmanagement_team


## Create Virtual Environment


python -m venv venv


## Activate Virtual Environment

### Windows
venv\Scripts\activate



## Install Dependencies
pip install -r requirements.txt


## Run Migrations
python manage.py migrate


## Create Superuser
python manage.py createsuperuser

## Start Backend Server
python manage.py runserver


# Frontend Setup

## Move to Frontend

cd taskfront


## Install Packages
npm install


## Start React App
npm run dev


# Environment Variables

Create `.env` file inside backend:

SECRET_KEY=your_secret_key
DEBUG=True


# API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/signup/ | Register User |
| POST | /api/login/ | Login User |
| GET |POST |PATCH |DELETE |   /api/tasks/  FOR ADMIN USER
| GET |POST |PATCH |DELETE |   /api/members/  FOR ADMIN USER
| GET |POST |PATCH |DELETE |   /api/projects/  FOR ADMIN USER
 | GET |PATCH |      /api/taskretrieveupdate/<int:pk>/   for user
 | GET |     /api/projectlistmember/        for user 


---

# Deployment

## Backend

Deployed on Railway.
URL: https://greenrideretharaai-production.up.railway.app

## Frontend

Deployed on Railway/
URL:  https://gracious-playfulness-production-e79f.up.railway.app 



# Screenshots

Add screenshots here.
<img width="1903" height="888" alt="Screenshot 2026-05-20 142831" src="https://github.com/user-attachments/assets/d8a9ce78-b5df-48b5-b4af-7b6175f870dc" />

<img width="1897" height="880" alt="Screenshot 2026-05-20 142943" src="https://github.com/user-attachments/assets/0eea49a1-4665-4d65-be43-7d6eba3f1308" />
<img width="1917" height="811" alt="Screenshot 2026-05-20 142609" src="https://github.com/user-attachments/assets/63e37296-c1c1-49c2-b47a-81df0793d68a" />

---

# Author

Raj Masihi
