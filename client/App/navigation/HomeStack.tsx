/*
  Main Stack for home navigation

  Screens used: Discovery
*/
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { SignUp } from '../pages';

const Home = createNativeStackNavigator();

function HomeStack() {
  return (
    <Home.Navigator>
      <Home.Screen name="Main Stack" component={SignUp} options={{headerShown: false}}/>
    </Home.Navigator>
  );
}

export default HomeStack;