- Live link : https://task-collaboration-syst.vercel.app/
# TaskFlow – Real-Time Task Collaboration System (MERN + Socket.io)

A scalable, real-time task management platform where multiple users can collaborate, update tasks instantly, and track progress with live synchronization.

---

## 🚀 Features
- Real-time task updates using WebSockets (Socket.io)  
- JWT-based authentication & role management  
- Create, update, assign, and delete tasks  
- Advanced filtering, sorting, and search  
- Optimistic concurrency control (no overwrite conflicts)  
- Analytics dashboard (status, priority, completion rate)  
- Scalable architecture (MVC + Service + Repository pattern)  
- Responsive UI with modern UX  

---

## 🛠️ Tech Stack

### Frontend
- React 18 (Vite)  
- Redux Toolkit  
- React Router v6  
- Tailwind CSS  
- Axios  
- Socket.io-client  
- Recharts (analytics)  

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Socket.io (real-time events)  
- JWT Authentication  
- bcryptjs (password hashing)  
- express-rate-limit + helmet (security)  

### Deployment
- Vercel / Netlify (Frontend)  
- Railway / Render / Fly.io (Backend)  

---

## 📌 How It Works
1. User registers or logs in  
2. Creates or updates tasks  
3. Server processes request via service layer  
4. Database updates with version control (__v)  
5. Socket.io broadcasts changes to all clients  
6. UI updates instantly without refresh  

---

## 🔄 Real-Time Events
- task:created → When a new task is added  
- task:updated → When a task is modified  
- task:deleted → When a task is removed  

---

## 🧠 Concurrency Handling
Uses optimistic locking with Mongoose __v field:

- Each update includes a version  
- If version mismatch → request fails with 409 Conflict  
- Prevents overwriting changes in multi-user scenarios  

---

## 🗂️ Project Structure
```
taskflow/
├── server/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── routes/
│   └── middlewares/
│
└── client/
    ├── components/
    ├── pages/
    ├── hooks/
    ├── services/
    └── state/
```

---

## 🔧 Run Locally

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow
```

### 2️⃣ Setup Backend  
```bash
cd server
npm install
npm run dev
```

Create .env:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
PORT=5000
```

---

### 3️⃣ Setup Frontend  
```bash
cd client
npm install
npm run dev
```

Create .env:
```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

---

## 🔐 API Overview

### Auth
- POST /auth/register  
- POST /auth/login  
- GET /auth/me  

### Tasks
- POST /tasks  
- GET /tasks  
- GET /tasks/:id  
- PATCH /tasks/:id  
- DELETE /tasks/:id  

### Analytics
- GET /analytics/summary  

---

## 📊 Analytics
- Tasks by status  
- Tasks by priority  
- Overdue tasks  
- Completion rate  

---

## ⚡ Scaling Highlights
- Indexed queries for fast filtering  
- Pagination on all list APIs  
- Aggregation pipelines for analytics  
- Rate limiting to prevent abuse  
- Ready for Redis caching & horizontal scaling  

---

## 🤝 Contributing  
Pull requests are welcome. Open an issue for suggestions or bugs.

---

## 📄 License  
MIT License  

---

## 👤 Author  
Adesh Gaurav  
- LinkedIn: https://www.linkedin.com/in/adeshgaurav/  
- GitHub: https://github.com/Adesh344  
