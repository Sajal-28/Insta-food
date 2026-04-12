# Foodieez 🚀🍕

[![Render](https://img.shields.io/badge/Deploy-Render-brightgreen)](https://render.com)

## 🎉 Live Demo
Experience Foodieez live:  
[![Foodieez](https://insta-food-client.onrender.com)](https://insta-food-client.onrender.com)

> **Foodieez** is an Instagram + Zomato inspired full-stack social app for food lovers! 📱🍴 Food Partners create reel-style food videos, users discover, like, save, and share mouthwatering content. Modern UI with seamless auth & feeds.


## ✨ Features
- 👥 **Dual Auth**: Separate login/register for Users & Food Partners (JWT secure)
- 🎥 **Reel Feeds**: Vertical food video reels (Home, ReelFeed component)
- ❤️ **Interact**: Like & Save foods
- 📱 **Profiles**: Food Partner profiles & Saved items for users
- ➕ **Create Content**: Food Partners upload videos/names
- 📱 **Responsive UI**: BottomNav, theme, custom styles (React/Vite)
- 🛡️ **Protected Routes**: Auth middleware
- ☁️ **Cloud Storage**: ImageKit for videos

## 🛠 Tech Stack
| Frontend | Backend | Database | DevOps |
|----------|---------|----------|--------|
| React 18+ | Node.js / Express 5 | MongoDB (Mongoose) | Render.com |
| Vite (HMR) | JWT / bcryptjs | | dotenv |
| React Router | Multer (uploads) | | CORS / Cookies |
| Tailwind/CSS Modules | ImageKit SDK | | |

### Prerequisites
- Node.js 18+
- MongoDB (Atlas recommended for .env setup)
- Git

```bash
npm start  # or nodemon server.js
```


**Backend API**: `http://localhost:5000`  
**Frontend**: `http://localhost:5173`

### .env (Backend)
```
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
PORT=5000
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
IMAGEKIT_URL_ENDPOINT=...
```

## 📁 Project Structure
```
.
├── Backend/          # Express API server
│   ├── src/
│   │   ├── controllers/    # auth, food, food-partner
│   │   ├── models/         # User, FoodPartner, Food, Like, Save
│   │   ├── routes/         # auth, food, food-partner
│   │   └── db/             # MongoDB connect
│   ├── server.js
│   └── package.json
├── frontend/         # React Vite SPA
│   ├── src/
│   │   ├── pages/auth/     # Login/Register (User/FoodPartner)
│   │   ├── pages/food-partner/ # CreateFood, Profile
│   │   ├── pages/general/  # Home, Saved
│   │   ├── components/     # ReelFeed, BottomNav
│   │   └── routes/         # AppRoutes
│   ├── vite.config.js
│   └── package.json
├── render.yaml       # Render deploy config (frontend)
└── README.md         # This file!
```

## 📋 API Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/user/register` | - | User register |
| POST | `/api/auth/user/login` | - | User login |
| GET | `/api/auth/user/logout` | User | Logout |
| POST | `/api/auth/food-partner/register` | - | Food Partner register |
| POST | `/api/auth/food-partner/login` | - | Food Partner login |
| POST | `/api/food/` | FoodPartner | Create food (video upload) |
| GET | `/api/food/` | User | Get all foods/reels |
| POST | `/api/food/like` | User | Like food |
| POST | `/api/food/save` | User | Save food |
| GET | `/api/food/save` | User | Get saved |
| GET | `/api/food-partner/:id` | FoodPartner | Get partner profile |

## 🌐 Deployment (Render.com)
1. Fork repo or connect GitHub.
2. **Frontend**: New Static Site → `frontend/` → Build: `npm install && npm run build` → Publish: `dist`
3. **Backend**: New Web Service → `Backend/` → Build: `npm install` → Start: `npm start`
4. Update `CLIENT_URL` in backend env to deployed frontend URL.
5. Add `render.yaml` for multi-service if needed.

See `render.yaml` for frontend config (rewrites to `index.html` for SPA).


**Foodieez - Eat, Reel, Repeat!** 🍜✨

