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
  ImageBackground,
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
import { useAuth } from '../context';
import { Icon, ProfileItem } from "../components";

// API's
import {
  updateProfile,
  getProfile
} from '../utils';
import { CLOUDINARY_API_URL } from '@env';

// Styles
import styles, { PRIMARY_COLOR, SECONDARY_COLOR, GRAY } from '../../assets/styles';

export interface SubscriptionModalProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Profile'>,
  NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const SubscriptionModal: FC<SubscriptionModalProps> = ({navigation}) => {
  const auth = useAuth();

  // hide create profile button if profile is already available
  const [name, setName] = useState<string>('');
  const { userId, token } = auth.authData;



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
      <ScrollView contentContainerStyle={styles.modalContainer}>
        
        <View style={styles.subscriptionContainer}>
          <View style={styles.subscriptionOptions}>
            <Text style={styles.textTitles}>Silver Subscription</Text>
          </View>

          <View style={styles.subscriptionOptions}>
            <Text style={styles.textTitles}>Gold Subscription</Text>
          </View>

          <View style={styles.subscriptionOptions}>
            <Text style={styles.textTitles}>Unlimited Subscription</Text>
          </View>
        </View>

        <View style={styles.addProfileButtonContainer}>
          <TouchableOpacity
            style={[styles.addProfileButton, { backgroundColor: SECONDARY_COLOR }]}
          >
            <Text>Subscribe</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
  );
}

export default SubscriptionModal;