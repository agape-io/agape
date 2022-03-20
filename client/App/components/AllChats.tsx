import React, {
  FC,
  useEffect,
  useState
} from 'react';
import {
  FlatList,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { useChatState } from '../context';
import { getUserChats } from '../utils';
import {
  RecentMessage,
  ThreadRow
} from '../components';
import DEMO from '../../assets/data/demo';
import styles from '../../assets/styles';


const AllChats:FC<any> = ({  fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState<any>();
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats
  } = useChatState();

  const navigation = useNavigation();

  const { userId, token } = user;

  const fetchChats = async () => {
    getUserChats(userId, token)
      .then(res => {
          // gets all user messages
        setChats(res.data);
      })
      .catch(e => {
          // throw error
          console.error(e.message);
      });
  }

  const handleLoggedUser = () => {
    AsyncStorage.getItem('@auth')
      .then((res: any) => {
        setLoggedUser(JSON.parse(res));
      })
      .catch((e: any) => {
        console.error('Failed to get key', e.message);
      });
  }
  
  useEffect(() => {
    handleLoggedUser();
    fetchChats();
  }, [fetchAgain]);

  return (
    <>
      {chats ? (
        <FlatList
          data={chats}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <ThreadRow
              onPress={() => { setSelectedChat(item)}}
            >
            {console.log('flatlist', item)}
              <RecentMessage
                image={item.latestMessage.sender.profile.photo}
                name={item.latestMessage.sender.profile.name}
                latestMessage={item.latestMessage.content}
              />
            </ThreadRow>
          )}
        />
      ) : (
        <Text style={{textAlign: "center", marginTop: 200}}>No messages available :(</Text>
      )}
    </>
  );
}

export default AllChats;