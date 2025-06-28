# Inventory System

## Getting Started

This guide will help you download and run the Inventory System project (Django backend + React frontend) from GitHub.

---

## 1. Clone the Repository

```
git clone https://github.com/taimour-hssn1/Inventory.git
cd Inventory
```

---

## 2. Backend Setup (Django)

1. Navigate to the backend directory:
    ```
    cd backend/mysite
    ```
2. (Optional but recommended) Create and activate a virtual environment:
    ```
    python -m venv venv
    # On Windows:
    venv\Scripts\activate
    # On Mac/Linux:
    source venv/bin/activate
    ```
3. Install dependencies:
    ```
    pip install -r requirements.txt
    ```
4. Run migrations:
    ```
    python manage.py migrate
    ```
5. Start the Django development server:
    ```
    python manage.py runserver
    ```

The backend will be running at `http://127.0.0.1:8000/`

---

## 3. Frontend Setup (React)

1. Open a new terminal and navigate to the frontend directory:
    ```
    cd frontend
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Start the React development server:
    ```
    npm run dev
    ```

The frontend will be running at `http://localhost:5173/` (or as shown in your terminal).

---

## 4. Usage
- Access the frontend in your browser at `http://localhost:5173/`
- The frontend will communicate with the Django backend API.

---

## 5. Notes
- Make sure both backend and frontend servers are running simultaneously.
- Update API URLs in the frontend if your backend runs on a different port or host.
- For production, further configuration is needed (CORS, environment variables, etc).

---

## 6. Troubleshooting
- If you encounter issues, try restarting both servers.
- Ensure you have Python 3.8+ and Node.js 16+ installed.
- For Windows users, use `venv\Scripts\activate` to activate the virtual environment.

---
 