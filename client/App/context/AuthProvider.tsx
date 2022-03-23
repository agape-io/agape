/**
 * Auth Provider for authentication
 */
import React, { createContext, useState, useEffect, FC, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Types
import { AuthContextData } from '../types';

// API
import { API_URL } from '@env';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider:FC = ({ children }) => {
  const [authData, setAuthData] = useState<any>();
  const [loading, setLoading] = useState<any>(true);
  const [notification, setNotification] = useState<any>();

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    AsyncStorage.getItem('@auth')
      .then((authDataSerialized:any) => {
        const _authData = JSON.parse(authDataSerialized);
        
        console.log(_authData);
        setAuthData(_authData);
        setLoading(false);
      }).catch(e => { 
        Promise.reject(e.message);
      })
  }

  const signIn = async (email: string, password: string) => {
    // call API, add to storage
    return axios.post(`${API_URL}/signin/email`, {
      email,
      password
    }).then(res => {
      const _auth = res.data.user || {};
      AsyncStorage.setItem('@auth', JSON.stringify(_auth));

      setAuthData(_auth);
      Promise.resolve('Success!');
    });
  }

  const signOut = async () => {
    // remove auth from async storage and state
    setAuthData(undefined);
    AsyncStorage.removeItem('@auth').then(() => {
      Promise.resolve('User is signed out!');
    });
  }

  return (
    <AuthContext.Provider
      value={{
        authData,
        signIn,
        signOut,
        loading,
        notification,
        setNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth():AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}

export {
  AuthProvider,
  useAuth
}