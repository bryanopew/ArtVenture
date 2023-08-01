import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import {_MPY_} from '../../utils/const';
import {styled} from 'styled-components/native';

interface ITopbar {
  headerLeft?: () => React.ReactNode;
  headerRight?: () => React.ReactNode;
  header?: () => React.ReactNode;
  headerLeftStyle?: ViewStyle;
  headerRightStyle?: ViewStyle;
  headerStyle?: ViewStyle;
}
const TopBar = ({
  headerLeft,
  header,
  headerRight,
  headerLeftStyle,
  headerStyle,
  headerRightStyle,
}: ITopbar) => {
  return (
    <Box>
      <HeaderLeft style={headerLeftStyle}>
        {headerLeft && headerLeft()}
      </HeaderLeft>
      <HeaderBox style={headerStyle}>{header ? header() : null}</HeaderBox>
      <HeaderRight style={headerRightStyle}>
        {headerRight && headerRight()}
      </HeaderRight>
    </Box>
  );
};

export default TopBar;

const Box = styled.View`
  width: 100%;
  height: ${110 * _MPY_}px;
  position: absolute;
  top: 0;
  flex-direction: row;
  align-items: center;
`;

const HeaderBox = styled.View`
  flex: 8;
`;

const HeaderLeft = styled.TouchableOpacity`
  flex: 1;
  margin-left: ${23 * _MPY_}px;
`;
const HeaderRight = styled.TouchableOpacity`
  flex: 1;
  margin-right: ${23 * _MPY_}px;
`;
