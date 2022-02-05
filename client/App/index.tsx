/**
 * Index.tsx
 * 
 * Top level for the client side
 */
import * as React from 'react';
import { Routes, AuthContextProvider } from './navigation';

export default function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}
