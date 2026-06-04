# Cognifyz Internship Task 5

This project demonstrates:

- a front-end dashboard that fetches data from a backend API
- CRUD operations backed by PostgreSQL through Prisma
- live data rendering and record management from the UI

## Full-stack setup
- `backend/` exposes `GET/POST/PUT/DELETE /api/tasks`
- `Cognifyztask5-project/` is the front end that consumes that API
- the backend stores tasks in PostgreSQL

## Run locally
1. Start the backend:
   ```bash
   cd C:\Users\KIIT\Documents\New project\backend
   npm install
   npm run prisma:generate
   npm run prisma:push
   npm start
   ```
2. Start the front end:
   ```bash
   cd C:\Users\KIIT\Documents\New project\Cognifyztask5-project
   npm install
   npm start
   ```

Then open:
[http://localhost:3005](http://localhost:3005)

## API base URL
By default the front end talks to:
- `http://localhost:3000`

Set `API_BASE_URL` if your backend is deployed elsewhere.

## Front-end API
The dashboard calls:
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Front-end features
- live task counts
- create/edit/delete forms
- edit-in-place workflow
- responsive glassmorphism layout
