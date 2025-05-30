// import {createSlice, current} from "@reduxjs/toolkit"

// const userSlice = createSlice({
//     name:"user",
//     initialState:{
//         isFetching:false,
//         currentUser:null,
//         IsFailure:false
//     },
//     reducers:{
//         loginStart:(state)=>{
//            state.isFetching = true
//         },
//         loginSuccess:(state, action)=>{
//             state.isFetching = false,
//             state.currentUser = action.payload,
//             state.IsFailure = false
//         },
//         loginFailure:(state)=>{
//             state.isFetching = false,
//             state.IsFailure = true
//         },
//         logout:(state)=>{
//             state.currentUser = null;
//         },
        
//     }
// })

// export const {loginStart, loginSuccess, loginFailure, logout} = userSlice.actions
// export default userSlice.reducer




















// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//     name: "user",
//     initialState: {
//         isFetching: false,
//         currentUser: null,
//         isFailure: false,
//         isAuthenticated: false,
//         token: null,
//         error: null,
//         lastLogin: null
//     },
//     reducers: {
//         loginStart: (state) => {
//             state.isFetching = true;
//             state.error = null;
//             state.isFailure = false;
//         },
//         loginSuccess: (state, action) => {
//             state.isFetching = false;
//             state.currentUser = action.payload.user;
//             state.token = action.payload.token;
//             state.isAuthenticated = true;
//             state.isFailure = false;
//             state.lastLogin = new Date().toISOString();
//             state.error = null;
            
//             // Store token in localStorage
//             if (typeof window !== 'undefined') {
//                 localStorage.setItem('token', action.payload.token);
//                 localStorage.setItem('user', JSON.stringify(action.payload.user));
//             }
//         },
//         loginFailure: (state, action) => {
//             state.isFetching = false;
//             state.isFailure = true;
//             state.error = action.payload;
//             state.isAuthenticated = false;
//         },
//         logout: (state) => {
//             state.currentUser = null;
//             state.isAuthenticated = false;
//             state.token = null;
            
//             // Clear localStorage
//             if (typeof window !== 'undefined') {
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('user');
//             }
//         },
//         initializeAuth: (state) => {
//             // Check for existing auth state when app loads
//             if (typeof window !== 'undefined') {
//                 const token = localStorage.getItem('token');
//                 const user = localStorage.getItem('user');
                
//                 if (token && user) {
//                     state.token = token;
//                     state.currentUser = JSON.parse(user);
//                     state.isAuthenticated = true;
//                 }
//             }
//         },
//         refreshToken: (state, action) => {
//             state.token = action.payload;
//             if (typeof window !== 'undefined') {
//                 localStorage.setItem('token', action.payload);
//             }
//         },
//         clearError: (state) => {
//             state.error = null;
//             state.isFailure = false;
//         }
//     }
// });

// export const {
//     loginStart,
//     loginSuccess,
//     loginFailure,
//     logout,
//     initializeAuth,
//     refreshToken,
//     clearError
// } = userSlice.actions;

// // Selectors
// export const selectCurrentUser = (state) => state.user.currentUser;
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
// export const selectAuthToken = (state) => state.user.token;
// export const selectAuthError = (state) => state.user.error;
// export const selectIsAuthLoading = (state) => state.user.isFetching;

// export default userSlice.reducer;

















import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely access localStorage
const getStoredAuthState = () => {
  if (typeof window === 'undefined') {
    return {
      token: null,
      user: null
    };
  }
  
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
      token: token || null,
      user: user ? JSON.parse(user) : null
    };
  } catch (error) {
    console.error("Error reading auth state from localStorage:", error);
    return {
      token: null,
      user: null
    };
  }
};

const { token, user } = getStoredAuthState();

const userSlice = createSlice({
    name: "user",
    initialState: {
        isFetching: false,
        currentUser: user,
        isFailure: false,
        isAuthenticated: !!token,
        token: token,
        error: null,
        lastLogin: null
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.error = null;
            state.isFailure = false;
        }, 
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isFailure = false;
            state.lastLogin = new Date().toISOString();
            state.error = null;
            
            // Store token and user in localStorage
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.isFailure = true;
            state.error = action.payload;
            state.isAuthenticated = false;
            
            // Clear any existing auth data on failure
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }, 
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.token = null;
            
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        refreshToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        clearError: (state) => {
            state.error = null;
            state.isFailure = false;
        },
        updateUserProfile: (state, action) => {
            if (state.currentUser) {
                state.currentUser = { ...state.currentUser, ...action.payload };
                localStorage.setItem('user', JSON.stringify(state.currentUser));
            }
        }
    }
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure, 
    logout, 
    refreshToken,
    clearError,
    updateUserProfile
} = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectAuthToken = (state) => state.user.token;
export const selectAuthError = (state) => state.user.error;
export const selectIsAuthLoading = (state) => state.user.isFetching;

export default userSlice.reducer;









