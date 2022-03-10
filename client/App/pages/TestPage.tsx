/**
 * Test Screen
 */
import React, { FC } from 'react';
import {
  View,
  Text, 
  TouchableOpacity
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';

// Types
import {
  HomeTabNavigatorParamList,
  RootNavigatorParamsList
} from '../types';

// API
import { useAuth } from '../navigation';
import {
  getMatches,
  getProfile,
  createProfile,
  updateProfile
} from '../utils';

export interface TestPageProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Test'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const TestPage:FC<TestPageProps> = ({ navigation }) => {
  const auth = useAuth();

  const userId = auth.authData.userId;
  const token = auth.authData.token;

  // Dummy test variables
  let testName = "Erwin"
  let testHobbies = ['Titans', 'Hiking', 'Biking'];
  let testSexuality = "Straight";
  let testAge = 32;
  let testPhoto = "https://static.wikia.nocookie.net/shingekinokyojin/images/d/de/Erwin_Smith_%28Anime%29_character_image.png/"
  let testGender = "Male";
  let testYearBorn = 1974;
  let testAboutMe = "Where's Hange?.";
  let testReligion = "The Walls";
  let testLocation = "Paradis";

  const testMatches = async () => {
    getMatches(userId, token).then(res => {
      console.log(res.data);
    }).catch(e => {
      console.log('something went wrong: ', e.response.data);
    })
    .then(() => {
        navigation.navigate('Test');
    });
  }

  const testProfile = async () => {
    getProfile(userId, token).then(res => {
      console.log(res.data);
    }).catch(e => {
      console.log('something went wrong: ', e.response.data);
    })
    .then(() => {
        navigation.navigate('Test');
    });
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
    updateProfile(userId, name, gender, age, yearBorn, aboutMe, religion, location, hobbies, sexuality, photo)
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log('something went wrong: ', e);
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
    createProfile(userId, name, gender, age, yearBorn, aboutMe, religion, location, hobbies, sexuality, photo)
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log('something went wrong: ', e);
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
      <Text>This is a TEST page</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
          <Text>Go to Discover Page</Text>
      </TouchableOpacity>
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
      <TouchableOpacity
        onPress={() => signOut()}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TestPage;