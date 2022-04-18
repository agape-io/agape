/**
 * Landing Screen
 */
// Libraries
import React, { FC } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

// Types
import { LandingProps } from '../types';

// Component-owned styles
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

  
export default Landing;