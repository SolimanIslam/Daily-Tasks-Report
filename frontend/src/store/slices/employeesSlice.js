// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const url = 'http://localhost:5000';

// export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async (token) => {
//   const response = await axios.get(`${url}/api/employee/employees`, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   return response.data;
// });

// export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async ({ id, token }) => {
//   const response = await axios.delete(`${url}/api/employee/${id}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   return response.data;
// });

// const employeesSlice = createSlice({
//   name: 'employees',
//   initialState: {
//     employees: [],
//     loading: false,
//     error: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmployees.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchEmployees.fulfilled, (state, action) => {
//         state.loading = false;
//         state.employees = action.payload;
//       })
//       .addCase(fetchEmployees.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(deleteEmployee.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteEmployee.fulfilled, (state, action) => {
//         state.loading = false;
//         state.employees = state.employees.filter(emp => emp._id !== action.meta.arg.id);
//       })
//       .addCase(deleteEmployee.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   }
// });

// export default employeesSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from '@/utils/apiConfig';


// Fetch employees thunk
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async (token) => {
  const response = await axios.get(`${url}/api/employee/employees`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
});

// Delete employee thunk
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async ({ id, token }) => {
  await axios.delete(`${url}/api/employee/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return id; // Return the id to be used in the reducer
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(emp => emp._id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default employeesSlice.reducer;
