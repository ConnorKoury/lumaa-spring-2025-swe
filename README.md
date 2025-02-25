A Task Management app with **React + TypeScript** (frontend), **Node.js** (backend), and **PostgreSQL** (database). 

### 1. Authentication

  - `POST /auth/register` – Create a new user
  - `POST /auth/login` – Login user
- Only authenticated users can perform task operations
  - Verify the token (JWT) on each request to protected routes

### 2. Backend

- **Tasks CRUD**:  
  - `GET /tasks` – Retrieve a list of tasks 
  - `POST /tasks` – Create a new task.  
  - `PUT /tasks/:id` – Update a task
  - `DELETE /tasks/:id` – Delete a task

- **Database**: PostgreSQL
  - Hosted locally with Docker
  - Query with Prisma
    
### 3. Frontend (React + TypeScript)

- **Login / Register**:
  - Simple forms for **Register** and **Login**.
- **Tasks Page**:
  - Fetch tasks from `GET /tasks`
  - Displays the list of tasks
  - Form to create a new task (`POST /tasks`).
  - Buttons/fields to update a task (`PUT /tasks/:id`).
  - Button to delete a task (`DELETE /tasks/:id`).
