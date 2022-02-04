/**
 * Auth Provider for authentication
 */

//TODO: Create auth provider once backend is created
import React, { createContext, useState, useEffect, FC } from 'react';
import axios from 'axios';

interface IAuth {
  token?: string | null;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, verifyPassword: string) => void;
  logout: (token: string) => void;
}

export const AuthContext = createContext<IAuth>({} as IAuth);


export const AuthContextProvider: FC<IAuth> = ({ children }) => {

  return (
    <AuthContext.Provider
      value={{
        token,
        signIn: async (email, password) => {
          // set sign in
          console.log("sign in");
        },
        signUp: async (email, password, verifyPassword) => {
          // set sign up
          console.log('sign up');
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