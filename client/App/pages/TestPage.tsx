/**
 * Test Screen
 */
// Libraries
import React, { FC } from 'react';
import {
  View,
  Text, 
  TouchableOpacity
} from 'react-native';

// Types
import { TestPageProps } from '../types';

// API
import { useAuth } from '../context';
import {
  getMatches,
  getProfile,
  createProfile,
  updateProfile,
  updatePreferences,
  getPreferences,
  createPreferences
} from '../utils';


const TestPage:FC<TestPageProps> = ({ navigation }) => {
  const auth = useAuth();
  const { userId, token } = auth.authData;

  // Dummy test variables
  let testName = "Erwin"
  let testHobbies = ['Titans', 'Hiking', 'Skiing'];
  let testSexuality = "Straight";
  let testAge = 32;
  let testPhoto = "https://static.wikia.nocookie.net/shingekinokyojin/images/d/de/Erwin_Smith_%28Anime%29_character_image.png/"
  let testGender = "Male";
  let testYearBorn = 1974;
  let testAboutMe = "Where's Hange? Levi?";
  let testReligion = "Walls";
  let testLocation = "Paradis";
  let testMaxDist = 10;
  let testMinAge = 18;
  let testMaxAge = 40;

  const testMatches = async () => {
    getMatches(userId, token).then(res => {
      console.log(res.data);
    }).catch(e => {
      console.error('something went wrong: ', e.response.data.message);
    })
    .then(() => navigation.navigate('Test'));
  }

  const testPreferences = async () => {
    getPreferences(userId, token).then(res => {
      console.log(res.data);
    }).catch(e => {
      console.error('Something went wrong: ', e.response.data.message);
    })
    .then(() => navigation.navigate('Test'));
  }

  const testProfile = async () => {
    getProfile(userId, token).then(res => {
      console.log(res.data);
    }).catch(e => {
      console.error('something went wrong: ', e.response.data.message);
    })
    .then(() => navigation.navigate('Test'));
  }

  const testUpdateProfile = async (
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
    updateProfile(userId, token, name, gender, age, yearBorn, aboutMe, religion, location, hobbies, sexuality, photo)
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.error('something went wrong: ', e.response.data.message);
      })
      .then(() => navigation.navigate('Test'));
  }

  const testCreatePreference = async (
    sexuality: string,
    maxDist: number,
    minAge: number,
    maxAge: number,
    religion: string
  ) => {
    createPreferences(userId, token, sexuality, maxDist, minAge, maxAge, religion)
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.error('something went wrong: ', e.response.data.message);
      })
      .then(() => {
          navigation.navigate('Test');
      });
  }

  const testUpdatePreference = async (
    sexuality: string,
    maxDist: number,
    minAge: number,
    maxAge: number,
    religion: string
  ) => {
    updatePreferences(userId, token, sexuality, maxDist, minAge, maxAge, religion)
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.error('something went wrong: ', e.response.data.message);
      })
      .then(() => {
          navigation.navigate('Test');
      });
  }

  const testCreateProfile = async (
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
    createProfile(userId, token, name, gender, age, yearBorn, aboutMe, religion, location, hobbies, sexuality, photo)
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.error('something went wrong: ', e.response.data.message);
      })
      .then(() => {
          navigation.navigate('Test');
      });
  }

  const signOut = async () => {
    auth.signOut()
      .then(() => {
        navigation.navigate("Auth", { screen: "SignIn" });
      });
  };
  
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>Test API calls here!</Text>
      <TouchableOpacity onPress={() => testMatches()}>
        <Text>Test Get Matches</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => testProfile()}>
        <Text>Test Get Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => testUpdateProfile(testName, testGender, testAge, testYearBorn, testAboutMe, testReligion, testLocation, testHobbies, testSexuality, testPhoto)}>
        <Text>Test Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => testCreateProfile(testName, testGender, testAge, testYearBorn, testAboutMe, testReligion, testLocation, testHobbies, testSexuality, testPhoto)}>
        <Text>Test Create Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => testPreferences()}>
        <Text>Test Get Preferences</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => testUpdatePreference(testSexuality, testMaxDist, testMinAge, testMaxAge, testReligion)}>
        <Text>Test Update Preference</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => testCreatePreference(testSexuality, testMaxDist, testMinAge, testMaxAge, testReligion)}>
        <Text>Test Create Preference</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => signOut()}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TestPage;