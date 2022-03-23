/**
 * Index.tsx
 * 
 * Top level for the client side
 */
import * as React from 'react';
import { Routes } from './navigation';
import { AuthProvider } from './context';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
