/**
 * Index file for utils
 * 
 * API calls to the server
 */
import axios from 'axios';

// API
import { API_URL } from '@env';

/**
 * Get matches
 * 
 * @param userId 
 * @param token
 * 
 * When calling this function, use a then() and a 
 * catch() to get the response.
 */
const getMatches = async (userId: string, token: string) => {
  return axios.get(`${API_URL}/discover/`, {
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
 * @param userId 
 * @param token Needed to access routes
 * 
 * When calling this function, use a then() and a 
 * catch() to get the response.
 */
const getProfile = async (userId: string, token: string) => {
  return axios.get(`${API_URL}/profile/`, {
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
  return axios.post(`${API_URL}/profile/create`, {
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
  age: number,
  gender: string,
  yearBorn: number,
  aboutMe: string,
  religion: string,
  location: string,
  hobbies: string[],
  sexuality: string,
  photo: string,
) => {
  // call axios to the API
  return axios.post(`${API_URL}/profile/update`, {
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

export {
  getProfile,
  updateProfile,
  createProfile,
  getMatches
}
