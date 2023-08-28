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
import {colors} from '../../style/colors';
import {styled} from 'styled-components/native';
type ISection = {
  title: string;
  content: string;
};
const SECTIONS: ISection[] = [
  {
    title: '저장은 어떻게 하나요1?',
    content: `1저장은 북마크 페이지에서 더보기 버튼 (점 세개)을 이용해서 가능합니다.`,
  },
  {
    title: '저장은 어떻게 하나요2?',
    content: `2저장은 북마크 페이지에서 더보기 버튼 (점 세개)을 이용해서 가능합니다.`,
  },
  {
    title: '저장은 어떻게 하나요3?',
    content: `3저장은 북마크 페이지에서 더보기 버튼 (점 세개)을 이용해서 가능합니다.`,
  },
  {
    title: '저장은 어떻게 하나요4?',
    content: `4저장은 북마크 페이지에서 더보기 버튼 (점 세개)을 이용해서 가능합니다.`,
  },
];

const Question = () => {
  // useState
  const [activeSection, setactiveSection] = useState<number[]>([]);
  // accordion
  // content: ISection, index: number, isActive: boolean, sections: ISection[]
  const _renderHeader = (
    content: ISection,
    index: number,
    isActive: boolean,
    sections: ISection[],
  ) => {
    return (
      <Btn>
        <HeaderTextMain>{sections[index].title}</HeaderTextMain>
        {!isActive && (
          <HeaderTextSub numberOfLines={1} ellipsizeMode="tail">
            {sections[index].content}
          </HeaderTextSub>
        )}
      </Btn>
    );
  };

  const _renderContent = (section: ISection) => {
    return (
      <ContentBox>
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

export default Question;

const Btn = styled.View`
  height: 72px;
  justify-content: center;
  border-bottom-width: 0.5px;
  border-color: ${colors.inactivate};
  padding: 0px 22px;
`;

const HeaderTextSub = styled(TextSubRg)`
  font-size: 12px;
  margin-top: 8px;
`;
const HeaderTextMain = styled(TextMainMd)`
  font-size: 14px;
`;

const ContentBox = styled.View`
  padding: 16px 22px 24px 22px;
  background-color: ${colors.lightGrey};
`;

const ContentText = styled(TextMainLt)`
  font-size: 13px;
  margin-top: 4px;
  line-height: 18px;
`;
