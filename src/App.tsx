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
import BagDetectionApp from './components/DemoApps/BagDetectionApp/BagDetectionApp';
import VegetationAnalysisApp from './components/DemoApps/VegetationAnalysisApp/VegetationAnalysisApp';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
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
          
          {/* Demo App Routes - Protected */}
          <Route
            path="/demo-app/crop-recommendation"
            element={
              <ProtectedRoute>
                <CropRecommendationApp />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/demo-app/bag-detection"
            element={
              <ProtectedRoute>
                <BagDetectionApp />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/demo-app/vegetation-analysis"
            element={
              <ProtectedRoute>
                <VegetationAnalysisApp />
              </ProtectedRoute>
            }
          />
          
          {/* Redirects */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;