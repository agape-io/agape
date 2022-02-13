/**
 * Landing Screen
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
  HomeNavigatorParamList,
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
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeNavigatorParamList, 'Test'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const TestPage:FC<TestPageProps> = ({ navigation }) => {
  const auth = useAuth();

  const userId = auth.authData.userId;
  const token = auth.authData.token;

  // Dummy test variables
  let testName = "Pyra"
  let testHobbies = ['Mythra', 'Hiking', 'Biking'];
  let testGender = "Female";
  let testYearBorn = 2022;
  let testAboutMe = "I'm in smash.";
  let testReligion = "Shintoism";
  let testLocation = "Japan";

  const testMatches = async () => {
    getMatches(userId, token).then(res => {
      console.log(res);
    }).catch(e => {
      console.log('something went wrong: ', e);
    })
    .then(() => {
        navigation.navigate('Test');
    });
  }

  const testProfile = async () => {
    getProfile(userId, token).then(res => {
      console.log(res);
    }).catch(e => {
      console.log('something went wrong: ', e);
    })
    .then(() => {
        navigation.navigate('Test');
    });
  }

  const testUpdateProfile = async (
    name: string,
    gender: string,
    yearBorn: number,
    aboutMe: string,
    religion: string,
    location: string,
    hobbies: string[]
  ) => {
    updateProfile(userId, token, name, gender, yearBorn, aboutMe, religion, location, hobbies)
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
    yearBorn: number,
    aboutMe: string,
    religion: string,
    location: string,
    hobbies: string[]
  ) => {
    createProfile(userId, token, name, gender, yearBorn, aboutMe, religion, location, hobbies)
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
      <TouchableOpacity onPress={() => testMatches()}>
        <Text>Test Get Matches</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => testProfile()}>
        <Text>Test Get Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => testUpdateProfile(testName,testGender, testYearBorn, testAboutMe, testReligion, testLocation, testHobbies)}>
        <Text>Test Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => testCreateProfile(testName,testGender, testYearBorn, testAboutMe, testReligion, testLocation, testHobbies)}>
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