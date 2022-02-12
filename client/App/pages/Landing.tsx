/**
 * Landing Page
 */
// Packages
import React, { useEffect, FC } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

// Types
import { AuthNavigatorParamList, RootNavigatorParamsList } from '../types';

// Auth 
import { useAuth } from '../navigation';
import { CompositeNavigationProp } from '@react-navigation/native';

export interface LandingProps {
  navigation?: NativeStackNavigationProp<AuthNavigatorParamList, 'Landing'>;
}

const Landing:FC<LandingProps> = ({ navigation }) => {
  return(
    <View style={styles.container}>
      <Image style={styles.horizontal} source={require('../../assets/icons/agape-temp.png')} resizeMode='contain'/>
      <ActivityIndicator size="large" color="#F0ABC1" />
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