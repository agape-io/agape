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
 
 const Splash = () => {
   return(
     <View style={styles.container}>
        <Image style={styles.loading} source={require('../../assets/splash.png')} resizeMode='contain'/>
        <ActivityIndicator style={styles.loading} size="large" color="#F0ABC1" />
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
   
 export default Splash;