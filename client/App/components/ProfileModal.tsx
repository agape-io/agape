import React, { FC, useState } from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';

// API's
import { updateProfile, createProfile } from '../utils';
import { CLOUDINARY_URL_UPLOAD, API_URL } from '@env';

// Styles
import styles from '../../assets/styles';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  HomeNavigatorParamList,
  RootNavigatorParamsList
} from '../types';

//  https://www.reactnativeschool.com/how-to-upload-images-from-react-native

export interface ProfileModalProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeNavigatorParamList, 'Discover'>,
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

  const handlePhoto = (picture: any) => {
    
  }

  // const NewProfileModal = (props: any) => {

  //   return (
  //     <Modal
  //       transparent={props.transparent}
  //       visible={props.visible}
  //       onRequestClose={props.onRequestClose}
  //     >
  //        <View style={styles.profileCenteredView}>
  //         <View style={styles.profileModalView}>
  //           <Text style={styles.profileModalText}>New Profile</Text>
  //           <TouchableOpacity
  //             style={[styles.profileButton, styles.profileButtonClose]}
  //             onPress={props.onPress}
  //           >
  //             <Text style={styles.profileTextStyle}>Hide Modal New</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // }

  // const UpdateProfileModal = (props: any) => {

  //   return (
  //     <Modal
  //       transparent={props.transparent}
  //       visible={props.visible}
  //       onRequestClose={props.onRequestClose}
  //     >
  //       <View style={styles.profileCenteredView}>
  //         <View style={styles.profileModalView}>
  //           <Text style={styles.profileModalText}>Update Profile</Text>
  //           <TouchableOpacity
  //             style={[styles.profileButton, styles.profileButtonClose]}
  //             onPress={props.onPress}
  //           >
  //             <Text style={styles.profileTextStyle}>Hide Modal Update</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </Modal>
  //   )
  // }
  
  return (
    <View style={styles.profileCenteredView}>
      
    </View>
  );
}

export default ProfileModal;

