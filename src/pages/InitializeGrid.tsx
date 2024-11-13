import { useState } from 'react';

import Title from '../components/Title';
import GameInitializer from '../components/InitializeGrid/GameInitializer';
import GameMode from '../components/InitializeGrid/GameMode';
import ColorSelectorBtn from '../components/InitializeGrid/ColorSelectorBtn';
import SelectedColor from '../components/InitializeGrid/SelectedColor';
import StartBtn from '../components/InitializeGrid/StartBtn';
import type { Symbol } from '../types/game';
import ResetBtn from '../components/InitializeGrid/Reset';

export default function InitializeGridPage() {
  const [selectedColor, setSelectedColor] = useState<Symbol>('.');

  return (
    <>
      <SelectedColor selectedColor={selectedColor} />

      <ResetBtn />

      <section className="section m-auto flex flex-col items-center justify-center">
        <Title />

        <GameInitializer selectedColor={selectedColor} />

        <GameMode />

        <StartBtn />
      </section>

      <ColorSelectorBtn setSelectedColor={setSelectedColor} />
    </>
  );
}
