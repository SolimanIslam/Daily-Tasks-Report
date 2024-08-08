
import mongoose from 'mongoose';

export const taskFieldsFormat = (req, res, next) => {
  try {
    if (['PUT', 'POST'].includes(req.method)) {
      const { from, to, employeeId, description } = req.body;

      // Make sure the fields exist
      if (!from || !to || !employeeId || !description) {
        return res.status(400).json({ message: 'Please add all required fields (description, from, to, and employeeId).' });
      }

      // Check if employeeId is a valid ObjectId
      if (employeeId && !mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json({ message: 'Invalid employeeId' });
      }

      // Check if from and to are valid dates
      if (from && isNaN(Date.parse(from))) {
        return res.status(400).json({ message: 'Invalid from date' });
      }

      if (to && isNaN(Date.parse(to))) {
        return res.status(400).json({ message: 'Invalid to date' });
      }
    }

    // Check if taskId is a valid ObjectId for update and delete requests
    if (['PUT', 'DELETE'].includes(req.method) && req.params.id) {
      if (!req.params.id) {
        return res.status(400).json({ message: 'Missing taskId' });
      }

      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid taskId' });
      }
    }

    // Check if date is a valid date for getDailySummary route
    if (req.method === 'GET' && req.path.includes('summary')) {
      const { date, employeeId } = req.query;

      if (!date || !employeeId) {
        return res.status(400).json({ message: 'Please add all required query params (date and employeeId).' });
      }

      if (date && isNaN(Date.parse(date))) {
        return res.status(400).json({ message: 'Invalid date' });
      }

      if (employeeId && !mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json({ message: 'Invalid employeeId' });
      }
    }

    next();
  } catch (error) {
    console.error('Error in taskFieldsFormat middleware:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
