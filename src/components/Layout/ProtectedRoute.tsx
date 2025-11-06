// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import LoadingSpinner from '../Common/LoadingSpinner';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { isAuthenticated, checkAuth } = useAuth();
//   const [isChecking, setIsChecking] = useState(true);
//   const [isValid, setIsValid] = useState(false);

//   useEffect(() => {
//     const validateSession = async () => {
//       if (isAuthenticated) {
//         const valid = await checkAuth();
//         setIsValid(valid);
//       }
//       setIsChecking(false);
//     };

//     validateSession();
//   }, [isAuthenticated, checkAuth]);

//   if (isChecking) {
//     return <LoadingSpinner />;
//   }

//   if (!isAuthenticated || !isValid) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;


import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      console.log('🔐 ProtectedRoute check:', {
        path: location.pathname,
        isAuthenticated,
        hasToken: !!token
      });
      
      setIsChecking(false);
    };

    checkAuth();
  }, [location.pathname, isAuthenticated]);

  if (isChecking) {
    return <LoadingSpinner message="Verifying access..." fullScreen />;
  }

  if (!isAuthenticated) {
    console.warn('⚠️ Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;