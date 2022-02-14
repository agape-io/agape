/**
 * Main Handler for Routes
 */
import React, {
  useState,
  useEffect,
  useContext,
  FC
} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Types
import {
  HomeNavigatorParamList,
  AuthNavigatorParamList,
  RootNavigatorParamsList
} from '../types';

// Stacks
import { useAuth } from "../navigation";

// Screens
import {
  TestPage,
  SignIn,
  SignUp,
  Landing,
  Splash
} from '../pages';

interface State {
  loading?: boolean;
  initializing?: boolean;
}

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();
const HomeStack = createNativeStackNavigator<HomeNavigatorParamList>();
const AuthStack = createNativeStackNavigator<AuthNavigatorParamList>();

const Home:FC = () => {
  const { Navigator, Screen } = HomeStack;

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Test" component={TestPage} />
    </Navigator>
  )
}

const Auth:FC = () => {
  const { Navigator , Screen } = AuthStack;

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignUp" component={SignUp} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Landing" component={Landing} />
    </Navigator>
  )
}

const Routes:FC<State> = () => {
  const { authData, loading } = useAuth();
  const { Screen, Navigator } = RootStack;
  
  // if loading, render screen
  if (loading) {
    return <Landing />;
  }

  return (
    <NavigationContainer>
      <Navigator>
        {/*comment this out for texting*/}
        {/* {authData ? (
          <Screen name="Home" component={Home} />
        ) : (
          <Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        )} */}
        <Screen name="Splash" component={Splash}/>
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes;