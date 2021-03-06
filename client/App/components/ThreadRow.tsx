/**
 * Thread Row Component
 */
import React from 'react';
import { TouchableOpacity } from 'react-native';

const ThreadRow = ({ children, onPress, unread }: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default ThreadRow;