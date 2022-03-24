/**
 * Profile Screen
 */
import React, {
  FC,
  useCallback,
  useState,
  useRef
} from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { CompositeNavigationProp, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Icon, ProfileItem } from "../components";
import styles, { WHITE } from "../../assets/styles";
import { useAuth } from "../context";
import { HomeTabNavigatorParamList, RootNavigatorParamsList } from "../types";
import { getProfile } from '../utils';

export interface ProfileProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Discover'>,
  NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const Profile: FC<ProfileProps> = ({ navigation }) => {
  const [profile, setProfile] = useState<any>();
  const isMounted = useRef<any>(null);

  const auth = useAuth();

  const { token, userId } = auth.authData;

  const loadProfile = async () => {
    //get the profile
    getProfile(userId, token)
      .then(res => {
        const { profile } = res.data;
        console.log(profile);
        setProfile(profile);
      }).catch(e => {
        console.log(e.message);
      });
  }

  // checks refresh
  useFocusEffect(
    useCallback(() => {
      loadProfile();
      isMounted.current = true;

      return () => {
        // return default
        setProfile({});
        isMounted.current = false;
      }
    }, [])
  );

  if (profile === undefined) return null;

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        {profile ? (
          <>
          <ImageBackground source={{ uri: profile.photo }} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity>
              <Icon
                name="chevron-back"
                size={20}
                color={WHITE}
                style={styles.topIconLeft}
              />
            </TouchableOpacity>
            </View>
            </ImageBackground>  
            <ProfileItem
              data={profile}
            /> 
          </>
        ) : (
            <>
              <ImageBackground source={{ uri: profile.photo }} style={styles.photo} />
              <View style={styles.top} />
              <ProfileItem
                data={profile}
              /> 
            </>   
        )} 
        
        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton} onPress={() => navigation.navigate('ProfileModal')}>
            <Icon name="pencil-outline" size={30} color={WHITE} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.textButton}>Change Your Preferences</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.circledButton}>
            <Icon name="settings-outline" size={30} color={WHITE} />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
