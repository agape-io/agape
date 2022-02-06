/**
 * Auth Provider for authentication
 * 
 * @param token the user's token is accessed.
 * @function getToken gets the user's token before storing it into the storage
 */
import React, { createContext, useState, useEffect, FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IAuth {
  token: string;
  getToken?: () => void;
  children?: React.ReactNode;
}

const AuthContext = createContext({} as IAuth);

const AuthContextProvider: FC<IAuth> = ({ children }) => {
  const [token, setToken] = useState('');

  const getToken = async () => {
    // check if token is retrieved
    AsyncStorage.getItem('token').then(token => {
      setToken(token);
    }).catch(e => {
      // error is read
      console.log(e);
    });
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getToken,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthContextProvider
}