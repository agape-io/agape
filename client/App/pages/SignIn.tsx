/**
 * Sign In Screen
 */
import React, { useState, FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator
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

export interface SignInProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<AuthNavigatorParamList, 'SignIn'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
  email: string;
  password: string;
}

const SignIn: FC<SignInProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, isLoading] = useState<boolean>(false);

  const auth = useAuth();

  const signIn = async (email: string, password: string) => {
    isLoading(true);
    auth.signIn(email, password)
      .finally(() => {
      navigation.navigate("Home", { screen: "Test" });
    })
    .catch(e => {
      navigation.navigate("Auth", { screen: "SignIn" });
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#F0ABC1" />
      ): (
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
              onPress={() => signIn(email, password)}
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
      )}
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