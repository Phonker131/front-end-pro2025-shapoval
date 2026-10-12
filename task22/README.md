# Todo API exercise

A JavaScript exercise with an Express/Mongoose API and a separate browser frontend.

## Local setup
1. Start a local MongoDB instance.
2. Copy `backend/.env.example` to `backend/.env`. The server reads configuration from the **backend** directory.
3. From `task22`, run `npm install`, then `npm run dev`.
4. The API is available at `http://localhost:5000/api/todos`.
5. Serve `frontend/index.html` using a local static server. Its API URL is currently `http://localhost:5000/api/todos`.

Use your own local database. Keep real connection strings in the ignored `.env` file.
