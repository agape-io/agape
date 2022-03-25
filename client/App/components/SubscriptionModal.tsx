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
import { RadioButton } from 'react-native-paper';
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

// Styles
import styles, { 
  PRIMARY_COLOR, 
  SECONDARY_COLOR, 
  GRAY, 
  WHITE
} from '../../assets/styles';

export interface SubscriptionModalProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Profile'>,
  NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const SubscriptionModal: FC<SubscriptionModalProps> = ({navigation}) => {
  const auth = useAuth();
  const [checked, setChecked] = React.useState('silver');
  const data = [
    {value: 'silver'},
    {value: 'gold'},
    {value: 'unlimited'},
  ];

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

          <Text style={styles.textTitles}>Select the plan that fits you:</Text>

          <View style={styles.subscriptionOptions}>
            <Text style={styles.textTitles}>Agape Silver</Text>
            <Text style={styles.textDescription}>- Get 15 more Likes per day.</Text>
            <Text style={styles.textDescription}>- Profile booster.</Text>
            <Text style={styles.textDescription}>- Customize location.</Text>
            <RadioButton
              value="silver"
              color={PRIMARY_COLOR}
              status={ checked === 'silver' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('silver')}
            />
          </View>

          <View style={styles.subscriptionOptions}>
            <Text style={styles.textTitles}>Agape Gold</Text>
            <Text style={styles.textDescription}>- Get 30 more Likes per day.</Text>
            <Text style={styles.textDescription}>- Customize location and others.</Text>
            <Text style={styles.textDescription}>- 50% less Ads.</Text>
            <RadioButton 
              value="gold"
              color={PRIMARY_COLOR}
              status={ checked === 'gold' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('gold')}
            />
          </View>

          <View style={styles.subscriptionOptions}>
            <Text style={styles.textTitles}>Agape Unlimited</Text>
            <Text style={styles.textDescription}>- Send as many Likes as you want.</Text>
            <Text style={styles.textDescription}>- Customize all the features.</Text>
            <Text style={styles.textDescription}>- Turn off Ads.</Text>
            <RadioButton 
              value="unlimited"
              color={PRIMARY_COLOR}
              status={ checked === 'unlimited' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('unlimited')}
            />
          </View>
        </View>

        <View style={styles.addSubscriptionButtonContainer}>
          <TouchableOpacity
            style={[styles.addSubscriptionButton, { backgroundColor: SECONDARY_COLOR }]}
          >
            <Text>Subscribe</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
  );
}

export default SubscriptionModal;