import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth_Provider';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Get authentication status

  return isAuthenticated ? element : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
