import React, {
  FC,
  useEffect,
  useState
} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useChatState } from '../context';
import { getUserChats } from '../utils';
import { RecentMessage } from '../components';
import { ActivityIndicator } from 'react-native-paper';
import styles from '../../assets/styles';

const AllChats:FC<any> = ({ navigation, fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState<any>();
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats
  } = useChatState();

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
      {!chats ? (
        // <FlatList
        //   data={chats}
        //   keyExtractor={(item) =>  item._id.toString() }
        //   renderItem={({ item }) => (
        //     <TouchableOpacity
        //       onPress={() => navigation.navigate('Message', { thread: item })}
        //     >
        //     {console.log('flatlist', item, 'ayooo')}
        //       <RecentMessage
        //         image={item.image}
        //         name={item.name}
        //         lastMessage={item.message}
        //       />
        //     </TouchableOpacity>
        //   )}
        // />
        <>
          <Text>Hullo</Text>
        </>
      ) : (
        <Text style={{textAlign: "center", marginTop: 200}}>No messages available :(</Text>
      )}
    </>
  );
}

export default AllChats;