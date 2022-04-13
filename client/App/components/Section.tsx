/**
 * Section Component
 */
import React from 'react';
import styled from 'styled-components/native';

import { Row } from './Row';
import { SectionProps } from '../types';

export const Section = ({ section, globalTextStyle }: SectionProps) => {
    let elements: React.ReactElement<any>[] = []

    if (section.header) {
        elements.push(
            <SectionHeader key={section.header} style={[globalTextStyle]}>
                {section.header}
            </SectionHeader>,
        )
    }

    for (let i = 0; i < section.rows.length; i++) {
        const rowData = section.rows[i]
        const isFirst = i === 0
        const isLast = i === section.rows.length - 1

        elements.push(
            <Row
                key={rowData.title}
                {...rowData}
                titleStyles={[globalTextStyle, rowData.titleStyle]}
                subtitleStyles={[globalTextStyle, rowData.subtitleStyle]}
                isFirst={isFirst}
                isLast={isLast}
            />,
        )
    }

    if (typeof section.footer === 'string') {
        elements.push(
            <SectionFooter key={section.footer} style={globalTextStyle}>
                {section.footer}
            </SectionFooter>,
        )
    } else if (typeof section.footer === 'function') {
        if (!section.key) {
            throw new Error(
                `Sections with a render function passed as footer must have their key property set. (Offending section has header ${section.header
                })`,
            )
        }

        elements.push(
            <RenderedSectionFooterContainer key={section.key + '-footer'}>
                {section.footer()}
            </RenderedSectionFooterContainer>,
        )
    }

    return <SectionContainer>{elements}</SectionContainer>
}

const SectionContainer = styled.View`
  align-items: stretch;
  margin-bottom: 40;
`

const SectionHeader = styled.Text`
  margin-left: 20;
  margin-bottom: 8;
  color: #999;
  font-size: 14;
`;

const SectionFooter = styled.Text`
  margin-top: 8;
  font-size: 15;
  color: #999;
  margin-horizontal: 15;
`;

const RenderedSectionFooterContainer = styled.View`
  align-self: stretch;
`;