import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {
  Col,
  Container,
  Icon,
  TextMainBd,
  TextMainRg,
} from '../style/styledConst';
import {styled} from 'styled-components/native';
import {colors} from '../style/colors';
import {icons} from '../assets/icons';

const Korean = () => {
  return (
    <Container>
      <TbdBox>
        <Icon source={icons.korean} size={60} style={{alignSelf: 'center'}} />
        <TbdTitle>경이로운 예술경험을 위해 준비 중입니다.</TbdTitle>
        <TbdDetail>
          ArtVenture를 이용해 주셔서 감사합니다{`\n`}
          추후 업데이트로 출시됩니다.
        </TbdDetail>
        <Pressable style={{marginTop: 18}}>
          <Link>소식 빠르게 접하기 {'>'}</Link>
        </Pressable>
      </TbdBox>
    </Container>
  );
};

export default Korean;

const TbdBox = styled.View`
  width: 100%;
  height: 100%;

  top: 30%;

  align-items: center;
`;

const TbdTitle = styled(TextMainBd)`
  font-size: 14px;

  margin-top: 20px;
`;

const TbdDetail = styled(TextMainRg)`
  font-size: 12px;
  margin-top: 16px;
  text-align: center;
  line-height: 20px;
`;
const Link = styled(TextMainRg)`
  font-size: 12px;
  color: ${colors.link};
`;
