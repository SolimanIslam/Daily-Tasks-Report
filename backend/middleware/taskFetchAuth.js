import Employee from '../models/Employee.js';
export const taskFetchAuth = async (req, res, next) => {
  try {
    const { employeeId } = req.query;

    // Check if user is authorized to view tasks for the requested employee
    const isSupervisor = req.user.role === 'supervisor';
    const isSelfRequest = employeeId === req.user._id.toString();

    if (!isSupervisor && !isSelfRequest) {
      return res.status(403).json({ message: 'Not authorized to view tasks for this employee' });
    }

    // Check if the employeeId exists
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
