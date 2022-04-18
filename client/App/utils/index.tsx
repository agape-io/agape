/**
 * Index file for utils
 * 
 * API calls to the server
 */
import axios from 'axios';

// API
import { API_URL } from '@env';

const apiVersion = "/api/v1";

/**
 * Sign Up
 * 
 * @param email 
 * @param password 
 * @param verifyPassword 
 */
const signUp = async (email: string, password: string, verifyPassword: string) => {
  return axios.post(`${API_URL + apiVersion}/signup/email`, {
      email,
      password,
      verifyPassword
  });
}

/**
 * Log Out
 * 
 * @param userId 
 */
const logOut = async (userId: string) => {
  return axios.post(`${API_URL + apiVersion}/signout/email`, {
    userId
  });
}

/**
 * Get matches
 * 
 * @param userId User ID
 * @param token User token
 */
const getMatches = async (userId: string, token: string) => {
  return axios.get(`${API_URL + apiVersion}/discover/`, {
    headers: {
      "x-access-token": token,
      "content-type": "application/json"
    },
    params: {
      userId,
    }
  });
}

/**
 * Get user profile
 * 
 * @param userId User ID
 * @param token User token
 */
const getProfile = async (userId: string, token: string) => {
  return axios.get(`${API_URL + apiVersion}/profile/`, {
    headers: {
      "x-access-token": token,
      "content-type": "application/json"
    },
    params: {
      userId,
    }
  });
}

/**
 * Creates user profile
 * 
 * @param userId 
 * @param token 
 * @param name 
 * @param gender 
 * @param yearBorn 
 * @param age
 * @param sexuality
 * @param aboutMe
 * @param religion 
 * @param location 
 * @param hobbies 
 * @param photo 
 * 
 * When calling this function, use a then() and a 
 * catch() to get the response.
 */
const createProfile = async (
  userId: string,
  token: string,
  name: string,
  gender: string,
  age: number,
  yearBorn: number,
  aboutMe: string,
  religion: string,
  location: string,
  hobbies: string[],
  sexuality: string,
  photo: string,
) => {
  // call axios to the API
  return axios.post(`${API_URL + apiVersion}/profile/create`, {
    userId,
    token,
    name,
    gender,
    age,
    yearBorn,
    aboutMe,
    religion,
    location,
    hobbies,
    sexuality,
    photo
  });
}

/**
 * Updates user profile
 * 
 * @param userId 
 * @param token 
 * @param name 
 * @param age
 * @param gender 
 * @param yearBorn 
 * @param aboutMe
 * @param religion 
 * @param location 
 * @param hobbies 
 * @param photo
 * @param sexuality
 * 
 * When calling this function, use a then() and a 
 * catch() to get the response.
 */
const updateProfile = async (
  userId: string,
  token: string,
  name: string,
  gender: string,
  age: number,
  yearBorn: number,
  aboutMe: string,
  religion: string,
  location: string,
  hobbies: string[],
  sexuality: string,
  photo: string,
) => {
  // call axios to the API
  return axios.put(`${API_URL + apiVersion}/profile/update`, {
    userId,
    token,
    name,
    gender,
    age,
    yearBorn,
    aboutMe,
    religion,
    location,
    hobbies,
    sexuality,
    photo
  });
}

/**
 * Get user preferences
 * 
 * @param userId User ID
 * @param token User token
 */
const getPreferences = async (userId: string, token: string) => {
  return axios.get(`${API_URL + apiVersion}/preferences/`, {
    headers: {
      "x-access-token": token,
      "content-type": "application/json"
    },
    params: {
      userId,
    }
  });
}

/**
 * Creates user preferences
 * 
 * @param userId 
 * @param token
 * @param sexuality
 * @param maxDist
 * @param minAge
 * @param maxAge
 * @param religion
 * 
 * When calling this function, use a then() and a 
 * catch() to get the response.
 */
