import React, {
  FC,
  useState,
  useLayoutEffect,
  useEffect,
  useRef
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileModalProps } from '../types';
import { useAuth } from '../context';

// API's
import {
  getSubscription,
  createSubscription,
  updateSubscription,
  subscribeSubscription,
  getPlans,
  cancelSubscription,
} from '../utils';
import { CLOUDINARY_API_URL } from '@env';

// Styles
import styles, { 
  PRIMARY_COLOR, 
  SECONDARY_COLOR
} from '../../assets/styles';

 // Cancel Button for header
 const CancelButton = ({ onPress }:any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons name="arrow-left" size={26} color="black" />
    </TouchableOpacity>
  );
}

const SubscriptionModal: FC<ProfileModalProps> = ({navigation}) => {
  const auth = useAuth();

  const [checked, setChecked] = React.useState('basic');
  const [plans, hasPlans] = useState<any>([""]);
  // const isMounted = useRef<any>(null);
  const data = [
    {
      name: 'Supporter',
      color: 'pink',
      value: 'basic'
    },
    {
      name: 'Storge',
      color: 'silver',
      value: 'premium'
    },
    {
      name: 'Phillia',
      color: 'gold',
      value: 'elite'
    },
  ];

  const { userId, token } = auth.authData;

  const getSubscriptionPlans = () => {
    getSubscription(token)
      .then((res: any) => {
        const { plans } = res.data;

        //check if plans exists
        hasPlans(plans);
        console.log("plans: " + plans);
      })
      .catch((e: any) => {
        console.error(e.response.data.message);
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


  return (
      <ScrollView contentContainerStyle={styles.modalContainer}>
     
        <View style={styles.subscriptionContainer}>

          <Text style={styles.textTitles}>Select the plan that fits you:</Text>

          <View style={styles.subscriptionOptions}>
            <Text style={styles.textTitles}>Supporter</Text>
            <Text style={styles.textDescription}>- Get 15 more Likes per day.</Text>
            <Text style={styles.textDescription}>- Profile booster.</Text>
            <Text style={styles.textDescription}>- Customize location.</Text>
            <RadioButton
              value="basic"
              color={PRIMARY_COLOR}
              status={ checked === 'basic' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('basic')}
            />
          </View>

          <View style={styles.subscriptionOptions}>
            <Text style={styles.textTitles}>Storge</Text>
            <Text style={styles.textDescription}>- Get 30 more Likes per day.</Text>
            <Text style={styles.textDescription}>- Customize location and others.</Text>
            <Text style={styles.textDescription}>- 50% less Ads.</Text>
            <RadioButton 
              value="premium"
              color={PRIMARY_COLOR}
              status={ checked === 'premium' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('premium')}
            />
          </View>
        
          <View style={styles.subscriptionOptions}>
            <Text style={styles.textTitles}>Phillia</Text>
            <Text style={styles.textDescription}>- Send as many Likes as you want.</Text>
            <Text style={styles.textDescription}>- Customize all the features.</Text>
            <Text style={styles.textDescription}>- Turn off Ads.</Text>
            <RadioButton 
              value="elite"
              color={PRIMARY_COLOR}
              status={ checked === 'elite' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('elite')}
            />
          </View>
        </View>

        <View style={styles.addSubscriptionButtonContainer}>
          <TouchableOpacity
            style={[styles.addSubscriptionButton, { backgroundColor: SECONDARY_COLOR }]}
            // onPress={() => handleSubscription()}>
          >
            <Text>Subscribe</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
  );
}

export default SubscriptionModal;