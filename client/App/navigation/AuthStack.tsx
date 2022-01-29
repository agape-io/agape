/**
 * Auth Stack for authentication screens
 * 
 * Screens Used: SignUp, SignIn
 */
import React, { useContext, useEffect, useState, FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { SignUp } from '../pages';

const Auth = createNativeStackNavigator();

function AuthStack() {
  return (
    <Auth.Navigator>
      <Auth.Screen name="Auth Stack" component={SignUp} />
    </Auth.Navigator>
  )
} 

export default AuthStack;