// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import employeesReducer from './slices/employeesSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     employees: employeesReducer,
//   },
// });

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import employeesReducer from './slices/employeesSlice';
import tasksReducer from './slices/taskSlice'; // Import the task slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    tasks: tasksReducer, // Add the task slice to the store
  },
});

export default store;
