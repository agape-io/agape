import * as React from 'react'
import { StyleSheet, Image, ImageStyle } from 'react-native'

interface ChevronProps {
    style?: ImageStyle
}

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