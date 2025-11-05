// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import Login from './components/Auth/Login';
// import Dashboard from './components/Dashboard/Dashboard';
// import DemoDetail from './components/Details/DemoDetail';
// import ProtectedRoute from './components/Layout/ProtectedRoute';
// import CropRecommendationDetails from './components/Details/CropRecommendationDetails';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<CropRecommendationDetails />} />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/demo/:demoId"
//             element={
//               <ProtectedRoute>
//                 <DemoDetail />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/" element={<Navigate to="/login" replace />} />
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import DemoDetail from './components/Details/DemoDetail';
import ProtectedRoute from './components/Layout/ProtectedRoute';

// Import Demo Apps
import CropRecommendationApp from './components/DemoApps/CropRecommendationApp/CropRecommendationApp';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/demo/:demoId"
            element={
              <ProtectedRoute>
                <DemoDetail />
              </ProtectedRoute>
            }
          />
          
          {/* Demo App Routes */}
          <Route
            path="/demo-app/crop-recommendation"
            element={
              <ProtectedRoute>
                <CropRecommendationApp />
              </ProtectedRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;