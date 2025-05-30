// import {useState, useEffect} from 'react'
// import Charts from '../components/Charts'
// import { useSelector } from 'react-redux'
// import axios from 'axios'

// const Home = () => {

//    const Months = [
//           "jan",
//           "feb",
//           "mar",
//           "apr",
//           "may",
//           "jun",
//           "jul",
//           "aug",
//           "sep",
//           "oct",
//           "nov",
//           "dec"
//         ]

//         const currentUser = useSelector(state=>state.user?.currentUser)
//         const token = currentUser?.accessToken
//         const config = {
//          headers: {
//            Authorization: `Bearer ${token}`,
//          },
//        };
//         const [stats, setStats] = useState([])
//         const api_url = import.meta.env.VITE_api_url;
//         useEffect(()=>{
//            const getStats = async()=>{
//                try {
//                    const res = await axios.get(`${api_url}/api/user/stats`,config)
//                    const statsData = res.data.map(items => ({
//                     name: Months[items._id - 1],
//                     "active users": items.total
//                   }));
//                   setStats(statsData);
//                } catch (error) {
//                    console.log(error)
//                }
//            }
//            getStats()
//         },[api_url])
//   return (
//     <div>
//       <Charts data={stats} grid title='User analytics' dataKey='active users'/>
//     </div>
//   )
// }

// export default Home





// import { useState, useEffect } from 'react';
// import Charts from '../components/Charts';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { Box, Typography, CircularProgress, Alert } from '@mui/material';

// const Home = () => {
//   const Months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];

//   const currentUser = useSelector(state => state.user?.currentUser);
//   const isAdmin = currentUser?.role === 'admin'; // Assuming role is stored in user object
//   const token = currentUser?.accessToken;
  
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const api_url = import.meta.env.VITE_api_url;

//   useEffect(() => {
//     const getStats = async () => {
//       if (!isAdmin) return; // Only fetch if admin
      
//       setLoading(true);
//       setError(null);
      
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
        
//         const res = await axios.get(`${api_url}/api/user/stats`, config);
//         const statsData = res.data.map(item => ({
//           name: Months[item._id - 1],
//           "Active Users": item.total
//         }));
//         setStats(statsData);
//       } catch (err) {
//         console.error("Failed to fetch stats:", err);
//         setError(err.response?.data?.message || "Failed to load analytics data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getStats();
//   }, [api_url, token, isAdmin]);

//   if (!isAdmin) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//         <Typography variant="h6" color="textSecondary">
//           Admin privileges required to view analytics
//         </Typography>
//       </Box>
//     );
//   }

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ width: '100%', mt: 2 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         User Analytics Dashboard
//       </Typography>
//       <Charts
//         data={stats}
//         grid
//         title="Monthly Active Users"
//         dataKey="Active Users"
//       />
//     </Box>
//   );
// };

// export default Home;




// import { useState, useEffect } from 'react';
// import Charts from '../components/Charts';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Button
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const Months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];

//   const navigate = useNavigate();
//   const currentUser = useSelector(state => state.user?.currentUser);
//   const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
//   const isAdmin = currentUser?.role === 'admin';
//   const token = currentUser?.accessToken;
  
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const api_url = import.meta.env.VITE_api_url;

//   console.log(stats)

//   useEffect(() => {
//     const getStats = async () => {
//       if (!isAdmin || !token) return;
      
//       setLoading(true);
//       setError(null);
      
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true // Important for cookies/sessions
//         };
        
//         const res = await axios.get(`${api_url}/api/user/stats`, config);
        
//         // Verify response structure
//         if (!Array.isArray(res.data)) {
//           throw new Error("Invalid data format received from server");
//         }

//         const statsData = res.data.map(item => {
//           if (!item._id || item.total === undefined) {
//             throw new Error("Invalid data item structure");
//           }
//           return {
//             name: Months[item._id - 1] || `Month ${item._id}`,
//             "Active Users": item.total
//           };
//         });
        
//         setStats(statsData);
//       } catch (err) {
//         console.error("Failed to fetch stats:", err);
        
