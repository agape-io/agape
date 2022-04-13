/**
 * Card Item Component
 */
import React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import Icon from "./Icon";
import { CardItemT } from "../types";
import styles, {
  DISLIKE_ACTIONS,
  FLASH_ACTIONS,
  LIKE_ACTIONS,
  STAR_ACTIONS,
  WHITE,
  GRAY
} from "../../assets/styles";

// API's
import { updateSwipedLeft, updateSwipedRight, createChat } from '../utils';

import { useAuth } from '../context';

const CardItem = ({
  data,
  hasActions,
  hasVariant,

}: CardItemT) => {
  const auth = useAuth();

  const { userId, token } = auth.authData;

  const handleMatch = () => {
    handleMatchCreateChat(data.userId)

    Alert.alert(
      "Match!",
      "You matched with " + data.profile.name,
      [
        {
          text: "Continue Swiping",
          onPress: () => console.log("Continue Swiping Pressed"),
          // style: "cancel"
        },
        { text: "Chat", onPress: () => console.log("Chat Pressed") } //TODO: navigate to chat screen
      ]
    );
    console.log("handleMatch called");
  }

  //Create chat
  const handleMatchCreateChat = async (
    matchedUserId: string,
  ) => {
    return createChat(
      userId,
      matchedUserId,
      token)
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((e: any) => {
        console.error(e.response.data.message);
      })
  }

  // Update swipedLeft
  const handleUpdateSwipedLeft = async (
    matchUserId: string
  ) => {
    return updateSwipedLeft(
      userId,
      matchUserId,
      token)
      .then((res: any) => {
        // console.log(res.data);
        // alert('swipedLeft Updated!');
        //TODO: make card swipe
      }).catch((e: any) => {
        console.error(e.response.data.message);
        // alert(e.message);
      })
  }

  // Update swipedRight
  const handleUpdateSwipedRight = async (
    matchUserId: string
  ) => {
    return updateSwipedRight(
      userId,
      token,
      matchUserId)
      .then((res: any) => {
        // console.log(res.data);
        // console.log(res.data.match);
        //if its true
        if (res.data.)
          handleMatch()
        // alert('swipedRight Updated!');
        //TODO: make card swipe
      }).catch((e: any) => {
        console.error(e.response.data.message);
        // alert(e.message);
      })
  }


  // Custom styling
  const fullWidth = Dimensions.get("window").width;

  const imageStyle = [
    {
      borderRadius: 8,
      width: hasVariant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: hasVariant ? 170 : 350,
      margin: hasVariant ? 0 : 20,
    },
  ];

  const nameStyle = [
    {
      paddingTop: hasVariant ? 10 : 15,
      paddingBottom: hasVariant ? 5 : 7,
      color: "#363636",
      fontSize: hasVariant ? 15 : 30,
    },
  ];

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      {data.image ? <Image source={data.image} style={imageStyle} /> : <Image source={{ uri: data.profile.photo }} style={imageStyle} />}

      {/* MATCHES */}
      {!data.matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="heart" color={WHITE} size={13} /> {data.percentage}% Match!
          </Text>
        </View>
      )}

      {/* NAME */}
      <Text style={nameStyle}>{data.profile.name}</Text>

      {/* ABOUT ME */}
      {data.aboutMe && <Text style={styles.descriptionCardItem}>{data.profile.aboutMe}</Text>}

      <View
        style={{
          borderBottomColor: GRAY,
          borderBottomWidth: 1,
          alignSelf: "stretch",
          // paddingVertical: 5,
          marginBottom: 5,
        }}
      />

      {/* GENDER */}
      <Text style={styles.descriptionCardItem}>{data.profile.gender}</Text>

      {/* LOCATION */}
      <Text style={styles.descriptionCardItem}>{data.profile.location}</Text>

      {/* RELIGION */}
      <Text style={styles.descriptionCardItem}>{data.profile.religion}</Text>

      {/* AGE */}
      <Text style={styles.descriptionCardItem}>{data.profile.age}</Text>

      {/* HOBBIES - use a map to iterate for each hobby */}

      {/* STATUS */}
      {!data.aboutMe && (
        <View style={styles.status}>
          <View style={data.isOnline ? styles.online : styles.offline} />
          <Text style={styles.statusText}>
            {data.isOnline ? "Online" : "Offline"}
          </Text>
        </View>
      )}

      {/* ACTIONS */}
      {hasActions && (
        <View style={styles.actionsCardItem}>
          {/* <TouchableOpacity style={styles.miniButton}>
            <Icon name="star" color={STAR_ACTIONS} size={14} />
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.button} onPress={() => handleUpdateSwipedLeft(data.userId)}>
            <Icon name="close" color={DISLIKE_ACTIONS} size={25} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => handleUpdateSwipedRight(data.userId)}>
            <Icon name="heart" color={LIKE_ACTIONS} size={25} />
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.miniButton}>
            <Icon name="flash" color={FLASH_ACTIONS} size={14} />
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
};

export default CardItem;
