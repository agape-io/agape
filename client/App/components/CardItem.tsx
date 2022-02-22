import React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
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
} from "../../assets/styles/index";

const CardItem = ({
  name,
  aboutMe,
  gender,
  hobbies,
  location,
  religion,
  yearBorn,
  hasActions,
  hasVariant,
  image,
  isOnline,
  matches
}: CardItemT) => {
  // Custom styling
  const fullWidth = Dimensions.get("window").width;
  let today = new Date(),
    year = today.getFullYear(),
    age = year - parseInt(yearBorn);

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
      {image && <Image source={image} style={imageStyle} />}

      {/* MATCHES */}
      {matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="heart" color={WHITE} size={13} /> {matches}% Match!
          </Text>
        </View>
      )}

      {/* NAME */}
      <Text style={nameStyle}>{name}</Text>
      
      {/* ABOUT ME */}
      {aboutMe && <Text style={styles.descriptionCardItem}>{aboutMe}</Text>}

      {/* GENDER */}
      <Text style={nameStyle}>{gender}</Text>

      {/* LOCATION */}
      <Text style={nameStyle}>{location}</Text>

       {/* HOBBIES */}
       {/* {hobbies.map((item) => {
         {console.log(item)}
        <Text style={nameStyle}>{item}</Text>;
      })} */}

      {/* RELIGION */}
      <Text style={nameStyle}>{religion}</Text>

      {/* YEAR BORN */}
      <Text style={nameStyle}>{age}</Text>

      <View
        style={{
          borderBottomColor: GRAY,
          borderBottomWidth: 1,
          alignSelf: "stretch",
          // paddingVertical: 5,
          marginBottom: 5,
        }}
      />

      {/* STATUS */}
      {!aboutMe && (
        <View style={styles.status}>
          <View style={isOnline ? styles.online : styles.offline} />
          <Text style={styles.statusText}>
            {isOnline ? "Online" : "Offline"}
          </Text>
        </View>
      )}

      {/* ACTIONS */}
      {hasActions && (
        <View style={styles.actionsCardItem}>
          {/* <TouchableOpacity style={styles.miniButton}>
            <Icon name="star" color={STAR_ACTIONS} size={14} />
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.button}>
            <Icon name="close" color={DISLIKE_ACTIONS} size={25} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
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
