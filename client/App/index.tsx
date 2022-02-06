/**
 * Index.tsx
 * 
 * Top level for the client side
 */
import * as React from 'react';
import { Routes, AuthProvider } from './navigation';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
