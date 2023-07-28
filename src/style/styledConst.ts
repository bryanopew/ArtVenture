import styled from 'styled-components/native';
import {colors} from './colors';
import {_MPY_} from '../utils/const';

export interface IAvStyled {
  isActivated: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

const TextMain = styled.Text`
  color: ${colors.textMain};
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

// gap
export const ColumnGap = styled.View`
  width: ${24 * _MPY_}px;
  height: 100%;
`;
export const RowGap = styled.View`
  width: ${24 * _MPY_}px;
  height: 100%;
`;
