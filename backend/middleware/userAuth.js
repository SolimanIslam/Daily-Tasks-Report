import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js';


export const userAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Employee.findById(decoded.id).select('-password -__v -createdAt -updatedAt');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const supervisor = async (req, res, next) => {
  if (req.user && req.user.role === 'supervisor') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a supervisor' });
  }
};
