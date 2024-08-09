
import mongoose from 'mongoose';
import Employee from './Employee.js'; // Import the Employee model

const taskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  const employee = await Employee.findById(this.employeeId);
  if (employee) {
    employee.tasks.pull(this._id);
    await employee.save();
  }
  next();
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
