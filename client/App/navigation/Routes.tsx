/**
 * Main Handler for Routes
 */
import React, { useState, useEffect, useContext, FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Stacks
import { AuthStack, HomeStack, AuthContext } from "../navigation";

// Screens
import { LandingPage } from '../pages';

interface State {
  loading?: boolean;
  initializing?: boolean;
}

export const Routes: FC < State > = () => {
  const userToken = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [initializing, setInitializing] = useState<boolean>(true);

  // handle auth change
  const handleAuthState = () => {
    // get the token
    // if the token is there, stop loading
    const usertoken = userToken?.getToken?.();
    if (usertoken) {
      if (initializing) setInitializing(false);
      setLoading(false);
    }
  }

  // always checks if user has token
  useEffect(() => {
    const subscriber = handleAuthState();

    // unsubscribes when unmounted
    return subscriber;
  }, []);

  
  // if loading, render screen
  if (loading) {
    // render loading screen
    return <LandingPage />;
  }

  return (
    <NavigationContainer>
      { userToken?.token ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  )
}