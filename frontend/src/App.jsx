import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import AllEmployees from './pages/AllEmployees';
import { loadUser } from './store/slices/authSlice';
import Navbar from './components/Navbar';
import DailySummary from './pages/DailySummary';
import NonAuthorized from './pages/NonAuthorized'; // Assuming you have this component
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser(token));
    }
  }, [dispatch]);


  const userRole = useSelector((state) => state.auth.myData?.role); 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute element={<DailySummary />} />} />
        <Route path="/all-employees"  element={userRole === 'supervisor' ? <AllEmployees /> : <NonAuthorized />}  />
      </Routes>
    </>
  );
}

export default App;
