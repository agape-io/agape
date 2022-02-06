/**
 * Auth Provider for authentication
 * 
 */
import React, { createContext, useState, useEffect, FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IAuth {
  token: string;
  storeToken: (param: string) => void;
  grabToken?: () => void;
  children?: React.ReactNode;
}

const AuthContext = createContext({} as IAuth);

const AuthContextProvider: FC<IAuth> = ({ children }) => {
  const [token, setToken] = useState<string>('');

  const grabToken = async () => {
    // check if token is retrieved
    AsyncStorage.getItem('token').then(token => {
      const usertoken = JSON.stringify(token || '');
      setToken(usertoken);
    }).catch(e => {
      console.log(e);
      setToken('');
    });
  }

  const storeToken = async (token:string) => {
    AsyncStorage.setItem('token', token)
      .then(() => {
        setToken(token);
      })
      .catch(e => {
        Promise.reject(e);
      });
  }

  useEffect(() => {
    grabToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeToken,
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