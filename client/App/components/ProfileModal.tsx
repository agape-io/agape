import React, {
  FC,
  useState,
  useLayoutEffect,
  useEffect
} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
  ScrollView
} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  HomeTabNavigatorParamList,
  RootNavigatorParamsList
} from '../types';
import { useAuth } from '../navigation';

// API's
import {
  updateProfile,
  createProfile
} from '../utils';
import { CLOUDINARY_URL_UPLOAD, API_URL } from '@env';

// Styles
import styles, {
  PRIMARY_COLOR,
  SECONDARY_COLOR
} from '../../assets/styles';

//  https://www.reactnativeschool.com/how-to-upload-images-from-react-native
// https://www.waldo.com/blog/add-an-image-picker-react-native-app

export interface ProfileModalProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Discover'>,
  NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const ProfileModal: FC<ProfileModalProps> = ({navigation}) => {
  const auth = useAuth();

  // hide create profile button if profile is already available
  const [profile, hasProfile] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [religion, setReligion] = useState<string>('');
  const [preference, setPreference] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [yearBorn, setYearBorn] = useState<string>('');
  // these hobbies will be pushed to an array for the API to retrieve
  const [firstHobby, setFirstHobby] = useState<string>('');
  const [secondHobby, setSecondHobby] = useState<string>('');
  const [thirdHobby, setThirdHobby] = useState<string>('');

  const token = auth.authData.token,
    userId = auth.authData.userId;

  const addPhoto = async () => {
    let _photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(_photo);

    // upload photo to database and profile
    return _photo;
  }

  const handleCreateProfile = (
    userId: string,
    token: string,
    name: string,
    gender: string,
    age: number,
    yearBorn: number,
    aboutMe: string,
    religion: string,
    location: string,
    sexuality: string,
    hobbies: string[],
    photo: any,
  ) => {

  }

  const handleUpdateProfile = (
    userId: string,
    token: string,
    name: string,
    gender: string,
    age: number,
    yearBorn: number,
    aboutMe: string,
    religion: string,
    location: string,
    sexuality: string,
    hobbies: string[],
    photo: any,
  ) => {
    
  }
    

  const checkForCameraRollPermissions = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert("Pleaase grant camera roll permissions inside your system's settings");
    } else {
      console.log('Media permissions are granted'); 
    }
  }

  // Cancel Button for header
  const CancelButton = ({ onPress }:any) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons name="arrow-left" size={26} color="black" />
      </TouchableOpacity>
    );
  }

  // Header button initialization
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CancelButton onPress={navigation.goBack} />
      )
    })
  }, [navigation]);

  // Checking permissions
  useEffect(() => {
    checkForCameraRollPermissions();
  }, []);

  // upload data to db
  useEffect(() => {

  });
  
  return (
    <ScrollView contentContainerStyle={styles.modalContainer}>
      <View style={styles.modalPhotoContainer}>
        {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
        <View style={styles.uploadBtnContainer}>
          <TouchableOpacity onPress={addPhoto} style={styles.uploadBtn}>
            <Text>{photo ? 'Edit' : 'Upload'}</Text>
            <MaterialCommunityIcons name="camera" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.form, { marginTop: -30}]}>
        <TextInput
          style={styles.input}
          placeholder='Name'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="name"
          value={name}
          onChangeText={name => setName(name)}
        />
        <TextInput
          style={styles.input}
          placeholder='About Me'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={description}
          onChangeText={description => setDescription(description)}
        />
        <TextInput
          style={styles.input}
          placeholder='Age'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="numeric"
          textContentType="none"
          value={age}
          onChangeText={age => setAge(age)}
        />
        <TextInput
          style={styles.input}
          placeholder='Year'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="numeric"
          textContentType="none"
          value={yearBorn}
          onChangeText={yearBorn => setYearBorn(yearBorn)}
        />
        <TextInput
          style={styles.input}
          placeholder='Location'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={location}
          onChangeText={location => setLocation(location)}
        />
        <TextInput
          style={styles.input}
          placeholder='Religion'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          value={religion}
          onChangeText={religion => setReligion(religion)}
        />
        <TextInput
          style={styles.input}
          placeholder='Hobby 1'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={firstHobby}
          onChangeText={firstHobby => setFirstHobby(firstHobby)}
        />
        <TextInput
          style={styles.input}
          placeholder='Hobby 2'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={secondHobby}
          onChangeText={secondHobby => setSecondHobby(secondHobby)}
        />
        <TextInput
          style={styles.input}
          placeholder='Hobby 3'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={thirdHobby}
          onChangeText={thirdHobby => setThirdHobby(thirdHobby)}
        />
        <TextInput
          style={styles.input}
          placeholder='Sexuality'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={preference}
          onChangeText={preference => setPreference(preference)}
        />
      </View>
      <View style={styles.addProfileButtonContainer}>
        {/** Hide Create Profile Button if Profile Exists */}
        <TouchableOpacity style={[styles.addProfileButton, {backgroundColor: SECONDARY_COLOR}]} onPress={() => console.log('Create Profile here!')}>
          <Text>Create Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.addProfileButton, {backgroundColor: PRIMARY_COLOR}]} onPress={() => console.log('Create Profile here!')}>
          <Text>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default ProfileModal;