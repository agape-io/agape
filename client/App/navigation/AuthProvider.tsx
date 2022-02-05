/**
 * Auth Provider for authentication
 * 
 * @param token the user's token is accessed.
 */

//TODO: Create auth provider once backend is created
import React, { createContext, useState, useEffect, FC } from 'react';
import axios from 'axios';
import { API_URL } from '@env';

interface IAuth {
  token: string | null;
  signIn?: (email: string, password: string) => void;
  signUp?: (email: string, password: string, verifyPassword: string) => void;
  logout?: (token: string) => void;
}

export const AuthContext = createContext<IAuth>({} as IAuth);


export const AuthContextProvider: FC<IAuth> = ({ children }) => {

  const getToken = async (token: string) => {
    // check if token is retrieved

    return token;
  }

  return (
    <AuthContext.Provider
      value={{
        getToken,
        signIn: async (email, password) => {
          // set sign in
          console.log("sign in");
          
          // Call to axios API
          axios.post(`${API_URL}`)
        },
        signUp: async (email, password, verifyPassword) => {
          // set sign up
          console.log('sign up');
          try {

          } catch (e) {

          }
        },
        logout: (token) => {
          // remove token
          console.log('log out')
        }

      }}
    >
      {children}
    </AuthContext.Provider>
  )

}