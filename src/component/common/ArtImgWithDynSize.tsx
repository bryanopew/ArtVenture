import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HOME_ART_HEIGHT, _MPY_} from '../../utils/const';
import {styled} from 'styled-components/native';

const ArtImgWithDynSize = ({uri}: {uri: string}) => {
  const [imgSize, setImgSize] = useState({
    width: HOME_ART_HEIGHT,
    height: HOME_ART_HEIGHT,
  });
  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      const modWidth = (width * HOME_ART_HEIGHT) / height;
      setImgSize({width: modWidth, height: HOME_ART_HEIGHT});
    });
  }, []);
  return (
    <ArtImg
      source={{uri}}
      style={{width: imgSize.width, height: imgSize.height}}
    />
  );
};

export default ArtImgWithDynSize;

const ArtImg = styled.Image`
  border-radius: ${10 * _MPY_}px;
`;
