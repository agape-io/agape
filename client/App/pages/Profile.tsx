import React, { FC, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import DEMO from "../../assets/data/demo";
import styles, { WHITE } from "../../assets/styles";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../navigation";
import { HomeTabNavigatorParamList, RootNavigatorParamsList } from "../types";
import { getProfile } from '../utils';
import data from "../../assets/data/demo";

export interface ProfileProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Discover'>,
  NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const Profile: FC<ProfileProps> = ({ navigation }) => {
  
  const [modal, setModal] = useState<boolean>(false);
  // use this state to populate data through an object
  const [profile, setProfile] = useState<any>(null);

  const auth = useAuth();

  const token = auth.authData.token,
  userId = auth.authData.userId;

  const loadProfiles = async () => {
    //get the profile
    getProfile(userId, token)
      .then(res => {
        const { userProfile } = res.data;
        console.log("token: " + token)
        console.log("userId: " + userId)
        console.log("name: " + name)
        console.log(userProfile.name);
        setProfile(userProfile);
      }).catch(e => {
        console.log(e.message);
      });
  }

  const {
    // age,
    // image,
    // info1,
    // info2,
    // info3,
    // info4,
    // location,
    // match,
    // name,

    name,
    gender,
    aboutMe,
    age,
    year,
    location,
    religion,
    hobby

  } = DEMO[7]

  //TODO: fetch profile data
  useEffect(() => {
    loadProfiles();

    return () => {
        setProfile(null);
    }
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={require("../../assets/images/01.jpg")} style={styles.photo}>
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

        {/* {profile.map((item: any, index: any) => {

          return (
              <View key={index}>
                  <ProfileItem
                      key={index}
                      data={item}
                      // gender ={item.gender}
                      // hasActions
                  />
              </View>
          )
          })} */}
          
          <ProfileItem
          // matches={match}
          // name={name}
          // age={age}
          // location={location}
          // info1={info1}
          // info2={info2}
          // info3={info3}
          // info4={info4}

          name={name}
          gender={gender}
          aboutMe={aboutMe}
          age={age}
          year={year}
          location={location}
          religion={religion}
          hobby={hobby}
        />

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
