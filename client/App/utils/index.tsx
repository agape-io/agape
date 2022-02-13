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
 */
const getMatches = (userId: string, token: string) => {

}
//36bc02de-6183-44d8-9166-9a5002418ac2

/**
 * Get user profile
 * 
 * @param userId 
 * @param token
 */
const getProfile = (userId: string, token: string) => {
  axios.get(`${API_URL}/`)
}

/**
 * Creates user profile
 * 
 * @param userId 
 * @param token
 * @param name 
 * @param gender 
 * @param yearBorn 
 * @param religion 
 * @param location 
 * @param hobbies 
 */
const createProfile = (
  userId: string,
  token: string,
  name: string,
  gender: string,
  yearBorn: number,
  religion: string,
  location: string,
  hobbies: [],
) => {
  // call axios to the API
}

/**
 * Updates user profile
 * 
 * @param userId 
 * @param token
 * @param name 
 * @param gender 
 * @param yearBorn 
 * @param religion 
 * @param location 
 * @param hobbies 
 */
const updateProfile = (
  userId: string,
  token: string,
  name: string,
  gender: string,
  yearBorn: number,
  religion: string,
  location: string,
  hobbies: [],
) => {
  // call axios to the API
}


export {
  getProfile,
  updateProfile,
  createProfile,
  getMatches
}
