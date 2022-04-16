// constants
export const DB_STATE = {
  DISCONNECTED: 0,
  CONNECTED: 1,
  CONNECTING: 2,
  DISCONNECTING: 3,
};

export const DATE_FORMAT = 'MM/DD/YYYY';

export const DEFAULT_CHAT_NAME = 'MATCH';

export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

export const JWT_TOKEN_EXPIRY_TIME = '1d';

// enums
export enum MEMBERSHIP_TYPES {
  BASIC = '6233c60d59af3002b221b0ce',
  PREMIUM = '6234318fd262c0daf938b71a',
  ELITE = '623431c3faf1f6ffb4e6a901',
}

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

export enum SEXUALITY {
  STRAIGHT = 'straight',
  GAY ='gay',
  LESBIAN = 'lesbian',
  BISEXUAL = 'bisexual',
}

// types
export type ADMIN = {
  _id: string,
  email: string,
  password: string,
}

export type CHAT = {
  _id: string,
  chatName: string,
  users: USER[] | string[],
  latestMessage?: MESSAGE,
}

export type MESSAGE = {
  _id: string,
  sender: USER | string,
  content: string,
  chat: CHAT | string,
}

export type PLAN = {
  _id: string,
  name: string,
  price: string,
}

export type USER = {
  _id: string,
  email: string,
  password: string,
  isOnline?: boolean,
  profile?: {
    name: string
    age: string,
    gender: string,
    yearBorn: number,
    aboutMe: string,
    religion: string,
    location: string,
    hobbies: string[],
    photo: string,
  },
  preferences?: {
    sexuality: string,
    maxDist?: number,
    minAge?: number,
    maxAge?: number,
    religion?: string[],
  },
  settings?: {
    pushNotifications: boolean,
    membershipType: PLAN | string,
    endingDate?: Date,
    billingDate?: Date,
  },
  swipedLeft?: USER[] | string[],
  swipedRight?: USER[] | string[],
}
