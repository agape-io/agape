/**
 * Index file for utils
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const logOut = async (token: string) => {
  // get token and clear async storage
  if (token) {
    return AsyncStorage.removeItem('token');
  }
}

export {
  logOut
};