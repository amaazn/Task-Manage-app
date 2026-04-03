<img width="1898" height="1011" alt="register" src="https://github.com/user-attachments/assets/b767be96-0b0c-4937-af65-2514767f8ffd" /><div align="center">

# 🗂️ TaskFlow

### *A Production-Grade, Secure Full-Stack Task Management Application*

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20App-4CAF50?style=for-the-badge&logoColor=white)](https://task-manage-app-frontend.onrender.com)
&nbsp;
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
&nbsp;
[![TypeScript](https://img.shields.io/badge/TypeScript-Full%20Stack-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
&nbsp;
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma%20ORM-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
&nbsp;
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
&nbsp;
[![Zod](https://img.shields.io/badge/Zod-Validation-3068B7?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
&nbsp;
[![Render](https://img.shields.io/badge/Deployed-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

<br/>

> **Built to impress. Engineered to scale. Designed to ship.**

</div>

---

## 📸 Screenshots

<div align="center">

### 🔏 Register — Create Your Account

![Register Page](images/register.png)



<sub>✅ Zod-validated form · Bcrypt password hashing · Instant JWT issuance on success</sub>

<br/><br/>

### 🔐 Login — Welcome Back

![Login Page](images/login.png)
<sub>🔑 Access Token + Refresh Token strategy · Axios interceptor auto-attaches headers</sub>

<br/><br/>

### 📊 Dashboard — Your Command Center

![Dashboard](images/dashboard.png)

<sub>📋 Full CRUD · Real-time stats · Filter by status · Search by title · Pagination</sub>

</div>

---

## 🎯 What Is TaskFlow?

**TaskFlow** is a production-ready, full-stack task management system built end-to-end with modern technologies. It solves a real-world problem: **managing personal tasks securely, with clean UX and a hardened backend** — not just a tutorial CRUD app, but a deployment-ready system with authentication, validation, error handling, and real-time analytics.

---

## ⚡ Tech Stack

| Layer | 🔧 Technology | 💬 Why We Chose It |
|---|---|---|
| 🖥️ **Frontend** | Next.js 15 (App Router) | SSR/CSR hybrid, file-based routing, production-ready |
| 🎨 **Styling** | Tailwind CSS | Utility-first, no CSS bloat, fully responsive |
| 📡 **HTTP Client** | Axios | Interceptors for auto token refresh, clean error handling |
| 🍞 **Notifications** | React Hot Toast | Non-intrusive, customisable feedback UI |
| ⚙️ **Backend** | Node.js + Express.js | Lightweight, fast, well-understood REST API layer |
| 🔷 **Language** | TypeScript (end-to-end) | Type safety across frontend + backend contracts |
| 🐘 **Database** | PostgreSQL | Battle-tested relational DB, perfect for user-scoped data |
| 🔮 **ORM** | Prisma | Type-safe queries, auto migrations, schema-as-code |
| 🔐 **Auth** | JWT (Access + Refresh) | Stateless, scalable, secure dual-token strategy |
| ✅ **Validation** | Zod | Schema-first validation with rich error output |
| ☁️ **Deployment** | Render | Separate frontend + backend services, managed DB |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                      BROWSER (Client)                            │
│              Next.js 15  │  Tailwind  │  Axios  │  React Toast   │
└──────────────────────────┬───────────────────────────────────────┘
                           │  HTTPS + JWT Bearer Token
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                  REST API — Render Web Service                   │
│               Node.js  +  Express  +  TypeScript                 │
│                                                                  │
│   ┌─────────────────┐   ┌─────────────────┐   ┌──────────────┐  │
│   │  Auth Routes    │   │  Task Routes    │   │  Zod Schema  │  │
│   │ /auth/register  │   │ GET  /tasks     │   │  Validation  │  │
│   │ /auth/login     │   │ POST /tasks     │   │  Middleware  │  │
│   │ /auth/refresh   │   │ PATCH/DELETE    │   │              │  │
│   │ /auth/logout    │   │ /tasks/:id      │   │  + Custom    │  │
│   └────────┬────────┘   │ /tasks/:id/     │   │  Error       │  │
│            │            │  toggle         │   │  Parser 🔑   │  │
│            └────────────┴────────┬────────┴───┴──────────────┘  │
│                                  ▼                               │
│                     ┌─────────────────────┐                      │
│                     │     Prisma ORM      │                      │
│                     └──────────┬──────────┘                      │
└────────────────────────────────┼─────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│              PostgreSQL Database — Render Managed                │
│                  Users Table  │  Tasks Table                     │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow — Dual JWT Strategy

```
  User Submits Credentials
           │
           ▼
  ┌─────────────────────┐
  │  Zod Validates      │  ← password ≥ 5 chars, valid email
  └──────────┬──────────┘
             │ Pass
             ▼
  ┌─────────────────────┐
  │  bcrypt Compare     │  ← checks against hashed password in DB
  └──────────┬──────────┘
             │ Match
             ▼
  ┌──────────────────────────────────────────┐
  │  Issue JWT Access Token  (~3h lifetime)  │
  └──────────────────────┬───────────────────┘
                         │
                         ▼
  Frontend stores token → Axios interceptor
  auto-attaches to every request header →
  On expiry, user is redirected to login 🔄
```

---

## 📋 API Endpoints

### 🔒 Auth — `/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/auth/register` | Create account, hash password, issue JWT | ❌ |
| `POST` | `/auth/login` | Authenticate user, issue JWT | ❌ |
| `POST` | `/auth/logout` | Invalidate session | ✅ |

### 📋 Tasks — `/tasks`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/tasks` | List tasks (paginated + filtered + searchable) | ✅ |
| `POST` | `/tasks` | Create a new task | ✅ |
| `GET` | `/tasks/:id` | Get a single task | ✅ |
| `PATCH` | `/tasks/:id` | Update task title/description | ✅ |
| `DELETE` | `/tasks/:id` | Delete a task | ✅ |
| `PATCH` | `/tasks/:id/toggle` | Toggle TODO ↔ DONE status | ✅ |

> 🛡️ Every task endpoint verifies ownership — users can **only** access their own tasks.

---

## ✨ Features at a Glance

| Feature | Details |
|---|---|
| 🔒 **JWT Authentication** | Register · Login · Logout · Token-secured routes |
| 📋 **Full CRUD** | Create · Read · Update · Delete · Toggle tasks |
| 🔍 **Smart Filtering** | Filter by status (Todo/Done), search by title |
| 📊 **Real-time Analytics** | Total · Completed · Pending · Progress % bar |
| 📄 **Pagination** | Tasks loaded in batches, navigable pages |
| 📱 **Fully Responsive** | Mobile-first, fluid layout across all screen sizes |
| 🍞 **Smart Toasts** | Instant success/error notifications via React Hot Toast |
| 🔷 **TypeScript E2E** | Type safety from DB schema to UI components |
| ✅ **Zod Validation** | Every input validated before touching the database |
| 🚀 **Deployed on Render** | Live, publicly accessible — not just localhost |

---

## 🗃️ Database Schema

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
  tasks    Task[]
}

model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}
```

---

## 📁 Project Structure

```
Task-Manage-app/
├── 📂 Backend/
│   ├── 📂 prisma/
│   │   ├── 📂 migrations/
│   │   └── schema.prisma                # DB models: User & Task
│   ├── 📂 src/
│   │   ├── 📂 controllers/
│   │   │   ├── auth.controller.ts       # Register · Login · Logout logic
│   │   │   └── task.controller.ts       # Full CRUD + Toggle logic
│   │   ├── 📂 generated/prisma          # Auto-generated Prisma client
│   │   │   ├── 📂 internal/
│   │   │   ├── 📂 models/
│   │   │   ├── browser.ts
│   │   │   ├── client.ts
│   │   │   ├── commonInputTypes.ts
│   │   │   ├── enums.ts
│   │   │   └── models.ts
│   │   ├── 📂 middleware/
│   │   │   └── auth.middleware.ts       # JWT guard — protects private routes
│   │   ├── 📂 routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── task.routes.ts
│   │   ├── 📂 utils/
│   │   │   ├── jwt.ts                   # JWT sign/verify helpers
│   │   │   └── prisma.ts                # Prisma client instance
│   │   ├── 📂 validators/               # Zod schema validators
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── prisma.config.ts
│   └── tsconfig.json
│
├── 📂 frontend/
│   ├── 📂 app/
│   │   ├── 📂 dashboard/
│   │   │   └── page.tsx                 # Main task dashboard
│   │   ├── 📂 login/
│   │   │   └── page.tsx                 # Login page
│   │   ├── 📂 register/
│   │   │   └── page.tsx                 # Registration page
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── 📂 components/
│   │   ├── Sidebar.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskModal.tsx
│   ├── 📂 services/
│   │   ├── api.ts                       # Axios instance + interceptors
│   │   ├── authService.ts               # Register/Login/Logout calls
│   │   └── taskService.ts               # CRUD API calls
│   ├── 📂 types/
│   │   ├── auth.ts
│   │   └── task.ts
│   ├── 📂 utils/
│   │   └── auth.ts
│   ├── .env.local
│   ├── next.config.ts
│   └── package.json
│
└── README.md
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- PostgreSQL (local or cloud)
- npm

### 1️⃣ Clone

```bash
git clone https://github.com/amaazn/Task-Manage-app.git
cd Task-Manage-app
```

### 2️⃣ Backend

```bash
cd Backend && npm install
```

Create `Backend/.env`:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
PORT=5000
JWT_SECRET="your_jwt_secret"
```

```bash
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

### 3️⃣ Frontend

```bash
cd ../frontend && npm install
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
npm run dev
# → http://localhost:3000
```

---

## 🌐 Deployment — Render

| Service | Type |
|---|---|
| 🖥️ **Frontend** → [task-manage-app-frontend.onrender.com](https://task-manage-app-frontend.onrender.com) | Next.js Web Service |
| ⚙️ **Backend** | Node.js Web Service |
| 🐘 **Database** | Managed PostgreSQL |

Both services are independently deployed with environment secrets managed via Render's dashboard.

---

<div align="center">

## 👨‍💻 Author

**Built as a high-stakes full-stack recruitment project**

[![GitHub](https://img.shields.io/badge/GitHub-amaazn-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amaazn)
&nbsp;
[![Live App](https://img.shields.io/badge/Live%20App-TaskFlow-4CAF50?style=for-the-badge&logo=vercel&logoColor=white)](https://task-manage-app-frontend.onrender.com)

<br/>

*This project demonstrates real-world full-stack engineering:*
*secure authentication · production error handling · scalable REST architecture · clean TypeScript code*

<br/>

**⭐ If this project impressed you, please star the repo!**

</div>