//         if (err.response?.status === 401 || err.response?.status === 403) {
//           setError("Session expired or insufficient permissions. Please login again.");
//         } else if (err.response?.data?.message) {
//           setError(err.response.data.message);
//         } else if (err.message) {
//           setError(err.message);
//         } else {
//           setError("Failed to load analytics data");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Only attempt to fetch if we have a valid token and admin status
//     if (isAdmin && token) {
//       getStats();
//     }
//   }, [api_url, token, isAdmin]);

//   const handleRetry = () => {
//     setError(null);
//     setStats([]);
//   };

//   const handleLoginRedirect = () => {
//     navigate('/login');
//   };

//   // Not authenticated at all
//   if (!isAuthenticated) {
//     return (
//       <Box sx={{ p: 3, textAlign: 'center' }}>
//         <Typography variant="h6" gutterBottom>
//           Please login to access this page
//         </Typography>
//         <Button
//           variant="contained"
//           onClick={handleLoginRedirect}
//           sx={{ mt: 2 }}
//         >
//           Go to Login
//         </Button>
//       </Box>
//     );
//   }

//   // Authenticated but not admin
//   if (!isAdmin) {
//     return (
//       <Box sx={{ p: 3, textAlign: 'center' }}>
//         <Typography variant="h6" gutterBottom>
//           Admin privileges required to view analytics
//         </Typography>
//         <Typography variant="body1" color="textSecondary">
//           Your account doesn't have sufficient permissions
//         </Typography>
//       </Box>
//     );
//   }

//   // Loading state
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Alert
//           severity="error"
//           sx={{ mb: 3 }}
//           action={
//             <Button
//               color="inherit"
//               size="small"
//               onClick={handleRetry}
//             >
//               RETRY
//             </Button>
//           }
//         >
//           {error}
//         </Alert>
//         {error.includes("Session expired") && (
//           <Button
//             variant="contained"
//             onClick={handleLoginRedirect}
//             sx={{ mt: 2 }}
//           >
//             Login Again
//           </Button>
//         )}
//       </Box>
//     );
//   }

//   // Success state
//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
//         User Analytics Dashboard
//       </Typography>
//       {stats.length > 0 ? (
//         <Charts
//           data={stats}
//           grid
//           title="Monthly Active Users"
//           dataKey="Active Users"
//         />
//       ) : (
//         <Typography variant="body1" color="textSecondary">
//           No analytics data available
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default Home;













import { useState, useEffect } from 'react';
import Charts from '../components/Charts';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const Months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user?.currentUser);
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
  const isAdmin = currentUser?.role === 'admin';
  const token = currentUser?.token; // Changed from accessToken to token
  
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api_url = import.meta.env.VITE_api_url;

  useEffect(() => {
    const getStats = async () => {
      if (!isAdmin || !token) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        };
        
        const res = await axios.get(`${api_url}/api/user/stats`, config);
        
        // Verify response structure - now expects direct array
        if (!Array.isArray(res.data)) {
          throw new Error("Invalid data format received from server");
        }

        // Transform data for charts
        const statsData = res.data
          .sort((a, b) => a._id - b._id) // Ensure proper month ordering
          .map(item => ({
            name: Months[item._id - 1] || `Month ${item._id}`,
            "Active Users": item.total
          }));
        
        setStats(statsData);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else if (err.response?.status === 403) {
          setError("You don't have permission to view this data.");
        } else if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError("Failed to load analytics data");
        }
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin && token) {
      getStats();
    }
  }, [api_url, token, isAdmin]);

  // ... [keep the rest of the component the same] ...

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        User Analytics Dashboard
      </Typography>
      {stats.length > 0 ? (
        <Charts 
          data={stats} 
          grid 
          title="Monthly Active Users" 
          dataKey="Active Users"
        />
      ) : !loading && !error ? (
        <Typography variant="body1" color="textSecondary">
          No analytics data available for the past year
        </Typography>
      ) : null}
    </Box>
  );
};

export default Home;


