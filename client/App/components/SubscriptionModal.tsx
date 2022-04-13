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
  ScrollView
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SubscriptionItem } from './index';
import { ProfileModalProps } from '../types';
import { useAuth } from '../context';

// API's
import {
  getSubscription,
  updateSubscription,
  getmyPlan,
  cancelSubscription,
} from '../utils';

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

  const [checked, setChecked] = useState<any>('basic');
  const [loadPlans, setLoadPlans] = useState<any>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const isMounted = useRef<any>(null);

  const { userId, token } = auth.authData;
  
  // Get subscription plans available
  const getSubscriptionPlans = () => {
    getSubscription(token)
      .then((res: any) => {
        const { plans } = res.data;
        setLoadPlans(plans);
        console.log(loadPlans);
      })
      .catch((e: any) => {
        console.error(e.response.data.message);
      });
  }

  // Update user's subscription plan
  // const handleUpdateSubscription = async (
  //   planId: string
  // ) => {
  //   return updateSubscription(
  //     userId,
  //     token,
  //     planId)
  //     .catch((e: any) => {
  //       alert(e.response.data.message);
  //     })
  //     .finally(() => {
  //       if (isMounted.current) setLoading(false);
  //     });
  // }

  //current plan
  // const getmycurrentPlan = () => {
  //   getmyPlan(token)
  //     .then((res: any) => {
  //       const { settings } = res.data;

  //       console.log(settings);
  //     })
  //     .catch((e: any) => {
  //       console.error(e.response.data.message);
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
    
    return () => {
    // make the states null again after I use the useEffect
    }
  }, []);

  // useEffect(() => {
  //   isMounted.current = true;

  //   return () => {
  //     isMounted.current = false;
  //   }
  // }, []);


  return (
      <ScrollView contentContainerStyle={styles.modalContainer}>

        {loadPlans ? (
          <>

          {loadPlans.map((item: any, index: any) => {
            <SubscriptionItem data={loadPlans} key={index} />
            })
          }
            
          </>
        ):(
          <>
          <View><Text> No data!</Text></View>
          {/* <SubscriptionItem data={loadPlans}/> */}
          </>
        )}

      </ScrollView>
  );
}

export default SubscriptionModal;