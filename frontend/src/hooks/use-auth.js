import { useSelector } from 'react-redux';

export const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const myData = useSelector((state) => state.auth.myData);

  return { token, myData };
};
