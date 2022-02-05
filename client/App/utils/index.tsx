/**
 * Index file for utils
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { API_URL } from '@env';

const signIn = async (email: string, password: string) => {
  // get values and call API to check if user exists
    // if exists, get token and store into storage
  // if not, return an error
  return axios.post(`${API_URL}/signin/email`, {
    data: {
      email,
      password
    }
  })
  .then(res => {
    // set token to local storage
    console.log(res.data.token);
    AsyncStorage.setItem('token', res.data.token);
  })
  .catch(e => {
    console.log('Error on sign in: ', e);
  });
}

const signUp = async (email: string, password: string, verifyPassword: string) => {
  // get values
  return axios.post(`${API_URL}/signup/email`, {
    data: {
      email,
      password,
      verifyPassword
    }
  })
    .catch(e => {
      console.log('Error on sign up: ', e);
  })
}

const logOut = async (token: string) => {
  // get token and clear async storage
  if (token) {
    return AsyncStorage.removeItem('token');
  }
}

export {
  signIn,
  signUp,
  logOut
};