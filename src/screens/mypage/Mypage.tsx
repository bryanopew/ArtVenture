import {View, Text} from 'react-native';
import React from 'react';
import {
  Col,
  Container,
  Icon,
  Row,
  RowSpace,
  TextMainBd,
  TextMainMd,
} from '../../style/styledConst';
import {styled} from 'styled-components/native';
import {SCREEN_WIDTH} from '../../utils/const';
import {icons} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../style/colors';

const Mypage = () => {
  // navigation
  const {navigate} = useNavigation();

  // etc
  // btns
  const mypageBtns: {
    label: string;
    icon: string;
    onPress: () => void;
  }[] = [
    {label: '내 정보', icon: 'user', onPress: () => navigate('Account')},
    {label: '공지사항', icon: 'notice', onPress: () => navigate('Notice')},
    {label: '채팅상담', icon: 'consult', onPress: () => navigate('Consult')},
    {
      label: '자주하는 질문',
      icon: 'question',
      onPress: () => navigate('Question'),
    },
  ];
  return (
    <Container style={{paddingTop: 8}}>
      {mypageBtns.map((btn, i) => (
        <Col key={btn.label}>
          <Btn onPress={btn.onPress}>
            <Row>
              <Icon source={icons[btn.icon]} />
              <BtnText>{btn.label}</BtnText>
            </Row>
            <Icon source={icons.rightGrey} />
          </Btn>
          {i === 0 && (
            <>
              <RowSpace
                height={6}
                style={{backgroundColor: colors.lightGrey}}
              />
              <TextMainBd
                style={{
                  marginTop: 20,
                  marginBottom: 12,
                  fontSize: 16,
                  paddingHorizontal: 22,
                }}>
                고객센터
              </TextMainBd>
            </>
          )}
        </Col>
      ))}
    </Container>
  );
};

export default Mypage;

const Btn = styled.TouchableOpacity`
  height: 52px;
  width: ${SCREEN_WIDTH - 44}px;
  align-self: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const BtnText = styled(TextMainMd)`
  font-size: 14px;
  margin-left: 16px;
`;
