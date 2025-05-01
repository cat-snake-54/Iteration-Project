import React from 'react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from './components/usercontext/userContext.tsx';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
