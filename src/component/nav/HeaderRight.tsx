import {styled} from 'styled-components/native';
import {TextSubMd} from '../../style/styledConst';
import {ViewStyle} from 'react-native';

const HeaderRight = ({
  fn,
  text,
  style,
}: {
  fn: Function;
  text: string;
  style?: ViewStyle;
}) => {
  return (
    <HeaderRightBtn style={{...style}} onPress={() => fn()}>
      <HeaderRightText>{text}</HeaderRightText>
    </HeaderRightBtn>
  );
};

export default HeaderRight;
const HeaderRightBtn = styled.Pressable``;
const HeaderRightText = styled(TextSubMd)`
  font-size: 16px;
`;
