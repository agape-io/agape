/**
 * Main Handler for Routes
 */
import React, { useState, useEffect, useContext, FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Types
import {
  HomeStackParamList,
  AuthStackParamList,
  RootNavigatorParamsList
} from './types';

// Stacks
import { AuthContext } from "../navigation";

// Screens
import {
  TestPage,
  SignIn,
  SignUp,
  Landing,
} from '../pages';

interface State {
  loading?: boolean;
  initializing?: boolean;
}

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const Home:FC = () => {
  const { Navigator, Screen } = HomeStack;

  return (
    <Navigator>
      <Screen name="Test" component={TestPage} options={{ headerShown: false }} />
    </Navigator>
  )
}

const Auth:FC = () => {
  const { Navigator , Screen } = AuthStack;

  return (
    <Navigator>
      <Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Screen name="Landing" component={Landing} options={{ headerShown: false }} />
    </Navigator>
  )
}

const Routes:FC<State> = () => {
  const userToken = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [initializing, setInitializing] = useState<boolean>(true);

  const { Group, Screen, Navigator } = RootStack;
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
    return <Landing />;
  }

  return (
    <NavigationContainer>
      <Navigator>
        {userToken?.token ? (
          <Group>
            <Screen name="Home" component={Home} options={{ headerShown: false }}/>
          </Group>
        ) : (
            <Group>
              <Screen name="Auth" component={Auth} options={{ headerShown: false }}/>
          </Group>
        )}
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes;