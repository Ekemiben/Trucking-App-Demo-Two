
import { useState, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AdminPanel from "./components/AdminPanel";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Charts from "./components/Charts";
import NewUser from "./pages/NewUser";
import Useredit from "./pages/Useredit";
import Trucks from "./pages/Trucks";
import TruckEdit from "./pages/TruckEdit";
import NewTruck from "./pages/NewTruck";
import Order from "./pages/Orders"
import Messages from "./components/Messages";
import Applications from "./pages/Applications"
import ClientMessages from "./components/ClientMessages";
import DetailsPage from "./pages/DetailsPage";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isMessage = location.pathname.startsWith("/message/");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on initial render and when location changes
  useEffect(() => {
    const token = localStorage.getItem('token'); // Or your authentication check
    setIsAuthenticated(!!token);
  }, [location]);

  // If not authenticated and trying to access a protected route, redirect to login
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated && !isLoginPage) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // If authenticated and trying to access login page, redirect to home
  const LoginRoute = ({ children }) => {
    if (isAuthenticated && isLoginPage) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <>
      {!isLoginPage && isAuthenticated && <Navbar />}
      <div className="flex">
        {!isLoginPage && isAuthenticated && <AdminPanel/>}
      
        <div className="flex w-full flex-grow">
          <div className="flex-[3]">
            <Routes>
              <Route path="/login" element={
                <LoginRoute>
                  <Login setIsAuthenticated={setIsAuthenticated} />
                </LoginRoute>
              } />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Applications />
                </ProtectedRoute>
              } />
              
              <Route path="/users" element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              } />
              
              <Route path="/chart" element={
                <ProtectedRoute>
                  <Charts />
                </ProtectedRoute>
              } />
              
              <Route path="/newuser" element={
                <ProtectedRoute>
                  <NewUser />
                </ProtectedRoute>
              } />
              
              <Route path='/useredit/:id' element={
                <ProtectedRoute>
                  <Useredit />
                </ProtectedRoute>
              }/>
              
              <Route path='/trucks' element={
                <ProtectedRoute>
                  <Trucks />
                </ProtectedRoute>
              }/>
              
              <Route path='/truckedit/:id' element={
                <ProtectedRoute>
                  <TruckEdit />
                </ProtectedRoute>
              }/>
              
              <Route path='/newtruck' element={
                <ProtectedRoute>
                  <NewTruck />
                </ProtectedRoute>
              }/>
              
              <Route path='/order' element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }/>
              
              <Route path='/applications' element={
                <ProtectedRoute>
                  <Applications />
                </ProtectedRoute>
              } />
             
              <Route path='/applications/:id' element={
                <ProtectedRoute>
                  <DetailsPage />
                </ProtectedRoute>
              }/>
              
              <Route path='/clientmessages/:id' element={
                <ProtectedRoute>
                  <ClientMessages />
                </ProtectedRoute>
              }/>
              
              {/* Redirect any unknown paths to home if authenticated, or to login if not */}
              <Route path="*" element={
                isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
              } />
            </Routes>
          </div>
          
          {isMessage && isAuthenticated && <Messages className="flex-1"/>}
        </div>
      </div>
    </>
  );
}

export default App;







