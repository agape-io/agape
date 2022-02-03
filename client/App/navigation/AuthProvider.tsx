/**
 * Auth Provider for authentication
 */

//TODO: Create auth provider once backend is created
import React, { createContext, useState } from 'react';

interface IAuthContext {
  user: string;
  setUser: string;
  signIn: () => void;
  signUp: () => void;
  signOut: () => void;
}

const defaultState = {

};

export const AuthContext = createContext<IAuthContext | null>(null);