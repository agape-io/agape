/**
 * Sign Up Screen
 */
import React, { FC, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Types
import { AuthNavigatorParamList } from '../types';

// API
import { API_URL } from '@env';

export interface SignUpProps {
  navigation: NativeStackNavigationProp<AuthNavigatorParamList, 'SignUp'>;
  email: string;
  password: string;
  verifyPassword: string;
};

const SignUp: FC<SignUpProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const runSignUp = async (email: string, password: string, verifyPassword: string) => {
    axios.post(`${API_URL}/signup/email`, {
        email,
        password,
        verifyPassword
      })
    .then(res => {
      // check if there is a response
      // Tell the user try signing in
      if (res) navigation.navigate("SignIn");  
    })
    .catch(e => {
      console.log(e);
  })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require('../../assets/icons/agape-temp.png')}
          resizeMode='contain'
        />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor="#b1b1b1"
            returnKeyType="next"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor="#b1b1b1"
            returnKeyType="done"
            textContentType="newPassword"
            secureTextEntry={true}
            value={password}
            onChangeText={password => setPassword(password)}
          />
          <TextInput
            style={styles.input}
            placeholder='Verify Password'
            placeholderTextColor="#b1b1b1"
            returnKeyType="done"
            textContentType="newPassword"
            secureTextEntry={true}
            value={verifyPassword}
            onChangeText={verifyPassword => setVerifyPassword(verifyPassword)}
          />
        </View>
        <TouchableOpacity
          style={{ width: '86%', marginTop: 20 }}
          onPress={() => runSignUp(email, password, verifyPassword)}
        >
          <View style={styles.button}>
            <Text>Create Account</Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{ fontWeight: '200', fontSize: 20, textAlign: 'center' }}
            onPress={() => navigation.navigate("SignIn")}
          >
            Already have an account?
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '86%',
    paddingTop: 35
  },
  input: {
    fontSize: 20,
    borderColor: '#707070',
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5,
  },
  button: {
    backgroundColor: '#F0ABC1',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22
  }
});

export default SignUp;