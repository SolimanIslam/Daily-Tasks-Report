// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const url = 'http://localhost:5000';

// export const fetchDailySummary = createAsyncThunk('tasks/fetchDailySummary', async ({ date, employeeId, token }) => {
//   const response = await axios.get(`${url}/api/task/summary?date=${date}&employeeId=${employeeId}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   return response.data;
// });

// export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({ taskId, token }) => {
//   const response = await axios.delete(`${url}/api/task/${taskId}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   return response.data;
// });

// export const addTask = createAsyncThunk('tasks/addTask', async ({ description, from, to, employeeId, token }) => {
//   const response = await axios.post(`${url}/api/task`, {
//     description,
//     from,
//     to,
//     employeeId
//   }, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     }
//   });
//   return response.data;
// });

// export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, description, from, to, employeeId, token }) => {
//   const response = await axios.put(`${url}/api/task/${id}`, {
//     description,
//     from,
//     to,
//     employeeId
//   }, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     }
//   });
//   return response.data;
// });

// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState: {
//     summary: null,
//     loading: false,
//     error: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDailySummary.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchDailySummary.fulfilled, (state, action) => {
//         state.loading = false;
//         state.summary = action.payload;
//       })
//       .addCase(fetchDailySummary.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(deleteTask.fulfilled, (state, action) => {
//         state.summary.tasks = state.summary.tasks.filter(task => task._id !== action.meta.arg.taskId);
//       })
//       .addCase(addTask.fulfilled, (state, action) => {
//         state.summary.tasks.push(action.payload);
//       })
//       .addCase(updateTask.fulfilled, (state, action) => {
//         const index = state.summary.tasks.findIndex(task => task._id === action.payload._id);
//         if (index !== -1) {
//           state.summary.tasks[index] = action.payload;
//         }
//       });
//   }
// });

// export default taskSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from '@/utils/apiConfig';



export const fetchDailySummary = createAsyncThunk('tasks/fetchDailySummary', async ({ date, employeeId, token }) => {
  const response = await axios.get(`${url}/api/task/summary?date=${date}&employeeId=${employeeId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({ taskId, token }) => {
  const response = await axios.delete(`${url}/api/task/${taskId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async ({ description, from, to, employeeId, token }) => {
  const response = await axios.post(`${url}/api/task`, {
    description,
    from,
    to,
    employeeId
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ taskId, description, from, to, employeeId, token }) => {
  const response = await axios.put(`${url}/api/task/${taskId}`, {
    description,
    from,
    to,
    employeeId
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    summary: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailySummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDailySummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchDailySummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.summary.tasks = state.summary.tasks.filter(task => task._id !== action.meta.arg.taskId);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.summary.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTaskIndex = state.summary.tasks.findIndex(task => task._id === action.meta.arg.taskId);
        if (updatedTaskIndex !== -1) {
          state.summary.tasks[updatedTaskIndex] = action.payload;
        }
      });
  }
});

export default taskSlice.reducer;
