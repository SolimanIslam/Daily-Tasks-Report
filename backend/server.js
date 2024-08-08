import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';

import connectDB from './config/db.js';
import taskRouter from './routes/taskRouter.js';
import employeeRouter from './routes/employeeRouter.js';


// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.use('/api/employee', employeeRouter);
app.use('/api/task', taskRouter);



// Define Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});



// Define port from environment or fallback to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
