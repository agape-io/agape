/**
 * Landing Page
 */
import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Image } from 'react-native';

function LandingPage() {
    return(
        <View style={styles.container}>
            <Image style={styles.horizontal} source={require('../../assets/icons/agape-temp.png')} resizeMode='center'/>
            <Text style={styles.horizontal}>This is the Landing Page!</Text>
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

export default LandingPage;

//  const styles = StyleSheet.create({
//    container: {
//      flex: 1,
//      flexDirection: 'column',
//      alignItems: 'center',
//    },
//    form: {
//      width: '86%',
//    },
//    input: {
//      fontSize: 20,
//      borderColor: '#707070',
//      borderBottomWidth: 1,
//      paddingBottom: 1.5,
//      marginTop: 25.5,
//    },
//    button: {
//      backgroundColor: '#F0ABC1',
//      height: 44,
//      flexDirection: 'row',
//      justifyContent: 'center',
//      alignItems: 'center',
//      borderRadius: 22
//    }
//  });