import {View, Text, Platform} from 'react-native';
import React, {SetStateAction} from 'react';
import {styled} from 'styled-components/native';
import {TextMainMd, TextMainRg} from '../../style/styledConst';
import {colors} from '../../style/colors';

interface IDropDown {
  items: {
    label: string;
    fn: Function;
  }[];
  setIsDDShown: React.Dispatch<SetStateAction<boolean>>;
}
const DropDown = ({items, setIsDDShown}: IDropDown) => {
  return (
    <Box
      style={{
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {
              height: 0,
              width: 0,
            },
          },
          android: {
            shadowColor: '#000',
            elevation: 5,
          },
        }),
      }}>
      {items.map((item, index) => (
        <Btn
          key={index}
          onPress={() => {
            item.fn();
            setIsDDShown(false);
          }}>
          <BtnText>{item.label}</BtnText>
        </Btn>
      ))}
    </Box>
  );
};

export default DropDown;

const Box = styled.View`
  /* width: 104px; */
  background-color: ${colors.white};
  position: absolute;
  top: 12px;
  right: 22px;
  border-radius: 8px;
  padding: 4px 0px;
`;

const Btn = styled.TouchableOpacity`
  padding: 14px 20px;
  justify-content: center;
  align-items: flex-start;
`;

const BtnText = styled(TextMainRg)`
  font-size: 14px;
`;
