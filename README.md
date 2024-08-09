# Daily Task Report Application

## Overview
The **Daily Task Report Application** is a web-based solution designed to manage and track daily tasks for employees within a company. The application provides different functionalities based on user roles (Regular Employee and Supervisor).


## Hosting
- **Backend**: [http://51.21.109.69:5000](http://51.21.109.69:5000)
- **Frontend**: [http://51.21.109.69:5173](http://51.21.109.69:5173)

## Features

### Regular Employee
- View assigned tasks.
- Add personal tasks (e.g., meetings).
- Edit and delete own tasks.

### Supervisor
- View tasks for any employee.
- Add, edit, and delete tasks for any employee.
- View all employees.
- Delete any employee.

## Backend

### Folder Structure

```plaintext
backend
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
├── config
│   └── db.js
├── controllers
│   ├── employeeController.js
│   └── taskController.js
├── middleware
│   ├── taskDurationConstraints.js
│   ├── taskFetchAuth.js
│   ├── taskFieldsFormat.js
│   ├── taskMutationAuth.js
│   └── userAuth.js
├── models
│   ├── Employee.js
│   └── Task.js
└── routes
    ├── employeeRouter.js
    └── taskRouter.js
```


### File Descriptions

- **server.js**: Entry point for the server setup, including middleware and routes.
- **config/db.js**: Configures MongoDB connection using Mongoose.
- **controllers**:
  - `employeeController.js`: Handles employee operations (registration, login, fetch, delete).
  - `taskController.js`: Manages task operations (add, update, delete, fetch).
- **middleware**:
  - `userAuth.js`: User authentication using JWT.
  - `taskDurationConstraints.js`: Ensures task duration constraints.
  - `taskFetchAuth.js`: Authorizes task fetch operations.
  - `taskFieldsFormat.js`: Validates task field formats.
  - `taskMutationAuth.js`: Authorizes task mutations (add, update, delete).
- **models**:
  - `Employee.js`: Defines the Employee schema and model.
  - `Task.js`: Defines the Task schema and model.
- **routes**:
  - `employeeRouter.js`: Defines API routes for employee operations.
  - `taskRouter.js`: Defines API routes for task operations.

## Frontend

### Folder Structure

```plaintext
frontend
├── .eslintrc.cjs
├── .gitignore
├── components.json
├── index.html
├── jsconfig.json
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── src
    ├── App.jsx
    ├── index.js
    ├── components
    │   ├── AddTaskForm.jsx
    │   ├── EmployeeList.jsx
    │   ├── LoginForm.jsx
    │   ├── NavBar.jsx
    │   ├── SignUpForm.jsx
    │   └── TaskSummary.jsx
    ├── pages
    │   ├── AddTask.jsx
    │   ├── AllEmployees.jsx
    │   ├── DailySummary.jsx
    │   ├── LoginPage.jsx
    │   ├── NonAuthorized.jsx
    │   └── SignUpPage.jsx
    ├── store
    │   ├── index.js
    │   ├── slices
    │   │   ├── authSlice.js
    │   │   ├── employeesSlice.js
    │   │   └── taskSlice.js
    ├── hooks
    │   ├── use-auth.js
    │   └── use-thunk.js
    └── utils
        └── apiConfig.js

```


### Redux Store

- **authSlice.js**: Manages authentication state.
  - **State**: `user`, `loading`, `error`
- **employeesSlice.js**: Manages employee data.
  - **State**: `employees`, `loading`, `error`
- **taskSlice.js**: Manages task data.
  - **State**: `tasks`, `loading`, `error`

### Component Tree and Descriptions

1. **App.jsx**
   - Root component setting up routing.
2. **index.js**
   - Entry point rendering `App` within Redux `Provider`.
3. **components**
   - **AddTaskForm.jsx**: Form for adding tasks. Uses local state for task details.
   - **EmployeeList.jsx**: Displays list of employees. Fetches employees from store.
   - **LoginForm.jsx**: Login form. Uses local state for credentials.
   - **NavBar.jsx**: Navigation bar. Uses authentication state.
   - **SignUpForm.jsx**: Registration form. Uses local state for user details.
   - **TaskSummary.jsx**: Displays daily task summary. Fetches tasks from store.
4. **pages**
   - **AddTask.jsx**: Renders `AddTaskForm`.
   - **AllEmployees.jsx**: Renders `EmployeeList`.
   - **DailySummary.jsx**: Renders `TaskSummary`.
   - **LoginPage.jsx**: Renders `LoginForm`.
   - **NonAuthorized.jsx**: Shows unauthorized access message.
   - **SignUpPage.jsx**: Renders `SignUpForm`.

## Installation and Setup

1. **Backend**
   - Navigate to `backend` directory.
   - Run `npm install` to install dependencies.
   - Configure environment variables in `.env`.
   - Run `npm start` to start the server.

2. **Frontend**
   - Navigate to `frontend` directory.
   - Run `npm install` to install dependencies.
   - Run `npm start` to start the development server.

## Usage

1. **Registration**: Users can sign up as either a regular employee or a supervisor.
2. **Login**: Registered users can log in to access their dashboard.
3. **Task Management**:
   - Regular Employees: View, add, edit, and delete personal tasks.
   - Supervisors: View, add, edit, and delete tasks for any employee, view all employees, and delete employees.

## API Documentation

- **Register Employee**: `POST /api/employee/register`
- **Login Employee**: `POST /api/employee/login`
- **Delete Employee**: `DELETE /api/employee/:id`
- **Fetch All Employees**: `GET /api/employee/employees`
- **Get Current Employee**: `GET /api/employee/me`
- **Add Task**: `POST /api/task/`
- **Update Task**: `PUT /api/task/:id`
- **Delete Task**: `DELETE /api/task/:id`
- **Get Daily Summary**: `GET /api/task/summary`

#### Register Employee
- **URL**: `http://localhost:5000/api/employee/register`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
      "email": "regEmployee1@example.com",
      "name": "regEmployee 1",
      "password": "Test2@1234",
      "role": "regEmployee"
  }

- **Response**:
 ```json
 {
    "_id": "66b35ae8d21230e8d33978b5",
    "email": "regEmployee1@example.com",
    "name": "regEmployee 1",
    "role": "regEmployee",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjM1YWU4ZDIxMjMwZThkMzM5NzhiNSIsInJvbGUiOiJyZWdFbXBsb3llZSIsImlhdCI6MTcyMzAzMDI0OCwiZXhwIjoxNzI1NjIyMjQ4fQ.3jpNIpM2FmWODdI0dgGjs2IxRM4I-f1hxc15ZeAyq1k"
}
 ```

### Constraints

- The email, password, and role fields are mandatory.
- Email must be in a valid format.
- Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character.
- Role must be either "supervisor" or "regEmployee".
- Email must not already exist in the database.


#### Login Employee

- **URL**: `http://localhost:5000/api/employee/login`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "testuser@example.com",
    "password": "Test@1234"
  }
