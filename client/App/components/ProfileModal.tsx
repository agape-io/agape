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
  TextInput
} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';


// API's
import {
  updateProfile,
  createProfile
} from '../utils';
import { CLOUDINARY_URL_UPLOAD, API_URL } from '@env';

// Styles
import styles from '../../assets/styles';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  HomeTabNavigatorParamList,
  RootNavigatorParamsList
} from '../types';

//  https://www.reactnativeschool.com/how-to-upload-images-from-react-native
// https://www.waldo.com/blog/add-an-image-picker-react-native-app

export interface ProfileModalProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Discover'>,
  NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const ProfileModal: FC<ProfileModalProps> = ({navigation}) => {

  // hide create profile button
  const [profile, hasProfile] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [religion, setReligion] = useState<string>('');
  const [preference, setPreference] = useState<string>('');
  const [hobbies, setHobbies] = useState<any>(null);
  const [age, setAge] = useState<string>('');
  const [yearBorn, setYearBorn] = useState<string>('');

  // const

  // create profile

  // update profile


  const createFormData = (photo: any, body: {}) => {
    // const data = new FormData();

    // data.append('photo', {
    //   name: photo.fileName,
    //   type: photo.type,
    //   uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    // });

    // Object.keys(body).forEach((key: any) => {
    //   data.append(key, body[key]);
    // });

    // return data;
  }

  const addPhoto = async () => {
    let _photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // upload photo to database and profile
    return _photo;
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
    <View style={styles.modalContainer}>
      <View style={styles.modalPhotoContainer}>
        {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
        <View style={styles.uploadBtnContainer}>
        <TouchableOpacity onPress={addPhoto} style={styles.uploadBtn}>
          <Text>{photo ? 'Edit' : 'Upload'}</Text>
          <MaterialCommunityIcons name="camera" size={26} color="black" />
        </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.form, { marginTop: -25}]}>
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
            placeholder='Year Born'
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
            placeholder='Sexuality'
            placeholderTextColor="#b1b1b1"
            returnKeyType="next"
            keyboardType="default"
            textContentType="none"
            value={preference}
            onChangeText={preference => setPreference(preference)}
          />
        </View>
    </View>
  );
}

export default ProfileModal;