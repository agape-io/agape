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
        <ActivityIndicator style={styles.loading} size="large" color="#F0ABC1" />
        {/* <Image style={styles.horizontal} source={require('../../assets/icons/agape-temp.png')} resizeMode='contain'/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  loading: { 
    alignItems: 'center'
  }
});
  
export default Landing;