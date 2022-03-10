import React, {
  FC,
  useState,
  useLayoutEffect,
  useEffect,
  useRef
} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
  ScrollView,
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
import { CLOUDINARY_API_URL, API_URL } from '@env';

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
  const [cloudinaryUrl, getCloudinaryUrl] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [religion, setReligion] = useState<string>('');
  const [preference, setPreference] = useState<string>('');
  const [userAge, setUserAge] = useState<string>('');
  const [yearBorn, setYearBorn] = useState<string>('');

  // these hobbies will be pushed to an array for the API to retrieve
  const [firstHobby, setFirstHobby] = useState<string>('');
  const [secondHobby, setSecondHobby] = useState<string>('');
  const [thirdHobby, setThirdHobby] = useState<string>('');
  const isMounted = useRef<any>(null);

  const token = auth.authData.token,
    userId = auth.authData.userId;

  const uploadPhoto = async () => {
    setLoading(true);
    
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required.");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    let base64img = `data:image/jpg;base64,${pickerResult.base64}`;
    // set the photo

    console.log('picker', pickerResult.uri);

    setPhoto(pickerResult.uri);
    let data = {
      "file": base64img,
      "upload_preset": "agape-app"
    };

    axios.post(CLOUDINARY_API_URL, data)
      .then(async (res: any) => {
        setLoading(false);
        const { secure_url } = res.data;
        console.log(res.data.secure_url);
        console.log('cloudinary', secure_url);
        // save the cloudinary url
        getCloudinaryUrl(secure_url);
        return res.secure_url;
      })
      .catch((e: any) => {
        setLoading(true);

        alert(e.message);
      });
  }

  const checkForCameraRollPermissions = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
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

  const handleUpdateProfile = async (
    token: string,
    userId: string,
    name: string,
    age: number,
    gender: string,
    yearBorn: number,
    aboutMe: string,
    religion: string,
    location: string,
    hobbies: string[],
    sexuality: string,
    photo: string
  ) => {
    return updateProfile(
      token,
      userId,
      name,
      age,
      gender,
      yearBorn,
      aboutMe,
      religion,
      location,
      hobbies,
      sexuality,
      photo)
      .then(() => {
        // Go back to profile screen
        setLoading(false);

        navigation.navigate('Profile');
      }).catch((e: any) => {
        console.log(e);
        alert(e.message);
      })
      .finally(() => {
        if (isMounted.current) setLoading(false);
      });
  }

  const handleCreateProfile = async (
    userId: string,
    token: string,
    name: string,
    age: number,
    gender: string,
    yearBorn: number,
    aboutMe: string,
    religion: string,
    location: string,
    hobbies: string[],
    sexuality: string,
    photo: string
  ) => {
    console.log(userId, token);
    return createProfile(
      userId,
      token,
      name,
      age,
      gender,
      yearBorn,
      aboutMe,
      religion,
      location,
      hobbies,
      sexuality,
      photo
    )
      .then(() => {
        // Go back to profile screen
        setLoading(false);
        alert('Success!');
        navigation.navigate('Profile');
      }).catch((e: any) => {
        console.log(e);
        alert(e.message);
      })
      .finally(() => {
        if (isMounted.current) setLoading(false);
      });
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

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);
  
  return (
    <ScrollView contentContainerStyle={styles.modalContainer}>
      <View style={styles.modalPhotoContainer}>
        {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
        <View style={styles.uploadBtnContainer}>
          <TouchableOpacity onPress={uploadPhoto} style={styles.uploadBtn}>
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
          placeholder='Gender'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={gender}
          onChangeText={gender => setGender(gender)}
        />
        <TextInput
          style={styles.input}
          placeholder='About Me'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={aboutMe}
          onChangeText={aboutMe => setAboutMe(aboutMe)}
        />
        <TextInput
          style={styles.input}
          placeholder='Age'
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="numeric"
          textContentType="none"
          value={userAge}
          onChangeText={userAge => setUserAge(userAge)}
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
        <TouchableOpacity
          style={[styles.addProfileButton, { backgroundColor: SECONDARY_COLOR }]}
          onPress={() => handleUpdateProfile(token, userId, name, userAge, gender, yearBorn, aboutMe, religion, location, [firstHobby, secondHobby, thirdHobby], preference, cloudinaryUrl)}>
          <Text>Create Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addProfileButton, { backgroundColor: PRIMARY_COLOR }]}
          onPress={() => handleUpdateProfile(token, userId, name, userAge, gender, yearBorn, aboutMe, religion, location, [firstHobby, secondHobby, thirdHobby], preference, cloudinaryUrl)}>
          <Text>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default ProfileModal;