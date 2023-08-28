import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  Container,
  TextMainLt,
  TextMainMd,
  TextMainRg,
  TextSubRg,
} from '../../style/styledConst';
import Accordion from 'react-native-collapsible/Accordion';
import {styled} from 'styled-components/native';
import {colors} from '../../style/colors';

type ISection = {
  date: string;
  title: string;
  contentTitle: string;
  content: string;
};
const SECTIONS: ISection[] = [
  {
    date: '23/08/28',
    title: '[공지] : 업데이트 사항',
    contentTitle: `아트벤처 테스트 버전 출시`,
    content: `안녕하세요 아트벤처 테스트 버전이 출시되었습니다.
테스트 버전을 자유롭게 이용해보시고
불편한 점이나 개선할 사항이 있다면
카톡채팅을 이용해주세요.`,
  },
  {
    date: '23/08/28',
    title: '[공지] : 업데이트 사항',
    contentTitle: `아트벤처 테스트 버전 출시`,
    content: `안녕하세요 아트벤처 테스트 버전이 출시되었습니다.
테스트 버전을 자유롭게 이용해보시고
불편한 점이나 개선할 사항이 있다면
카톡채팅을 이용해주세요.`,
  },
  {
    date: '23/08/28',
    title: '[공지] : 업데이트 사항',
    contentTitle: `아트벤처 테스트 버전 출시`,
    content: `안녕하세요 아트벤처 테스트 버전이 출시되었습니다.
테스트 버전을 자유롭게 이용해보시고
불편한 점이나 개선할 사항이 있다면
카톡채팅을 이용해주세요.`,
  },
];
const Notice = () => {
  const [activeSection, setactiveSection] = useState<number[]>([]);
  console.log('Notice: activeSection:', activeSection);

  // accordion
  const _renderHeader = (section: ISection) => {
    return (
      <Btn>
        <HeaderTextSub>{section.date}</HeaderTextSub>
        <HeaderTextMain>{section.title}</HeaderTextMain>
      </Btn>
    );
  };

  const _renderContent = (section: ISection) => {
    return (
      <ContentBox>
        <ContentTextTitle>{section.contentTitle}</ContentTextTitle>
        <ContentText>{section.content}</ContentText>
      </ContentBox>
    );
  };

  const _updateSections = (activeSections: number[]) => {
    setactiveSection(activeSections);
  };
  return (
    <Container>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSection}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        underlayColor={colors.blackOpacity5}
      />
    </Container>
  );
};

export default Notice;

const Btn = styled.View`
  height: 72px;
  justify-content: center;
  border-bottom-width: 0.5px;
  border-color: ${colors.inactivate};
  padding: 0px 22px;
`;

const HeaderTextSub = styled(TextSubRg)`
  font-size: 12px;
`;
const HeaderTextMain = styled(TextMainMd)`
  font-size: 14px;
  margin-top: 8px;
`;

const ContentBox = styled.View`
  padding: 16px 22px 24px 22px;
  background-color: ${colors.lightGrey};
`;

const ContentTextTitle = styled(TextMainRg)`
  font-size: 13px;
`;
const ContentText = styled(TextMainLt)`
  font-size: 13px;
  margin-top: 4px;
  line-height: 18px;
`;
