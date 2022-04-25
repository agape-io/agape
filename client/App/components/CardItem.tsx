/**
 * Card Item Component
 */
// Libraries
import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//Components
import Icon from "./Icon";

//Types
import { CardItemT } from "../types";

//Styles
import styles, {
  DISLIKE_ACTIONS,
  LIKE_ACTIONS,
  STAR_ACTIONS,
  WHITE,
  GRAY
} from "../../assets/styles";

//Utils
import { updateSwipedLeft, updateSwipedRight, createChat, postMessage } from '../utils';
import { useAuth } from '../context';

const CardItem = ({
  data,
  hasActions,
  hasVariant,
  swipe

}: CardItemT) => {
  const auth = useAuth();

  const { userId, token } = auth.authData;

  const navigation = useNavigation();

  //send message for new match
  const sendMatchMessage = async (message: any) => {

    createChat(
      userId,
      data.userId,
      token)
      .then((res: any) => {
        const { _id } = res.data;

        postMessage(userId, token, message, _id)
          .then((res: any) => {
            navigation.navigate("Chat");
          })
          .catch((e: any) => {
            console.error(e.response.data.message);
          });

      })
      .catch((e: any) => {
        console.error(e.response.data.message);
      })
  }

  const handleMatch = () => {
    console.log("handleMatch called");
    Alert.prompt(
      "You matched with " + data.profile.name,
      "Say Hi!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Send",
          onPress: message => sendMatchMessage(message)
        }
      ],
    );
  }

  // Update swipedLeft
  const handleUpdateSwipedLeft = async (
    matchUserId: string
  ) => {
    return updateSwipedLeft(
      userId,
      token,
      matchUserId)
      .then((res: any) => {
        //TODO: make card swipe
      }).catch((e: any) => {
        console.error(e.response.data.message);
        alert(e.message);
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
        if ((res.data.match) === (true)) {
          handleMatch();
        }
        //TODO: make card swipe
      }).catch((e: any) => {
        console.error(e.response.data.message);
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

  //TODO
  // useEffect(() => {
  //   console.log(swipe);
  // }, []);

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
        </View>
      )}
    </View>
  );
};

export default CardItem;
