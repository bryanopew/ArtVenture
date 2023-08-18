import styled from 'styled-components/native';
import {colors} from './colors';
import {TOP_BAR_HEIGHT} from '../utils/const';

///////////////// text ///////////////////////////
const TextMain = styled.Text`
  color: ${colors.textMain};
`;

const TextSub = styled.Text`
  color: ${colors.textSub};
`;

export const TextMainBd = styled(TextMain)`
  font-family: 'SpoqaHanSansNeo-Bold';
  color: ${colors.textMain};
`;
export const TextMainMd = styled(TextMain)`
  font-family: 'SpoqaHanSansNeo-Medium';
  color: ${colors.textMain};
`;
export const TextMainRg = styled(TextMain)`
  font-family: 'SpoqaHanSansNeo-Regular';
  color: ${colors.textMain};
`;
export const TextMainLt = styled(TextMain)`
  font-family: 'SpoqaHanSansNeo-Light';
  color: ${colors.textMain};
`;
export const TextMainTh = styled(TextMain)`
  font-family: 'SpoqaHanSansNeo-Thin';
  color: ${colors.textMain};
`;
export const TextSubBd = styled(TextSub)`
  font-family: 'SpoqaHanSansNeo-Bold';
  color: ${colors.textSub};
`;
export const TextSubMd = styled(TextSub)`
  font-family: 'SpoqaHanSansNeo-Medium';
  color: ${colors.textSub};
`;
export const TextSubRg = styled(TextSub)`
  font-family: 'SpoqaHanSansNeo-Regular';
  color: ${colors.textSub};
`;
export const TextSubLt = styled(TextSub)`
  font-family: 'SpoqaHanSansNeo-Light';
  color: ${colors.textSub};
`;
export const TextSubTh = styled(TextSub)`
  font-family: 'SpoqaHanSansNeo-Thin';
  color: ${colors.textSub};
`;

///////////////// container //////////////////////
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

export const ContainerWithTopBar = styled(Container)`
  padding-top: ${TOP_BAR_HEIGHT}px;
`;

///////////////// navigation comps //////////////////////
export const NavHeader = styled(TextMainBd)`
  font-size: 20px;
  margin-left: 12px;
`;

///////////////// icons  //////////////////////
export const Icon = styled.Image<{size?: number}>`
  width: ${({size}) => (size ? `${size}px` : `24px`)};
  height: ${({size}) => (size ? `${size}px` : `24px`)};
`;

///////////////// common comps //////////////////////
export const Col = styled.View``;
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

// gap
export const ColumnSpace = styled.View<{width?: number; height?: number}>`
  width: ${({width}) => (width ? width : 12)}px;
  height: ${({height}) => (height ? `${height}px` : `100%`)};
`;
export const RowSpace = styled.View<{width?: number; height?: number}>`
  width: ${({width}) => (width ? `${width}px` : `100%`)};
  height: ${({height}) => (height ? height : 12)}px;
`;

// line
export const Line = styled.View<{
  direction: 'horizontal' | 'vertical';
  lineWidth: number;
  color?: string;
}>`
  width: ${({direction, lineWidth}) =>
    direction === 'horizontal' ? `100%` : `${lineWidth}px`};
  height: ${({direction, lineWidth}) =>
    direction === 'horizontal' ? `${lineWidth}px` : `100%`};
  background-color: ${({color}) => (color ? color : colors.line)};
`;

// button
export const BtnCTA = styled.TouchableOpacity`
  width: 100%;
  height: 44px;
  background-color: ${colors.black};
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;
