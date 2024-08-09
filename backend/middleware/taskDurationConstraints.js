
import Task from '../models/Task.js';
import moment from 'moment-timezone';

export const taskDurationConstraints = async (req, res, next) => {
  const { from, to, employeeId } = req.body;

  try {
    const taskStart = moment.tz(from, 'Africa/Cairo');
    const taskEnd = moment.tz(to, 'Africa/Cairo');
  

    // Validate task times are within working hours (8 AM - 6 PM)
    const startHour = taskStart.hours();
    const endHour = taskEnd.hours();

    if (startHour < 8 || endHour > 18 || (endHour === 18 && taskEnd.minutes() > 0)) {
      return res.status(400).json({ message: 'Task must be within working hours (8 AM - 6 PM)' });
    }

    // Calculate the duration of the task
    const taskDuration = moment.duration(taskEnd.diff(taskStart)).asHours();
    if (taskDuration > 8) {
      return res.status(400).json({ message: 'Task duration cannot exceed 8 hours' });
    }

    console.log("from: ",from);
    console.log("employeeId: ",employeeId);

    
    // Find existing tasks for the relevant employee and date
    const dateStart = moment.tz(from, 'Africa/Cairo').startOf('day').toDate();
    const dateEnd = moment.tz(from, 'Africa/Cairo').endOf('day').toDate();

    const existingTasks = await Task.find({
      employeeId: employeeId,
      from: { $gte: dateStart },
      to: { $lte: dateEnd },
    });

    

    // Calculate total hours of existing tasks
    const totalHours = existingTasks.reduce((total, task) => {
      const duration = moment.duration(moment(task.to).diff(moment(task.from))).asHours();
      return total + duration;
    }, 0);

    // Check if adding the new task will exceed the daily limit
    if (totalHours + taskDuration > 8) {
      return res.status(400).json({ message: 'Total task duration for the day cannot exceed 8 hours' });
    }

    // Check for overlapping tasks
    for (const task of existingTasks) {
      const existingTaskStart = moment(task.from);
      const existingTaskEnd = moment(task.to);

      // Check if the new task overlaps with any existing task
      if (taskStart.isBefore(existingTaskEnd) && taskEnd.isAfter(existingTaskStart)) {
        return res.status(400).json({ message: 'Task duration overlaps with an existing task' });
      }
    }

    next();
  } catch (error) {
    console.error('Error in taskDurationConstraints middleware:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

