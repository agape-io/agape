import React, {
  useState,
  useRef,
  useCallback
} from 'react';
import {
  FlatList,
  Text
} from 'react-native';
import {
  useNavigation,
  useFocusEffect
} from '@react-navigation/native';

import { useAuth } from '../context';
import { getUserChats } from '../utils';
import {
  RecentMessage,
  ThreadRow
} from '../components';

const AllChats = () => {
  const [chats, setChats] = useState<any>();
  const isMounted = useRef<any>(null);

  const navigation = useNavigation();

  const { authData } = useAuth();
  const { userId, token } = authData;

  const fetchChats = async () => {
    getUserChats(userId, token)
      .then(res => {
        // gets all user messages
        const { data } = res;
        setChats(data);
      })
      .catch(e => {
        // throw error
        console.error(e.message);
      });
  }
  
  useFocusEffect(
    useCallback(() => {
      fetchChats();
      isMounted.current = true;

      return () => {
        setChats([]);
        isMounted.current = false;
      }
    }, [])
  );

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
              <RecentMessage
                // this is hardcoded, make sure the 1st element is NOT
                // the logged user
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