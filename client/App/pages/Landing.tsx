/**
 * Landing Page
 */
import React from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

const Landing = () => {
  return(
    <View style={styles.container}>
        <Image style={styles.horizontal} source={require('../../assets/icons/agape-temp.png')} resizeMode='center'/>
        <ActivityIndicator size="large" color="#F0ABC1" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
     flex: 3,
     flexDirection: 'column',
     alignItems: 'center',
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
});
  
export default Landing;