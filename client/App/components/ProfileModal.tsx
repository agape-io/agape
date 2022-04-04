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
  TextInput,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { ProfileModalProps } from '../types';
import { useAuth } from '../context';

// API's
import {
  updateProfile,
  getProfile,
  getPreferences,
  updatePreferences
} from '../utils';
import { CLOUDINARY_API_URL } from '@env';

// Styles
import styles, { PRIMARY_COLOR } from '../../assets/styles';

// Cancel Button for header
const CancelButton = ({ onPress }:any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons name="arrow-left" size={26} color="black" />
    </TouchableOpacity>
  );
}

const ProfileModal: FC<ProfileModalProps> = ({navigation}) => {
  const auth = useAuth();

  // hide create profile button if profile is already available
  const [profile, hasProfile] = useState<any>();
  const [preferences, hasPreferences] = useState<any>();
  const [photo, setPhoto] = useState<any>(null);
  const [cloudinary, getCloudinary] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [maxDist, setMaxDist] = useState<string>('');
  const [minAge, setMinAge] = useState<string>('');
  const [maxAge, setMaxAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [religion, setReligion] = useState<string>('');
  const [preference, setPreference] = useState<string>('');
  const [userAge, setUserAge] = useState<string>('');
  const [yearBorn, setYearBorn] = useState<string>('');
  const [firstHobby, setFirstHobby] = useState<string>('');
  const [secondHobby, setSecondHobby] = useState<string>('');
  const [thirdHobby, setThirdHobby] = useState<string>('');
  const isMounted = useRef<any>(null);

  const { userId, token } = auth.authData;

  const getUserProfile = () => {
    getProfile(userId, token)
      .then((res: any) => {
        const { profile } = res.data;
          
        setPhoto(profile.photo);

        // check if profile exists
        hasProfile(profile);
      })
      .catch((e: any) => {
        console.error(e.message);
      });
  }

  const getUserPreferences = () => {
    getPreferences(userId, token)
      .then((res: any) => {
        const { preferences } = res.data;

        hasPreferences(preferences);
      })
      .catch((e: any) => {
        console.error(e.message);
      });
  }

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
      quality: 0.5
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    let base64img = `data:image/jpg;base64,${pickerResult.base64}`;

    // Set photo for modal
    setPhoto(pickerResult.uri);

    let data = {
      "file": base64img,
      "upload_preset": "agape-app"
    };

    axios.post(CLOUDINARY_API_URL, data)
      .then(async (res: any) => {
        setLoading(false);
        const { secure_url } = res.data;
      
        // save the cloudinary url
        getCloudinary(secure_url);
        return secure_url;
      })
      .catch((e: any) => {
        setLoading(true);

        alert(e.message);
      });
  }

  // Update Profile
  const handleUpdateProfile = async (
    name: string,
    gender: string,
    age: string,
    yearBorn: string,
    aboutMe: string,
    religion: string,
    location: string,
    maxDist: string,
    minAge: string,
    maxAge: string,
    hobbies: string[],
    sexuality: string,
    photo: string,
  ) => {
    // Convert strings to integers
    let convertAge = parseInt(age),
      convertYearBorn = parseInt(yearBorn),
      convertMaxDist = parseInt(maxDist),
      convertMinAge = parseInt(minAge),
      convertMaxAge = parseInt(maxAge);
    
    return updateProfile(
      userId,
      token,
      name,
      gender,
      convertAge,
      convertYearBorn,
      aboutMe,
      religion,
      location,
      hobbies,
      sexuality,
      photo)
      .then(() => {
        // Update preferences
        updatePreferences(userId, token, sexuality, convertMaxDist, convertMinAge, convertMaxAge, religion)
          .then((res: any) => {
            // Go back to Profile Screen
            setLoading(false);

            alert('Profile and Preferences Updated!');
            navigation.navigate('Profile');
          })
          .catch((e: any) => {
            console.error(e.messaeg);
          })
      })
      .catch((e: any) => {
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

  // Persist profile data
  useEffect(() => {
    getUserProfile();
    getUserPreferences();

    return () => {
      // cleanup
      hasProfile(null);
      hasPreferences(null);
    }
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
          placeholder="Name"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="name"
          value={name}
          onChangeText={name => setName(name)}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={gender}
          onChangeText={gender => setGender(gender)}
        />
        <TextInput
          style={styles.input}
          placeholder="About Me"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={aboutMe}
          onChangeText={aboutMe => setAboutMe(aboutMe)}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="numeric"
          textContentType="none"
          value={userAge}
          onChangeText={userAge => setUserAge(userAge)}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="numeric"
          textContentType="none"
          value={yearBorn}
          onChangeText={yearBorn => setYearBorn(yearBorn)}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={location}
          onChangeText={location => setLocation(location)}
        />
        <TextInput
          style={styles.input}
          placeholder="Religion"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          value={religion}
          onChangeText={religion => setReligion(religion)}
        />
        <TextInput
          style={styles.input}
          placeholder="Hobby 1"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={firstHobby}
          onChangeText={firstHobby => setFirstHobby(firstHobby)}
        />
        <TextInput
          style={styles.input}
          placeholder="Hobby 2"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={secondHobby}
          onChangeText={secondHobby => setSecondHobby(secondHobby)}
        />
        <TextInput
          style={styles.input}
          placeholder="Hobby 3"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={thirdHobby}
          onChangeText={thirdHobby => setThirdHobby(thirdHobby)}
        />
        <TextInput
          style={styles.input}
          placeholder="Max Distance from you"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="numeric"
          textContentType="none"
          value={maxDist}
          onChangeText={maxDist => setMaxDist(maxDist)}
        />
        <TextInput
          style={styles.input}
          placeholder="Minimum Age for Match"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="numeric"
          textContentType="none"
          value={minAge}
          onChangeText={minAge => setMinAge(minAge)}
        />
        <TextInput
          style={styles.input}
          placeholder="Maximum Age for Match"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="numeric"
          textContentType="none"
          value={maxAge}
          onChangeText={maxAge => setMaxAge(maxAge)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sexuality"
          placeholderTextColor="#b1b1b1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="none"
          value={preference}
          onChangeText={preference => setPreference(preference)}
        />
      </View>
      <View style={styles.addProfileButtonContainer}>
        <TouchableOpacity
          style={[styles.addProfileButton, { backgroundColor: PRIMARY_COLOR }]}
          onPress={() => handleUpdateProfile(
            name,
            gender,
            userAge,
            yearBorn,
            aboutMe,
            religion,
            location,
            maxDist,
            minAge,
            maxAge,
            [firstHobby, secondHobby, thirdHobby],
            preference,
            cloudinary)}>
          <Text>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default ProfileModal;