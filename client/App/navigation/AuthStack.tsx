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
    <Auth.Navigator initialRouteName='Sign In'>
      <Auth.Screen name="Sign Up" component={SignUp} options={{headerShown: false}}/>
    </Auth.Navigator>
  )
} 

export default AuthStack;