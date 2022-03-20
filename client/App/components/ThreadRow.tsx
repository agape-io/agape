import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

const ThreadRow = ({ onPress, children, unread }: any) => {
  
  return (
    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default ThreadRow;