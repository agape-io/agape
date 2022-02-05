/*
  Main Stack for home navigation

  Screens used: Discovery
*/
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { TestPage } from '../pages';

const Home = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Home.Navigator>
      <Home.Screen name="Main Stack" component={TestPage} options={{ headerShown: false }} />
    </Home.Navigator>
  );
}

export default HomeStack;