import styled from 'styled-components/native';
import {colors} from './colors';
import {TOP_BAR_HEIGHT, _MPY_} from '../utils/const';

export interface IAvStyled {
  isActivated: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

export const ContainerWithTopBar = styled(Container)`
  padding-top: ${TOP_BAR_HEIGHT}px;
`;

// icon
export const Icon = styled.Image<{size?: number}>`
  width: ${({size}) => (size ? `${size}px` : `${48 * _MPY_}px`)};
  height: ${({size}) => (size ? `${size}px` : `${48 * _MPY_}px`)};
`;

// text
const TextMain = styled.Text`
  color: ${colors.textMain};
`;

const TextSub = styled.Text`
  color: ${colors.textSub};
`;

export const TextMainBd = styled(TextMain)`
  font-family: 'SpoqaHanSansNeo-Bold';
`;
export const TextMainMd = styled(TextMain)`
  font-family: 'SpoqaHanSansNeo-Medium';
`;
export const TextMainRg = styled(TextMain)`
  font-family: 'SpoqaHanSansNeo-Regular';
`;
export const TextMainLt = styled(TextMain)`
  font-family: 'SpoqaHanSansNeo-Light';
`;
export const TextMainTh = styled(TextMain)`
  font-family: 'SpoqaHanSansNeo-Thin';
`;
export const TextSubBd = styled(TextSub)`
  font-family: 'SpoqaHanSansNeo-Bold';
`;
export const TextSubMd = styled(TextSub)`
  font-family: 'SpoqaHanSansNeo-Medium';
`;
export const TextSubRg = styled(TextSub)`
  font-family: 'SpoqaHanSansNeo-Regular';
`;
export const TextSubLt = styled(TextSub)`
  font-family: 'SpoqaHanSansNeo-Light';
`;
TextSub;
export const TextSubTh = styled(TextSub)`
  font-family: 'SpoqaHanSansNeo-Thin';
`;

export const Col = styled.View``;
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

// gap
export const ColumnSpace = styled.View<{width?: number; height?: number}>`
  width: ${({width}) => (width ? width : 24 * _MPY_)}px;
  height: ${({height}) => (height ? `${height}px` : `100%`)};
`;
export const RowSpace = styled.View<{width?: number; height?: number}>`
  width: ${({width}) => (width ? `${width}px` : `100%`)};
  height: ${({height}) => (height ? height : 24 * _MPY_)}px;
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
