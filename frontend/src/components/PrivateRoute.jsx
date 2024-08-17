// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';

// const PrivateRoute = ({ element }) => {
//   const token = useSelector((state) => state.auth.token);
//   const loading = useSelector((state) => state.auth.loading);
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     if (!loading) {
//       setReady(true);
//     }
//   }, [loading]);

//   if (!ready) {
//     return <div>Loading...</div>; // Or some loading spinner
//   }

//   return token ? element : <Navigate to="/login" />;
// };

// export default PrivateRoute;


import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
