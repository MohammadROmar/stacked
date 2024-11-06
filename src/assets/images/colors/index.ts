import blueImg from './blue.png';
import cyanImg from './cyan.png';
import emptyImg from './empty.png';
import greenImg from './green.png';
import limeImg from './lime.png';
import obstacleImg from './obstacle.png';
import orangeImg from './orange.png';
import pinkImg from './pink.png';
import purpleImg from './purple.png';
import redImg from './red.png';
import yellowImg from './yellow.png';

type CellsImage = {
  [key: string]: string;
};

export const cellsImages: CellsImage = {
  blue: blueImg,
  cyan: cyanImg,
  empty: emptyImg,
  green: greenImg,
  lime: limeImg,
  obstacle: obstacleImg,
  orange: orangeImg,
  pink: pinkImg,
  purple: purpleImg,
  red: redImg,
  yellow: yellowImg,
};