- **Response**:
```json
{
    "_id": "66b35a46d21230e8d339789a",
    "email": "supervisor@example.com",
    "name": "supervisor 1",
    "role": "supervisor",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjM1YTQ2ZDIxMjMwZThkMzM5Nzg5YSIsInJvbGUiOiJzdXBlcnZpc29yIiwiaWF0IjoxNzIzMDM1NjY0LCJleHAiOjE3MjU2Mjc2NjR9.pDaJ6bNIRDlDQvhbr4ApQjPyyLh5eGLnDMdjvtgSQew"
}
```

#### Delete Employee

### Request

- **Method**: DELETE
- **URL**: `http://localhost:5000/api/employee/:id`
  - Replace `:id` with the actual employee ID.
- **Headers**:
  - `Authorization`: Bearer `<your-jwt-token>`

### Response

```json
{
    "message": "Employee and their tasks have been deleted"
}
```

#### Fetch All Employees

### Request

- **Method**: GET
- **URL**: `http://localhost:5000/api/employee/employees`
- **Headers**:
  - `Authorization`: Bearer `<your-jwt-token>`

### Response

```json
[
    {
        "_id": "66b35a46d21230e8d339789a",
        "email": "supervisor@example.com",
        "name": "supervisor 1",
        "role": "supervisor",
        "tasks": [],
        "createdAt": "2024-08-07T11:28:06.931Z",
        "updatedAt": "2024-08-07T11:28:06.931Z"
    },
    {
        "_id": "66b35ae8d21230e8d33978b5",
        "email": "regEmployee1@example.com",
        "name": "regEmployee 1",
        "role": "regEmployee",
        "tasks": [
            "66b35d5d2026a1fd95f82bee"
        ],
        "createdAt": "2024-08-07T11:30:48.209Z",
        "updatedAt": "2024-08-07T11:41:17.190Z"
    }
]

```

