import express from 'express';
import {
  addTask,
  updateTask,
  deleteTask,
  getDailySummary,
} from '../controllers/taskController.js';
import { userAuth } from '../middleware/userAuth.js';
import { taskDurationConstraints } from '../middleware/taskDurationConstraints.js';
import { taskMutationAuth } from '../middleware/taskMutationAuth.js';
import { taskFetchAuth } from '../middleware/taskFetchAuth.js';
import { taskFieldsFormat } from '../middleware/taskFieldsFormat.js';

const taskRouter = express.Router();

// taskRouter.route('/')
//   .post(userAuth, taskMutationAuth, taskDurationConstraints, addTask)
//   .get(userAuth, getMyTasks);

taskRouter.route('/')
  .post(userAuth, taskFieldsFormat, taskMutationAuth, taskDurationConstraints, addTask);

taskRouter.route('/:id')
  .put(userAuth, taskFieldsFormat, taskMutationAuth, taskDurationConstraints, updateTask)
  .delete(userAuth, taskFieldsFormat, taskMutationAuth, deleteTask);

taskRouter.route('/summary')
  .get(userAuth, taskFieldsFormat, taskFetchAuth, getDailySummary);

export default taskRouter;
