import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of Navigate
import { Button } from '@/components/ui/button';
import { logout } from '@/store/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the navigate function
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.myData?.role); // Retrieve the user's role

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Use navigate function to redirect
  };

  return (
    <nav className="bg-black p-3">
      <div className="container mx-auto flex justify-between items-center p-1">
        <Link to="/" className="text-white text-xl font-semibold">
          Daily Tasks Report
        </Link>
        <div className='flex items-center'>
          {token ? (
            <>
              {userRole === 'supervisor' && (
                <Link to="/all-employees" className="text-white text-lg font-semibold mr-4">
                  All Employees
                </Link>
              )}
              <Button onClick={handleLogout} className="bg-red-700 text-white font-semibold hover:bg-black m-0">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/" className="text-white text-lg font-semibold mr-4">
                Login
              </Link>
              <Link to="/signup" className="text-white text-lg font-semibold">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
