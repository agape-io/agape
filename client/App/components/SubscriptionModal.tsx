/**
 * Subscription Modal Component
 */
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
  ScrollView,
  Alert
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SubscriptionItem } from './index';
import { ProfileModalProps } from '../types';
import { useAuth } from '../context';

// API's
import {
  getSubscription,
  getmyPlan,
  updateSubscription,
  cancelSubscription,
} from '../utils';

// Styles
import styles, { 
  PRIMARY_COLOR, 
  SECONDARY_COLOR,
  WHITE
} from '../../assets/styles';
import data from '../../assets/data/demo';

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
  const { userId, token } = auth.authData;

  const [checked, setChecked] = useState<any>('basic');
  const [loadPlans, setLoadPlans] = useState<any>([]);
  const [loadCurrentPlan, setCurrentPlan] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<any>('');
  const [selectedPlan, setSelectedPlan] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const isMounted = useRef<any>(null);
  
  // Get subscription plans available
  const getSubscriptionPlans  = async () => {
    getSubscription(token)
      .then((res: any) => {
        const { plans } = res.data;
        setLoadPlans(plans);
      })
      .catch((e: any) => {
        console.error(e.response.data.message);
      });
  }

   //API for Current Plan
  const getMyCurrentPlan = async () => {
    getmyPlan(userId, token)
      .then((res: any) => {
        setCurrentPlan(res.data);
      })
      .catch((e: any) => {
        console.error(e.response.data.message);
      });
  }

  const currentPlanAlert = () =>{
    if (loadCurrentPlan){
      Alert.alert(
        `Current Plan`,
        `Plan: ${loadCurrentPlan.subscription.name}\n` +
        `Price: $${loadCurrentPlan.subscription.price}`
      )
    } else {
      Alert.alert(
        `No Plan! :(`
      )
    }
  }

    // Update user's subscription plan
    // const handleUpdateSubscription = async (
    //   userId: string,
    //   token: string,
    //   _id: string,
    // ) => {
    //   return updateSubscription(
    //     userId,
    //     token,
    //     _id)
    //     .then((res: any) => {

    //       //Go back to Profile Screen
    //       setLoading(false);
    //       alert('Subscription Updated!');
    //       navigation.navigate('Profile');
    //     })
    //     .catch((e: any) => {
    //       alert(e.response.data.message);
    //     })
    //     .finally(() => {
    //       if (isMounted.current) setLoading(false);
    //     });
    // }

  //cancel plan

  // Header button initialization
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CancelButton onPress={navigation.goBack} />
      )
    })
  }, [navigation]);

  useEffect(() => {
    getSubscriptionPlans();
    getMyCurrentPlan();
    
    return () => {
      // make the states null again to clean userEffect
      setLoadPlans(null);
      setCurrentPlan(null);
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
    <View style={styles.subscriptionContainer}>
      <Text style={styles.textTitles}>Subscription</Text>
        {loadPlans ? (
          <>
      <RadioButton
        value='basic'
        color={PRIMARY_COLOR}
        status={checked === 'basic' ? "checked" : "unchecked"}
        onPress={() => setChecked('basic')}
      />      
      <RadioButton
        value='premium'
        color={PRIMARY_COLOR}
        status={checked === 'premium' ? "checked" : "unchecked"}
        onPress={() => setChecked('premium')}
      />
      <RadioButton
        value='elite'
        color={PRIMARY_COLOR}
        status={checked === 'elite' ? "checked" : "unchecked"}
        onPress={() => setChecked('elite')}
      />
          {/* API Call made here */}
          {loadPlans.map((item: any, index: any) => {
            return (       
                <SubscriptionItem
                  key={index}
                  data={item}
                />
            )
            })
          }
          </>
        ):(
          <>
          {/* if no data */}
          <Text style={{textAlign: 'center', marginTop: 250}}>{errorMessage}</Text>
          </>
        )}

      </View>

      <View style={styles.addSubscriptionButtonContainer}>
          {/* Subscription button */}
          <TouchableOpacity
            style={[styles.addSubscriptionButton, { backgroundColor: SECONDARY_COLOR }]}
            // onPress={handleUpdateSubscription(userId, token, _id)}
            >
            <Text>Subscribe</Text>
          </TouchableOpacity>
          {/* Current Plan button */}
          <TouchableOpacity
            style={[styles.addSubscriptionButton, { backgroundColor: SECONDARY_COLOR }]}
            onPress={currentPlanAlert}
          >
            <Text>Current Plan</Text>
          </TouchableOpacity>
      </View>
      
      </ScrollView>
  );
}

export default SubscriptionModal;