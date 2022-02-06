/**
 * Landing Screen
 */
import React, { FC } from 'react';
import {
  View,
  Text, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';

// Types
import {
  HomeNavigatorParamList,
  RootNavigatorParamsList
} from '../types';

// API
import { useAuth } from '../navigation';

export interface TestPageProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeNavigatorParamList, 'Test'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const TestPage:FC<TestPageProps> = ({ navigation }) => {
  const auth = useAuth();

  const signOut = async () => {
    auth.signOut()
      .then(() => {
        navigation.navigate("Auth", { screen: "SignIn" });
      });
  };
  
  return (
    <View>
      <Text>This is a test page</Text>
      <TouchableOpacity
        onPress={() => signOut()}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TestPage;