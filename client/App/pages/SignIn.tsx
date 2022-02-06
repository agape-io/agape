/**
 * Sign In Screen
 */
import React, {
  useState,
  FC,
  useContext
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

// Types
import {
  AuthNavigatorParamList,
  RootNavigatorParamsList
} from '../types';

// API
import { API_URL } from '@env';
import { AuthContext } from '../navigation';

export interface SignInProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<AuthNavigatorParamList, 'SignIn'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
  email: string;
  password: string;
}

const SignIn: FC<SignInProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { getToken } = useContext(AuthContext);

  const runSignIn = async (email: string, password: string) => {
      axios.post(`${API_URL}/signin/email`, {
        email,
        password
      })
      .then(res => {
        // set token to local storage
        const token = res.data.user.token;
        AsyncStorage.setItem('token', token);
        
        // get the token before navigating
        const retrieveToken = getToken?.();
        
        // if token is in the storage, navigate to Home
        if (retrieveToken) navigation.navigate('Home', { screen: 'Test' });
      })
      .catch(e => {
        console.log(e);
      });
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
        </View>
        <TouchableOpacity
          style={{ width: '86%', marginTop: 20 }}
          onPress={() => runSignIn(email, password)}
        >
          <View style={styles.button}>
            <Text>Sign In</Text>
          </View>
        </TouchableOpacity>
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

export default SignIn;