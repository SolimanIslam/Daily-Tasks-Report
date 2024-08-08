// import { Route, Routes } from 'react-router-dom';
// import { SignUpPage } from './pages/SignUpPage';
// import { LoginPage } from './pages/LoginPage';
// import AllEmployees from './pages/AllEmployees';
// import AddTask from './pages/AddTask';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadUser } from './store/slices/authSlice';
// import Navbar from './components/Navbar';
// import DailySummary from './pages/DailySummary';
// import NonAuthorized from './pages/NonAuthorized'; // Assuming you have this component

// function App() {
//   const dispatch = useDispatch();
//   const userRole = useSelector((state) => state.auth.myData?.role); // Retrieve the user's role

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       dispatch(loadUser(token));
//     }
//   }, [dispatch]);

//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/" element={<DailySummary />} />
//         <Route path="/all-employees" element={userRole === 'supervisor' ? <AllEmployees /> : <NonAuthorized />} />
//         <Route path="/add-task/:id" element={<AddTask />} />
//       </Routes>
//     </>
//   );
// }

// export default App;



// // daily-summary


// import { Route, Routes } from 'react-router-dom';
// import { SignUpPage } from './pages/SignUpPage';
// import { LoginPage } from './pages/LoginPage';
// import AllEmployees from './pages/AllEmployees';
// import AddTask from './pages/AddTask';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadUser } from './store/slices/authSlice';
// import Navbar from './components/Navbar';
// import DailySummary from './pages/DailySummary';
// import NonAuthorized from './pages/NonAuthorized'; // Assuming you have this component
// import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

// function App() {
//   const dispatch = useDispatch();
//   const userRole = useSelector((state) => state.auth.myData?.role); // Retrieve the user's role

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       dispatch(loadUser(token));
//     }
//   }, [dispatch]);

//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/" element={<PrivateRoute element={<DailySummary />} />} />
//         <Route path="/all-employees" element={<PrivateRoute element={userRole === 'supervisor' ? <AllEmployees /> : <NonAuthorized />} />} />
//         <Route path="/add-task/:id" element={<PrivateRoute element={<AddTask />} />} />
//       </Routes>
//     </>
//   );
// }

// export default App;




import { Route, Routes } from 'react-router-dom';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import AllEmployees from './pages/AllEmployees';
import AddTask from './pages/AddTask';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './store/slices/authSlice';
import Navbar from './components/Navbar';
import DailySummary from './pages/DailySummary';
import NonAuthorized from './pages/NonAuthorized'; // Assuming you have this component
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

function App() {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.myData?.role); // Retrieve the user's role

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser(token));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute element={<DailySummary />} />} />
        <Route path="/all-employees" element={<PrivateRoute element={userRole === 'supervisor' ? <AllEmployees /> : <NonAuthorized />} />} />
        <Route path="/add-task/:id" element={<PrivateRoute element={<AddTask />} />} />
      </Routes>
    </>
  );
}

export default App;
