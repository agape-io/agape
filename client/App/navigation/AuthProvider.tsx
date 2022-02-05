/**
 * Auth Provider for authentication
 * 
 * @param token the user's token is accessed.
 */

//TODO: Create auth provider once backend is created
import React, { createContext, useState, useEffect, FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuth {
  token?: string | null;
  getToken?: () => void;
  children?: React.ReactNode;
}

const AuthContext = createContext<IAuth | null >(null);

const AuthContextProvider: FC<IAuth> = ({ children }) => {
  const [token, setToken] = useState('');

  const getToken = async () => {
    // check if token is retrieved
    return AsyncStorage.getItem('token').then(token => {
      if (token) {
        setToken(token);
      }
    }).catch(e => {
      // error is read
      console.log('On Auth Context: ', e);
    })
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