import express from 'express';
import { registerUser, loginUser, deleteUser, getAllEmployees, getCurrentEmployee } from '../controllers/employeeController.js';
import { supervisor, userAuth } from '../middleware/userAuth.js';

const employeeRouter = express.Router();

employeeRouter.post('/register', registerUser);
employeeRouter.post('/login', loginUser);
employeeRouter.delete('/:id', userAuth, supervisor, deleteUser);
employeeRouter.get('/employees', userAuth, getAllEmployees);
employeeRouter.get('/me', userAuth, getCurrentEmployee);



export default employeeRouter;
