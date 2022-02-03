/**
 * Auth Stack for authentication screens
 * 
 * Screens Used: SignUp, SignIn
 */
import React, { useContext, useEffect, useState, FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { SignUp } from '../pages';
import { SignIn } from '../pages';
import { LandingPage } from '../pages';

const Auth = createNativeStackNavigator();

function AuthStack() {
  return (
    <Auth.Navigator initialRouteName='Landing Page'>
      <Auth.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />
      <Auth.Screen name="Sign In" component={SignIn} options={{ headerShown: false }} />
      <Auth.Screen name="Landing Page" component={LandingPage} options={{ headerShown: false }} />

    </Auth.Navigator>
  )
}

export default AuthStack;