## Constraints

- Only supervisors can see all employees.
- Must provide a valid token.



#### Get Current Employee

### Request

- **Method**: GET
- **Headers**:
  - `Authorization`: Bearer `<your-jwt-token>`
- **URL**: `http://localhost:5000/api/employee/me`

### Response

```json
{
    "_id": "66b35ae8d21230e8d33978b5",
    "email": "regEmployee1@example.com",
    "name": "regEmployee 1",
    "role": "regEmployee",
    "tasks": [
        "66b35d5d2026a1fd95f82bee"
    ]
}

```


#### Add Task

### Request

- **Method**: POST
- **URL**: `http://localhost:5000/api/task/`
- **Headers**:
  - `Authorization`: Bearer `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjE0ZWMzMGEyODA4ZmFjMGQ0MGVkNyIsInJvbGUiOiJzdXBlcnZpc29yIiwiaWF0IjoxNzIyODk2MDY4LCJleHAiOjE3MjU0ODgwNjh9.BSGyt0ftOKVreV90aVtMjsbsWAtWSAh6kQqOjLMC4e8`
  - `Content-Type`: application/json

- **Body**:

```json
{
  "description": "A supervisor adding a task for himself",
  "from": "2024-07-22T09:00:00Z",
  "to": "2024-07-22T11:00:00Z",
  "employeeId": "66b14ec30a2808fac0d40ed7" 
}
```
### Response

```json
{
    "description": "A supervisor adding a task for himself",
    "from": "2024-07-22T09:00:00.000Z",
    "to": "2024-07-22T11:00:00.000Z",
    "employeeId": "66b14ec30a2808fac0d40ed7",
    "createdBy": "66b14ec30a2808fac0d40ed7",
    "_id": "66b200c0c23be8cf1a448b05",
    "createdAt": "2024-08-06T10:53:52.302Z",
    "updatedAt": "2024-08-06T10:53:52.302Z",
    "__v": 0
}
```
## Cases

- A supervisor can add a task for themselves or for any other employee.
- A regular employee (regEmployee) can only add tasks for themselves.

## Constraints

- A valid token must be present in the header.
- **regEmployee**: Can only add tasks for himself.
- **Supervisor**: Can add a task for himself or any other employee.
- Task body must contain the following fields with valid formats for `to`, `from` dates, and `employeeId`.

#### Working Hours
- Working day: 8 AM – 6 PM (Africa/Cairo time zone).
- Task duration cannot exceed 8 hours.
- Total tasks per day for an employee cannot exceed 8 hours.
- Task periods cannot overlap with any other task period.
- Task must be within working hours (8 AM - 6 PM).

Note: The backend expects the date to be in UTC format and will store it in the DB in UTC format. It converts it to the Cairo time zone to check the constraints of working hours.


#### Update Task

## Request

- **Method**: PUT
- **URL**: `http://localhost:5000/api/task/:id`
  - Replace `:id` with the actual task ID.
- **Headers**:
  - `Authorization`: Bearer `<your-jwt-token>`
  - `Content-Type`: application/json

### Body

```json
{
    "description": "A Supervisor can update any task",
    "from": "2024-07-22T14:00:00Z",
    "to": "2024-07-22T15:00:00Z",
    "employeeId": "66b21fe281aa4fafa0b08930"
}
```
### Response

