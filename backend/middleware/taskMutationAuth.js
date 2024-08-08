import Task from '../models/Task.js';
import Employee from '../models/Employee.js';

export const taskMutationAuth = async (req, res, next) => {
  const { id: taskId } = req.params;
  const { employeeId } = req.body;

  try {
    // If no taskId is provided, this is a creation request
    if (!taskId) {
      // Regular employees can only add tasks for themselves
      if (req.user.role !== 'supervisor' && req.user._id.toString() !== employeeId) {
        return res.status(401).json({ message: 'Not authorized to add a task for another employee' });
      }

      // Check if the employeeId exists
      const actualEmployeeId = employeeId || req.user._id;
      const employee = await Employee.findById(actualEmployeeId);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      return next();
    }

    // If taskId is provided, this is an update or delete request
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Regular employees can only update or delete their own tasks
    if (req.user.role !== 'supervisor' && task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to manage this task' });
    }

    // Attach the task to the request object
    req.task = task;

    next();
  } catch (error) {
    console.error('Error in taskMutationAuth middleware:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