const createPreferences = async (
  userId: string,
  token: string,
  sexuality: string,
  maxDist: number,
  minAge: number,
  maxAge: number,
  religion: string,
) => {
  // call axios to the API
  return axios.post(`${API_URL + apiVersion}/preferences/create`, {
    userId,
    token,
    sexuality,
    maxDist,
    minAge,
    maxAge,
    religion
  });
}

/**
 * Updates user preferences
 * 
 * @param userId 
 * @param token
 * @param sexuality
 * @param maxDist
 * @param minAge
 * @param maxAge
 * @param religion
 * 
 * When calling this function, use a then() and a 
 * catch() to get the response.
 */
const updatePreferences = async (
  userId: string,
  token: string,
  sexuality: string,
  maxDist: number,
  minAge: number,
  maxAge: number,
  religion: string,
) => {
  // call axios to the API
  return axios.put(`${API_URL + apiVersion}/preferences/update`, {
    userId,
    token,
    sexuality,
    maxDist,
    minAge,
    maxAge,
    religion
  });
}

/**
 * Get user chats
 * 
 * @param userId User's ID
 * @param token Auth token
 */
const getUserChats = async (userId: string, token: string) => {
  return axios.get(`${API_URL + apiVersion}/chats`, {
    headers: {
      "x-access-token": token,
      "content-type": "application/json"
    },
    params: {
      userId,
    }
  });
}

/**
 * Create/Access user chats
 * 
 * @param userIds Array of userId's
 * @param token User's token
 */
const createChat = async (userId: string, matchedUserId: string, token: string) => {
  let userIds = [];
  userIds.push(matchedUserId, userId);
  console.log(userIds);
  
  return axios.post(`${API_URL + apiVersion}/chats`, { userIds, token });
}

/**
 * Send Message to Chat
 * 
 * @param userId User's ID
 * @param token User's token
 * @param content Content of sent message
 * @param chatId Chat ID to the message being sent
 */
const postMessage = async (
  userId: string,
  token: string,
  content: string,
  chatId: string
) => {
  return axios.post(`${API_URL + apiVersion}/messages`, {
    userId,
    token,
    content,
    chatId,
  });
}

/**
 * Get Messages in Chat
 * 
 * @param chatId Chat ID
 * @param token User's token
 */
const getMessages = async (chatId: string, token: string) => {
  return axios.get(`${API_URL + apiVersion}/messages`, {
    headers: {
      "x-access-token": token,
      "content-type": "application/json"
    },
    params: {
      chatId,
    }
  });
}

////////////////////
// SUBSCRIPTION APIs
////////////////////
/**
 * Get Subscription Plans
 * 
 * @param token User's token
 */
const getSubscription = async (token: string) => {
  return axios.get(`${API_URL + apiVersion}/subscription`, {
    headers: {
      "x-access-token": token,
      "content-type": "application/json"
    }
  });
}

/**
 * Updates user Subscription
 * 
 * @param userId 
 * @param token
 * @param _id
 * 
 */
 const updateSubscription = async (
  userId: string,
  planId: string,
  token: string,
) => {
  // call axios to the API
  return axios.post(`${API_URL + apiVersion}/subscription/subscribe`, {
    userId,
    planId,
    token,
  });
}

/**
 * Get User's Plans
 * 
 * @param token User's token
 * @param userId
 */
 const getmyPlan = async (userId: string, token: string) => {
  return axios.get(`${API_URL + apiVersion}/subscription/myPlan`, {
    headers: {
      "x-access-token": token,
      "content-type": "application/json"
    },
    params: {
      userId
    }
  });
}

/**
 * Cancel User's Subcription
 * 
 * @param userId User's Id
 * @param token User's token
 */
 const cancelSubscription = async (userId: string, token: string) => {
  return axios.post(`${API_URL + apiVersion}/subscription/cancel`, {
      userId,
      token
  });
}

export {
  logOut,
  signUp,
  getProfile,
  updateProfile,
  createProfile,
  getPreferences,
  createPreferences,
  updatePreferences,
  getMatches,
  getUserChats,
  createChat,
  getMessages,
  postMessage,
  getSubscription,
  updateSubscription,
  getmyPlan,
  cancelSubscription,
}
