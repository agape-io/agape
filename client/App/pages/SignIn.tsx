/**
 * Sign In Screen
 */
import React, { useState, FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

// Types
import {
  AuthNavigatorParamList,
  RootNavigatorParamsList
} from '../types';

// API
import { useAuth } from '../navigation';

// Styles
import styles from "../../assets/styles";

export interface SignInProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<AuthNavigatorParamList, 'SignIn'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
  email: string;
  password: string;
}

const SignIn: FC<SignInProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, isError] = useState(false);

  const auth = useAuth();

  const signIn = async (email: string, password: string) => {
    auth.signIn(email, password)
      .then(() => {
        // when successful, set error to false
        isError(false);
      })
      .catch(e => {
        //navigation.navigate("Auth", { screen: "SignIn" });
        console.log(e.message);
        setErrorMessage(e.message);
        isError(true);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView style={styles.authContainer} behavior="padding">
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
        </View>
        <TouchableOpacity
          style={{ width: '86%', marginTop: 20 }}
          onPress={() => signIn(email, password)}
        >
          <View style={styles.authButton}>
            <Text>Sign In</Text>
          </View>
        </TouchableOpacity>
        {error && <Text style={styles.authError}>{errorMessage}</Text>}
        <View style={{ marginTop: 10 }}>
          <Text
            style={{ fontWeight: '200', fontSize: 20, textAlign: 'center' }}
            onPress={() => navigation.navigate('SignUp')}
          >
            Don't have an account?
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignIn;