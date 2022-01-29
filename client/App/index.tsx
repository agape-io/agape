import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Routes, AuthStack } from './navigation';


export default function App() {
  return (
    
    <NavigationContainer>
      {/* 
        TODO: AuthStack will be switched with Routes
        TODO: NavigationContainer will be switched with AuthProvider
      */}
      <AuthStack />
    </NavigationContainer>
  );
}
