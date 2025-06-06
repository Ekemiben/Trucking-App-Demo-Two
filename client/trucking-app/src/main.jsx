import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
    <App />
    </BrowserRouter>
      </PersistGate>
    </Provider>
    
   
  </StrictMode>,
)
