/**
 * Landing Screen
 */
import React, { FC, useContext } from 'react';
import {
  View,
  Text, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, getStateFromPath } from '@react-navigation/native';

// Types
import {
  HomeNavigatorParamList,
  RootNavigatorParamsList
} from '../types';

// API
import { logOut } from '../utils';
import { AuthContext } from '../navigation';

export interface TestPageProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeNavigatorParamList, 'Test'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const TestPage:FC<TestPageProps> = ({ navigation }) => {
  const { token } = useContext(AuthContext);
  return (
    <View>
      <Text>This is a test page</Text>
      <TouchableOpacity
        onPress={() => {
          logOut(token);
          if (token === null) navigation.navigate('Auth', { screen: 'SignIn' });
        }}
      >
        Log Out
      </TouchableOpacity>
    </View>
  )
}

export default TestPage;