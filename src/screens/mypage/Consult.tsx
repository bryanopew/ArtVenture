import {
  BtnCTA,
  Col,
  Container,
  TextMainMd,
  TextMainRg,
} from '../../style/styledConst';
import FastImage from 'react-native-fast-image';
import {SCREEN_WIDTH} from '../../utils/const';
import {colors} from '../../style/colors';

const Consult = () => {
  return (
    <Container
      style={{
        alignItems: 'center',
        paddingHorizontal: 22,
        justifyContent: 'center',
      }}>
      <Col style={{width: '100%', alignItems: 'center'}}>
        {/* Img ratio 234:260 */}
        <FastImage
          style={{
            width: SCREEN_WIDTH - 128,
            height: (SCREEN_WIDTH - 128) * (260 / 234),
          }}
          resizeMode="contain"
          source={require('../../assets/imgs/consultImg.png')}
        />
        <TextMainMd style={{fontSize: 14, marginTop: 20, textAlign: 'center'}}>
          상담원과 채팅으로 상담을 진행할 수 있어요.{'\n'}
          궁금한 점을 물어보세요!
        </TextMainMd>
        <BtnCTA
          style={{marginTop: 56}}
          onPress={() => console.log('채팅상담하기')}>
          <TextMainRg style={{color: colors.white, fontSize: 18}}>
            채팅 상담하기
          </TextMainRg>
        </BtnCTA>
      </Col>
    </Container>
  );
};

export default Consult;
