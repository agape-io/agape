/**
 * Row Component
 */
import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'
import styled from 'styled-components/native'

import {
    ContainerProps,
    TopBorderContainerProps,
    RowProps
} from '../types';
import { Chevron } from './index';

export const Row = ({
    title,
    subtitle,
    onPress,
    showDisclosureIndicator,
    renderAccessory,

    titleStyles,
    subtitleStyles,
    isFirst,
    isLast,
}: RowProps) => {
    let ContentContainer = onPress ? TouchableOpacity : View;

    return (
        <Container height={subtitle ? 56 : 46}>
            <TopBorderContainer isFirst={isFirst}>
                <TopBorder />
            </TopBorderContainer>
            <ContentContainer style={styles.contentContainer} onPress={onPress}>
                <TitlesContainer>
                    <View />
                    <Title numberOfLines={1} style={titleStyles}>
                        {title}
                    </Title>
                    {subtitle && (
                        <Subtitle numberOfLines={1} style={subtitleStyles}>
                            {subtitle}
                        </Subtitle>
                    )}
                    <View />
                </TitlesContainer>
                {renderAccessory && renderAccessory()}
                {showDisclosureIndicator ? <Chevron /> : <View style={{ width: 10 }} />}
            </ContentContainer>
            {isLast && <BottomBorder />}
        </Container>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        paddingLeft: 15,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
})

const Container = styled.View<ContainerProps>`
  background-color: transparent;
  height: ${p => p.height};
  align-items: stretch;
`;


const TopBorderContainer = styled.View<TopBorderContainerProps>`
  align-self: stretch;
  height: ${StyleSheet.hairlineWidth};
  padding-left: ${p => (p.isFirst ? 0 : 15)};
  background-color: white;
`;

const TopBorder = styled.View`
  flex: 1;
  background-color: #ccc;
`;

const TitlesContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  align-self: stretch;
`;

const Title = styled.Text`
  color: black;
  font-size: 18;
  margin-right: 15;
`;

const Subtitle = styled.Text`
  color: #999;
  font-size: 15;
  margin-right: 15;
`;

const BottomBorder = styled.View`
  align-self: stretch;
  height: ${StyleSheet.hairlineWidth};
  background-color: #ccc;
`;
