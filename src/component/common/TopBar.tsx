import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import {styled} from 'styled-components/native';
import {SCREEN_WIDTH} from '../../utils/const';

interface ITopbar {
  style?: ViewStyle;
  headerLeft?: () => React.ReactNode;
  headerRight?: () => React.ReactNode;
  header?: () => React.ReactNode;
  headerLeftStyle?: ViewStyle;
  headerRightStyle?: ViewStyle;
  headerStyle?: ViewStyle;
}
const TopBar = ({
  style,
  headerLeft,
  header,
  headerRight,
  headerLeftStyle,
  headerStyle,
  headerRightStyle,
}: ITopbar) => {
  return (
    <Box style={style}>
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
  width: ${SCREEN_WIDTH}px;
  height: 55px;
  position: absolute;
  top: 0;
  padding: 0px 22px 0px 22px;
  flex-direction: row;
  align-items: center;
`;

const HeaderBox = styled.View`
  flex: 1;
`;

const HeaderLeft = styled.View`
  width: 24px;
  justify-content: center;
  align-items: flex-start;
`;
const HeaderRight = styled.View`
  width: 24px;
  justify-content: center;
  align-items: flex-end;
`;
