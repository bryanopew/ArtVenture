import {IArt} from '../query/types/art';

export const reGroupArtsBySix = (arts: IArt[] | undefined) => {
  if (!arts) return;

  let grouped: Array<IArt[]> = [];
  for (let i = 0; i < arts.length; i++) {
    if (i % 6 === 0) grouped.push([]);
    grouped[Math.floor(i / 6)].push(arts[i]);
  }
  return grouped;
};

export const reGroupArtsByArtist = (arts: IArt[] | undefined) => {
  if (!arts) return;
  let grouped: Array<IArt[]> = [];

  for (let i = 0; i < arts.length; i++) {
    if (i === 0) {
      grouped.push([arts[i]]);
      continue;
    }

    let index = grouped.findIndex(
      group => group[0].artistId === arts[i].artistId,
    );
    if (index === -1) {
      grouped.push([arts[i]]);
      continue;
    }
    grouped[index].push(arts[i]);
  }

  return grouped;
};