```json
{
    "_id": "66b241fefb63850e75e6d3a0",
    "description": "A Supervisor can update any task",
    "from": "2024-07-22T14:00:00.000Z",
    "to": "2024-07-22T15:00:00.000Z",
    "employeeId": "66b21fe281aa4fafa0b08930",
    "createdBy": "66b21f4481aa4fafa0b0892a",
    "createdAt": "2024-08-06T15:32:14.484Z",
    "updatedAt": "2024-08-06T15:41:54.353Z",
    "__v": 0
}
```

## Cases

- A supervisor can update any task.
- A regular employee (regEmployee) can only update tasks they created themselves and cannot change the `employeeId` of the task.

## Constraints
- A valid token must be present in the header.
- A regular employee (regEmployee) can only update tasks they created themselves and cannot change the `employeeId` of the task.
- A supervisor can update any task.
- The request body must include the following fields with valid formats for the `to` and `from` dates and the `employeeId`.
- Operational hours are set from 8 AM to 6 PM.
- Each task must be limited to a maximum duration of 8 hours.
- The cumulative time of tasks assigned to an employee on any given day cannot exceed 8 hours.
- Task schedules must avoid any overlaps with other tasks.
- All tasks should be planned within the specified working hours (8 AM - 6 PM) according to the 'Africa/Cairo' time zone.



#### Delete Task

### Request

- **Method**: DELETE
- **URL**: `http://localhost:5000/api/task/:id`
  - Replace `:id` with the actual task ID.
- **Headers**:
  - `Authorization`: Bearer `<your-jwt-token>`

### Response

```json
{
    "message": "Task removed"
}
```

## Constraints

- A supervisor has the authority to delete any task.
- A regular employee (regEmployee) can only delete tasks they created themselves, provided the task has not been reassigned to another employee by a supervisor.


#### Getting Daily Summary

- **Method**: GET
- **URL**: `http://localhost:5000/api/task/summary?date=2024-07-22&employeeId=1`
  - Replace `2024-07-22` with the desired date and `1` with the employee ID if applicable.
- **Headers**:
  - `Authorization`: Bearer `<your-jwt-token>`

### Response

```json
{
    "date": "2024-07-22",
    "totalHours": 1,
    "remainingHours": 7,
    "tasks": [
        {
            "_id": "66b25201fb8ea8ce49ac6040",
            "description": "to be updated",
            "from": "2024-07-22T07:00:00.000Z",
            "to": "2024-07-22T08:00:00.000Z",
            "employeeId": "66b21f4481aa4fafa0b0892a",
            "createdBy": "66b21f4481aa4fafa0b0892a",
            "createdAt": "2024-08-06T16:40:33.549Z",
            "updatedAt": "2024-08-06T16:40:33.549Z",
            "__v": 0
        }
    ]
}
```

## Constraints

- Both a supervisor and a regular employee (regEmployee) can retrieve the daily summary for any employee.
- Supervisors can:
  - View a list of all employees.
  - Access the task creator for any task assigned to an employee.
- Regular employees (regEmployees) can:
  - Access the task creator for their own tasks.
```json
{
    "message": "Not authorized to view tasks for this employee"
}
```
- A valid token must be present in the header.
- Query parameters must include both `date` and `employeeId`.
- The `date` must be in the correct format: `YYYY-MM-DD`.
- The `employeeId` must be in the correct format: `66b21fe281aa4fafa0b08930`.
- The `employeeId` must exist in the employee database.


## Conclusion

The **Daily Task Report Application** provides a comprehensive solution for managing and tracking employee tasks within a company. With distinct functionalities for regular employees and supervisors, the application ensures that task management is efficient and role-appropriate. From adding and updating tasks to viewing daily summaries and managing employees, the application is designed to meet the needs of both individual contributors and those in supervisory roles.

By following the outlined constraints and using the provided API endpoints, users can effectively manage their tasks and responsibilities. This documentation should serve as a guide to navigating and utilizing the features of the Daily Task Report Application.




  




 
