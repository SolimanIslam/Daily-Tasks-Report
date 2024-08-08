// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const url =  'http://localhost:5000';

// export const loadUser = createAsyncThunk('auth/loadUser', async (token) => {
//   const response = await axios.get(`${url}/api/employee/me`, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   return response.data;
// });

// export const loginUser = createAsyncThunk('auth/loginUser', async (formData, thunkAPI) => {
//   const response = await axios.post(`${url}/api/employee/login`, formData, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   localStorage.setItem('token', response.data.token);
//   thunkAPI.dispatch(loadUser(response.data.token));
//   return response.data.token;
// });

// export const signUpUser = createAsyncThunk('auth/signUpUser', async (formData, thunkAPI) => {
//   const response = await axios.post(`${url}/api/employee/register`, formData, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   localStorage.setItem('token', response.data.token);
//   thunkAPI.dispatch(loadUser(response.data.token));
//   return response.data.token;
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: localStorage.getItem('token') || '',
//     myData: {
//       _id: "",
//       email: "",
//       name: "",
//       role: "",
//       tasks: []
//     },
//     loading: false,
//     error: null
//   },
//   reducers: {
//     logout: (state) => {
//       state.token = '';
//       state.myData = {
//         _id: "",
//         email: "",
//         name: "",
//         role: "",
//         tasks: []
//       };
//       localStorage.removeItem('token');
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loadUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loadUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.myData = action.payload;
//       })
//       .addCase(loadUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(signUpUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(signUpUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload;
//       })
//       .addCase(signUpUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   }
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from '@/utils/apiConfig';

export const loadUser = createAsyncThunk('auth/loadUser', async (token) => {
  const response = await axios.get(`${url}/api/employee/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
});

// export const loginUser = createAsyncThunk('auth/loginUser', async (formData, thunkAPI) => {
//   const response = await axios.post(`${url}/api/employee/login`, formData, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   localStorage.setItem('token', response.data.token);
//   await thunkAPI.dispatch(loadUser(response.data.token));
//   return response.data.token;
// });

export const loginUser = createAsyncThunk('auth/loginUser', async (formData, thunkAPI) => {
  try {
    const response = await axios.post(`${url}/api/employee/login`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    localStorage.setItem('token', response.data.token);
    await thunkAPI.dispatch(loadUser(response.data.token));
    return response.data.token;
  } catch (error) {
    const message = error.response?.data?.error || 'Server error';
    return thunkAPI.rejectWithValue(message);
  }
});


// export const signUpUser = createAsyncThunk('auth/signUpUser', async (formData, thunkAPI) => {
//   const response = await axios.post(`${url}/api/employee/register`, formData, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   localStorage.setItem('token', response.data.token);
//   await thunkAPI.dispatch(loadUser(response.data.token));
//   return response.data.token;
// });



export const signUpUser = createAsyncThunk('auth/signUpUser', async (formData, thunkAPI) => {
  try {
    const response = await axios.post(`${url}/api/employee/register`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    localStorage.setItem('token', response.data.token);
    await thunkAPI.dispatch(loadUser(response.data.token));
    return response.data.token;
  } catch (error) {
    const message = error.response?.data?.error || 'Server error';
    return thunkAPI.rejectWithValue(message);
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || '',
    myData: {
      _id: "",
      email: "",
      name: "",
      role: "",
      tasks: []
    },
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.token = '';
      state.myData = {
        _id: "",
        email: "",
        name: "",
        role: "",
        tasks: []
      };
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.myData = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

