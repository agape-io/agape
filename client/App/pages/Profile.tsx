import React, { FC, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import styles, { WHITE } from "../../assets/styles";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../navigation";
import { HomeTabNavigatorParamList, RootNavigatorParamsList } from "../types";
import { getProfile } from '../utils';

import { Landing } from '../pages';

export interface ProfileProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Discover'>,
  NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const Profile: FC<ProfileProps> = ({ navigation }) => {
  
  // use this state to populate data through an object
  const [profile, setProfile] = useState<any>();

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

  useEffect(() => {
    loadProfile();

    return () => {
      // return default
      setProfile({});
    }
  }, []);

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
