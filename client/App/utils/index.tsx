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
 * @param userId User ID
 * @param token User token
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
 * @param userId User ID
 * @param token User token
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
  return axios.put(`${API_URL}/profile/update`, {
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
 * Get user chats
 * 
 * @param userId User's ID
 * @param token Auth token
 */
const getUserChats = async (userId: string, token: string) => {
  return axios.get(`${API_URL}/chats`, {
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
  
  return axios.post(`${API_URL}/chats`, { userIds, token });
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
  return axios.post(`${API_URL}/messages`, {
    userId,
    token,
    content,
    chatId
  });
}

/**
 * Get Messages in Chat
 * 
 * @param chatId Chat ID
 * @param token User's token
 */
const getMessages = async (chatId: string, token: string) => {
  return axios.get(`${API_URL}/messages`, {
    headers: {
      "x-access-token": token,
      "content-type": "application/json"
    },
    params: {
      chatId,
    }
  });
}

/**
 * Send Notifications
 * 
 * @param userId 
 * @param chatId 
 * @param token 
 */
const postNotification = async(userId: string, chatId: string, text: string,token: string) => {
  return axios.post(`${API_URL}/notifcation`, {
    chatId, userId, text, token
  });
}

/**
 * Get User Notifications
 * 
 * Checks whether or not the notifs are read
 * 
 * @param userId 
 * @param token 
 * 
 * @returns notification id
 */
const getNotifications = async(userId: string, token: string) => {
  return axios.get(`${API_URL}/notification`, {
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
 * Notification is read
 * 
 * @param notificationId 
 * @param token 
 */
const isReadNotification = async (notificationId: string, token: string) => {
  return axios.put(`${API_URL}/notification/read`, {
    notificationId,
    token
  });
}
 
export {
  getProfile,
  updateProfile,
  createProfile,
  getMatches,
  getUserChats,
  createChat,
  getMessages,
  postMessage,
  postNotification,
  getNotifications,
  isReadNotification
}