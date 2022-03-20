import React, {
  useEffect,
  useState
} from 'react';
import {
  FlatList,
  Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../context';
import { getUserChats } from '../utils';
import {
  RecentMessage,
  ThreadRow
} from '../components';

const AllChats = ({  fetchAgain, setFetchAgain }: any) => {
  const [chats, setChats] = useState<any>();

  const navigation = useNavigation();

  const { authData } = useAuth();
  const { userId, token } = authData;

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
  
  useEffect(() => {
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
              onPress={() => navigation.navigate('Message', {
                chatId: item._id,
                name: item.users[1].profile.name
              })}
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