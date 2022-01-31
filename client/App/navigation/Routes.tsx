/**
 * Main Handler for Routes
 */
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Stacks
import { AuthStack, HomeStack } from "../navigation";

// Screens


interface State {
  loading: boolean;
}

function Routes({ loading }: State) {
  // const { user, setUser } = useContext(AuthContext);
  const [user, setUser] = useState(false);
  const [load, setLoad] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // handle auth change

  // check if user is logged in

  // if loading, render screen
  // if (loading) {
  //   // render loading screen
  // }

  return (
    <NavigationContainer>
      { user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  )

}

export default Routes;