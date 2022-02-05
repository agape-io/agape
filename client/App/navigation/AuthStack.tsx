/**
 * Auth Stack for authentication screens
 * 
 * Screens Used: SignUp, SignIn, LandingPage
 */
import React, { useContext, useEffect, useState, FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { SignUp, SignIn, LandingPage } from '../pages';

const Auth = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Auth.Navigator initialRouteName='Sign Up'>
      <Auth.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />
      <Auth.Screen name="Sign In" component={SignIn} options={{ headerShown: false }} />
      <Auth.Screen name="Landing Page" component={LandingPage} options={{ headerShown: false }} />
    </Auth.Navigator>
  )
}