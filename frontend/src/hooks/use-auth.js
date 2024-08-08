import { useSelector } from 'react-redux';
// import { useEffect } from 'react';

export const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const myData = useSelector((state) => state.auth.myData);

//   useEffect(() => {
//     console.log('Token in useAuth:', token);
//   }, [token]);

  return { token, myData };
};
