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

  //load all plans available
  const [loadPlans, setLoadPlans] = useState<any>([]);
  // load current user's plan
  const [loadCurrentPlan, setCurrentPlan] = useState<any>();
  // update user's subscription plan
  const [updateSubs, setSubscription] = useState<any>();

  const [errorMessage, setErrorMessage] = useState<any>('');
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
        const { settings } = res.data.subscription;
        setSubscription(settings);
        console.log(res.data);

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
        `Price: $${loadCurrentPlan.subscription.price}\n` +
        `Expires: ${loadCurrentPlan.endingDate}`
      )
    } else {
      Alert.alert(
        `No plan found! :(`
      )
    }
  }

  //cancel plan TODO

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
          {/* API Call made here */}
          {loadPlans.map((item: any, index: any) => {
            return (       
                <SubscriptionItem
                  key={index}
                  data={item}
                  navigation
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
            // onPress={() => handleUpdateSubscription(planId)}
            >
            <Text>Cancel Subscription</Text>
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