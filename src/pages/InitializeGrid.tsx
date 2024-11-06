import { useState } from 'react';

import Title from '../components/Title';
import GameInitializer from '../components/InitializeGrid/GameInitializer';
import ColorSelectorBtn from '../components/InitializeGrid/ColorSelectorBtn';
import SelectedColor from '../components/InitializeGrid/SelectedColor';
import StartBtn from '../components/InitializeGrid/StartBtn';
import type { InitializeGridPageProps } from '../types/game-initializer';
import type { Symbol } from '../types/game';

export default function InitializeGridPage({
  gameData,
  setPage,
  changeGameData,
}: InitializeGridPageProps) {
  const [selectedColor, setSelectedColor] = useState<Symbol>('.');

  return (
    <>
      <SelectedColor selectedColor={selectedColor} />

      <section className="section m-auto flex flex-col items-center justify-center">
        <Title />

        <GameInitializer
          gameData={gameData}
          selectedColor={selectedColor}
          changeGameData={changeGameData}
        />

        <StartBtn gameData={gameData} setPage={setPage} />
      </section>

      <ColorSelectorBtn setSelectedColor={setSelectedColor} />
    </>
  );
}
