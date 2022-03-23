import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ThreadRow = ({ children, onPress, unread }: any) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default ThreadRow;