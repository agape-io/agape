/**
 * Sign Up Screen
 */
import React, { 
  FC,
  useEffect,
  useRef,
  useState
} from 'react';
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

// Styles
import styles from "../../assets/styles";

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
  const [errorMessage, setErrorMessage] = useState('');
  const [error, isError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isMounted = useRef<any>(null);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);

  const runSignUp = async (email: string, password: string, verifyPassword: string) => {
    axios.post(`${API_URL}/signup/email`, {
      email,
      password,
      verifyPassword
    })
      .then(res => {
        // check if there is a response
        // Tell the user try signing in
        isError(false);
        setLoading(false);
        if (res) navigation.navigate("SignIn");
      })
      .catch(e => {
        // display errors to the UI
        isError(true);
        console.log(e.message);
        setErrorMessage(e.response.data.message);
      })
      .finally(() => {
        if (isMounted.current) setLoading(false);
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
        {error && <Text style={styles.authError}>{errorMessage}</Text>}
        <TouchableOpacity
          style={{ width: '86%', marginTop: 20 }}
          onPress={() => runSignUp(email, password, verifyPassword)}
        >
          <View style={styles.authButton}>
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

export default SignUp;