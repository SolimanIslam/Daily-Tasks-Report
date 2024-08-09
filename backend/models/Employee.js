
import mongoose from 'mongoose';
import Task from './Task.js'; // Import the Task model

const employeeSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['supervisor', 'regEmployee'],
      default: 'regEmployee',
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// employeeSchema.pre('deleteMany', async function (next) {
//   await Task.deleteMany({ employeeId: this._conditions._id });
//   next();
// });

// employeeSchema.pre('findOneAndDelete', async function (next) {
//   const doc = await this.model.findOne(this.getQuery());
//   if (doc) {
//     await Task.deleteMany({ employeeId: doc._id });
//   }
//   next();
// });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;


