import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Employee from '../models/Employee.js';
import Task from '../models/Task.js';

// Regular expression for validating the password complexity
const passwordComplexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Please add all required fields (name, email, password, role).' });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  if (name.length < 6) {
    return res.status(400).json({ error: 'Name must be at least 6 characters long.' });
  }

  // Validate password complexity
  if (!passwordComplexity.test(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.' });
  }

  // Validate role
  const validRoles = ['supervisor', 'regEmployee'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role. Role must be either supervisor or regEmployee.' });
  }

  try {
    const emailExists = await Employee.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists, login instead' });
    }

    const nameExists = await Employee.findOne({ name });
    if (nameExists) {
      return res.status(400).json({ error: 'Name already exists, please choose another name.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const employee = await Employee.create({
      email,
      name,
      password: hashedPassword,
      role,
    });

    if (employee) {
      res.status(201).json({
        _id: employee.id,
        email: employee.email,
        name: employee.name,
        role: employee.role,
        token: generateToken(employee._id, employee.role),
      });
    } else {
      res.status(500).json({ error: 'Error creating employee' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password.' });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  // Validate password complexity
  if (!passwordComplexity.test(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.' });
  }

  try {
    const user = await Employee.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Assuring that the employeeId has a correct format
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid employeeId' });
    }

    // Assuring that the employeeId exists
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Delete all tasks associated with this employee
    await Task.deleteMany({ employeeId: employee._id });

    // Delete the employee
    await Employee.deleteOne({ _id: employee._id });

    res.status(200).json({ message: 'Employee and their tasks have been deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}, '-password -__v'); // Exclude password and __v fields
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getCurrentEmployee = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};