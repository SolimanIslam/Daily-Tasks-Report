import Task from '../models/Task.js';
import Employee from '../models/Employee.js';

export const addTask = async (req, res) => {
  try {
    const { description, from, to, employeeId } = req.body;
    const assignedEmployeeId = req.user.role === 'supervisor' ? employeeId : req.user._id;

    const task = new Task({
      description,
      from,
      to,
      employeeId: assignedEmployeeId,
      createdBy: req.user._id,
    });

    const createdTask = await task.save();

    // Update the employee with the new task ID
    await Employee.findByIdAndUpdate(assignedEmployeeId, {
      $push: { tasks: createdTask._id }
    });

    res.status(201).json(createdTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const updateTask = async (req, res) => {
  try {
    const { description, from, to, employeeId } = req.body;
    const task = req.task; // Access the task attached by checkAuthorization middleware
    const oldEmployeeId = task.employeeId;
    const newEmployeeId = req.user.role === 'supervisor' ? employeeId : req.user._id;

    // Update task fields
    task.description = description;
    task.from = from;
    task.to = to;
    task.employeeId = newEmployeeId;
    task.createdBy = req.user._id;

    const updatedTask = await task.save();

    // If the employeeId has changed, update the tasks array in the Employee model
    if (oldEmployeeId.toString() !== newEmployeeId.toString()) {
      await Employee.findByIdAndUpdate(oldEmployeeId, {
        $pull: { tasks: task._id }
      });
      await Employee.findByIdAndUpdate(newEmployeeId, {
        $push: { tasks: task._id }
      });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const deleteTask = async (req, res) => {
  try {
    const task = req.task; // Access the task attached by checkAuthorization middleware
    const employeeId = task.employeeId;

    // Delete the task by its ID
    await Task.findByIdAndDelete(task._id);

    // Update the employee's tasks array
    await Employee.findByIdAndUpdate(employeeId, {
      $pull: { tasks: task._id }
    });

    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getDailySummary = async (req, res) => {
  try {
    const { date, employeeId } = req.query;

    const tasks = await Task.find({
      employeeId: employeeId,
      from: { $gte: new Date(date) },
      to: { $lte: new Date(date).setHours(23, 59, 59, 999) },
    }).select('-__v'); 

    const totalHours = tasks.reduce((total, task) => {
      const duration = (new Date(task.to) - new Date(task.from)) / (1000 * 60 * 60);
      return total + duration;
    }, 0);

    const remainingHours = 8 - totalHours;

    res.json({
      date,
      totalHours,
      remainingHours,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};






// Get My tasks
// export const getMyTasks = async (req, res) => {
//   const tasks = await Task.find({ employeeId: req.user.role === 'supervisor' ? req.query.employeeId : req.user._id });
//   res.json(tasks);
// };

