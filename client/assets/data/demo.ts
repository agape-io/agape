import { DataT } from "../../types";
import IMAGE_01 from "../images/chuu.jpeg";
import IMAGE_02 from "../images/vivi.jpeg";
import IMAGE_03 from "../images/heejin.jpg";
import IMAGE_04 from "../images/choerry.jpeg";
import IMAGE_05 from "../images/jinsoul.jpeg";
import IMAGE_06 from "../images/hyunjin.jpeg";
import IMAGE_07 from "../images/haseul.jpeg";
import IMAGE_08 from "../images/oliviahye.jpeg";
import IMAGE_09 from "../images/kimlip.jpeg";
import IMAGE_10 from "../images/yves.jpg";

const data: DataT[] = [
  {
    id: 1,
    name: "Chuu",
    isOnline: true,
    match: "78",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    message:
      "Meow meow meow meow meow meow meow",
    image: IMAGE_01,
  },
  {
    id: 2,
    name: "Vivi",
    match: "93",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: false,
    message: "Meow meow meow meow meow meow meow",
    image: IMAGE_02,
  },
  {
    id: 3,
    name: "HeeJin",
    match: "45",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: false,
    message:
      "Meow meow meow meow meow meow meow",
    image: IMAGE_03,
  },
  {
    id: 4,
    name: "Choerry",
    match: "88",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: true,
    message: "Meow meow meow meow meow meow meow",
    image: IMAGE_04,
  },
  {
    id: 5,
    name: "JinSoul",
    match: "76",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: false,
    message: "Meow meow meow meow meow meow meow",
    image: IMAGE_05,
  },
  {
    id: 6,
    name: "HyunJin",
    match: "95",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: true,
    message:
      "Meow meow meow meow meow meow meow",
    image: IMAGE_06,
  },
  {
    id: 7,
    name: "Haseul",
    match: "67",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: true,
    message:
      "Meow meow meow meow meow meow meow",
    image: IMAGE_07,
  },

  //DUMMY DATA FOR PROFILE
  {
    id: 8,
    name: "Olivia Hye",
    match: "85",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    age: "20",
    location: "Azusa, CA",
    info1: 'Straight, Single, 5"5',
    info2: "Christian",
    info3: "Photography, Travel",
    info4: "If you were my rose, then I'd be your sun, \npainting you rainbows when the rains come. \nI'd change my orbit to banish the night,\nas to keep you in my nurturing light.\n", //Source: https://www.familyfriendpoems.com/poems/love/sweet/
    isOnline: true,
    message:
      "Meow meow meow meow meow meow meow",
    image: IMAGE_08,
  },
  {
    id: 9,
    name: "Kim Lip",
    match: "74",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: true,
    message:
      "Meow meow meow meow meow meow meow",
    image: IMAGE_09,
  },
  {
    id: 10,
    name: "Yves",
    match: "98",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: false,
    message:
      "Meow meow meow meow meow meow meow",
    image: IMAGE_10,
  },
];

export default data;
