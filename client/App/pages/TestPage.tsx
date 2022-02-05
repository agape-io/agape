import React, { FC, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';

// Types
import { HomeStackParamList, RootNavigatorParamsList } from '../navigation';

// API
import { logOut } from '../utils';
import { AuthContext } from '../navigation';

export interface TestPageProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeStackParamList, 'Test'>,
    NativeStackNavigationProp<RootNavigatorParamsList>
  >
}

const TestPage:FC<TestPageProps> = ({ navigation }) => {
  const { token } = useContext(AuthContext);
  return (
    <View>
      <Text>This is a test page</Text>
      <TouchableOpacity
        onPress={() => {
          logOut(token);
          navigation.navigate('SignIn');
        }}
      >
        Log Out
      </TouchableOpacity>
    </View>
  )
}

export default TestPage;