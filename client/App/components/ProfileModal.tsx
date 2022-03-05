import React, {
  FC,
  useState,
  useLayoutEffect
} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
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
    </View>
  );
}

export default ProfileModal;