import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/user';

const ProtectedRoute = ({ children }) => {
  const user = getUser();

  if (user) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
