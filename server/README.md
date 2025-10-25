# Server (Express + MongoDB)

This server exposes a small articles API used by the React frontend.

Quick checklist to run locally:

1. Copy `.env.example` to `.env` and fill `MONGO_URI` (MongoDB Atlas recommended):

   - Example MongoDB Atlas URI:
     mongodb+srv://<username>:<password>@cluster0.abcd.mongodb.net/riantblog?retryWrites=true&w=majority

2. Install dependencies and run:

   ```powershell
   cd server
   npm install
   npm run start
   ```

3. Open http://localhost:5000 — you should see "API is running" and server logs that MongoDB connected.

Deploy notes (Render):

- Create a new Web Service on Render.
- Connect the repository and set the Build Command to `npm install` and Start Command to `node server.js`.
- Add environment variables in Render dashboard:
  - `MONGO_URI` = your MongoDB Atlas connection string
  - `CLIENT_ORIGIN` = your frontend deployed URL (e.g. https://your-frontend.vercel.app)

Security: never commit `.env` with credentials. Use Render secret env vars for production.
