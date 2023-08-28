import AsyncStorage from '@react-native-async-storage/async-storage';
import {IArt} from '../query/types/art';

export const checkIsBookmarked = async (artId: number) => {
  try {
    const bookmarkedArtStr = await AsyncStorage.getItem('BOOKMARKED_ART');
    const bookmarkedArt = JSON.parse(bookmarkedArtStr || '[]');
    if (!bookmarkedArt) return false;
    return bookmarkedArt.includes(artId);
  } catch (e) {
    console.log(e);
  }
};

export const bookmarkArt = async (artId: number) => {
  try {
    const bookmarkedArtStr = await AsyncStorage.getItem('BOOKMARKED_ART');
    const bookmarkedArt = JSON.parse(bookmarkedArtStr || '[]');
    const isBookmarked = await checkIsBookmarked(artId);
    if (!isBookmarked) {
      const newBookmarkedArt = [...bookmarkedArt, artId];
      await AsyncStorage.setItem(
        'BOOKMARKED_ART',
        JSON.stringify(newBookmarkedArt),
      );
      // console.log(
      //   'bookmarkArt: result: ',
      //   await AsyncStorage.getItem('BOOKMARKED_ART'),
      // );
      return;
    }
    const newBookmarkedArt = bookmarkedArt.filter(
      (item: number) => item !== artId,
    );
    await AsyncStorage.setItem(
      'BOOKMARKED_ART',
      JSON.stringify(newBookmarkedArt),
    );
    // console.log(
    //   'bookmarkArt: result: ',
    //   await AsyncStorage.getItem('BOOKMARKED_ART'),
    // );
  } catch (e) {
    console.log(e);
  }
};

export const removeBookmarkArt = async (artId: number[]) => {
  try {
    const bookmarkedArtStr = await AsyncStorage.getItem('BOOKMARKED_ART');
    const bookmarkedArt = JSON.parse(bookmarkedArtStr || '[]');
    const newBookmarkedArt = bookmarkedArt.filter(
      (item: number) => !artId.includes(item),
    );
    await AsyncStorage.setItem(
      'BOOKMARKED_ART',
      JSON.stringify(newBookmarkedArt),
    );
    console.log(
      'removeBookmarkArt: result: ',
      await AsyncStorage.getItem('BOOKMARKED_ART'),
    );
  } catch (e) {
    console.log(e);
  }
};

export const getBookmarkedArts = async (artData: IArt[] | undefined) => {
  if (!artData) return;
  try {
    const bookmarkedArtStr = await AsyncStorage.getItem('BOOKMARKED_ART');
    const bookmarkedArt = JSON.parse(bookmarkedArtStr || '[]');
    const result = artData.filter((item: IArt) =>
      bookmarkedArt.includes(item.artId),
    );
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const filterArtByArtistId = (arts: IArt[], artistId: number) =>
  arts.filter((item: IArt) => item.artistId === artistId);
