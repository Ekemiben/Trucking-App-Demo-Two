// import { configureStore } from '@reduxjs/toolkit';
// import {persistStore, persistReducer} from "redux-persist"
// import storage from 'redux-persist/lib/storage';
// import userReducer from "../redux/userSlice"


// const userPersistor = {
//     key:"user",
//     storage,
// }


// const persistedUserReducer = persistReducer(userPersistor, userReducer);


// export const store = configureStore({
//     reducer: {
//       user: persistedUserReducer,
//     },
    
//   });
  
// export const persistor = persistStore(store);
  































// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import userReducer from "./userSlice";

// // Persist configuration
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['user'], // Only persist the user slice
//   // Optional: You can add more configuration like:
//   // - blacklist: ['someNonPersistedReducer']
//   // - stateReconciler: hardSet or other strategies
//   // - migrate: custom migration function
//   // - version: state version number
// };

// const persistedReducer = persistReducer(persistConfig, userReducer);

// export const store = configureStore({
//   reducer: {
//     user: persistedReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
//   // Optional: Add devTools configuration
//   devTools: process.env.NODE_ENV !== 'production',
// });

// export const persistor = persistStore(store);

// // Optional: Add persistor purge for testing or special cases
// export const purgePersistedState = () => {
//   persistor.purge();
// };

















import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "./userSlice";

// Persist configuration
const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['currentUser', 'token', 'isAuthenticated'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Optional: Add persistor purge for testing or special cases
export const purgePersistedState = () => {
  persistor.purge();
};




















