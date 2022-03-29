/**
 * Landing Screen
 */
import React, { FC } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

// Types
import { AuthNavigatorParamList } from '../types';

export interface LandingProps {
  navigation?: NativeStackNavigationProp<AuthNavigatorParamList, 'Landing'>;
}

const Landing:FC<LandingProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.indicator} size="large" color="#F0ABC1" />
      <TouchableOpacity style={{ width: '86%', marginTop: 20 }} onPress={() => navigation?.navigate('SignIn')}>
        <Text>
          Go Back?
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
  },
  indicator: {
    justifyContent: 'center',
    flex: 1,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
  
export default Landing;