import React, { FC, useState } from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';

// API's
import { updateProfile, createProfile } from '../utils';

// Styles
import styles from '../../assets/styles';

//  https://www.reactnativeschool.com/how-to-upload-images-from-react-native

const ProfileModal: FC<any> = ({navigation}, props:any) => {

  // hide create profile button
  const [profile, hasProfile] = useState<boolean>(false);
  // const

  // create profile

  // update profile

  // handle photo
  const handlePhoto = () => {

  }

  const NewProfileModal = (props: any) => {

    return (
      <Modal
        transparent={props.transparent}
        visible={props.visible}
        onRequestClose={props.onRequestClose}
      >
         <View style={styles.profileCenteredView}>
          <View style={styles.profileModalView}>
            <Text style={styles.profileModalText}>New Profile</Text>
            <TouchableOpacity
              style={[styles.profileButton, styles.profileButtonClose]}
              onPress={props.onPress}
            >
              <Text style={styles.profileTextStyle}>Hide Modal New</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  const UpdateProfileModal = (props: any) => {

    return (
      <Modal
        transparent={props.transparent}
        visible={props.visible}
        onRequestClose={props.onRequestClose}
      >
        <View style={styles.profileCenteredView}>
          <View style={styles.profileModalView}>
            <Text style={styles.profileModalText}>Update Profile</Text>
            <TouchableOpacity
              style={[styles.profileButton, styles.profileButtonClose]}
              onPress={props.onPress}
            >
              <Text style={styles.profileTextStyle}>Hide Modal Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
  
  return (
    <View style={styles.profileCenteredView}>
      {
        profile ?
          <UpdateProfileModal
            transparent={props.transparent}
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            onPress={props.onPress}
          />
          :
          <NewProfileModal
            transparent={props.transparent}
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            onPress={props.onPress}
          />
      }
    </View>
  );
}

export default ProfileModal;

