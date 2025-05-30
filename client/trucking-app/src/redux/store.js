import { configureStore } from '@reduxjs/toolkit';
import {persistStore, persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage';
import userReducer from "../redux/userSlice"


const userPersistor = {
    key:"user",
    storage,
}


const persistedUserReducer = persistReducer(userPersistor, userReducer);


export const store = configureStore({
    reducer: {
      user: persistedUserReducer,
    },
    
  });
  
  export const persistor = persistStore(store);