/**
 * Chevron Component
 */
import React from 'react'
import {
    StyleSheet,
    Image
} from 'react-native';
import { ChevronProps } from '../types';

const Chevron = ({ style }: ChevronProps) => (
    <Image
        style={[defaultStyles.chevron, style]}
        source={require('../../assets/images/chevron3.png')}
    />
)

const defaultStyles = StyleSheet.create({
    chevron: {
        width: 12,
        height: 12,
        marginLeft: 8,
        marginRight: 10,
        opacity: 0.35,
    },
});

export default Chevron;