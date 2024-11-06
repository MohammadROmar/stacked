import Modal from '../Modal';
import { symbols } from '../../data/symbols';
import { cellsImages } from '../../assets/images/colors';
import { getImageName } from '../../utils/get-image-name';
import type { ColorsSelectorProps } from './ColorSelectorBtn';

type ColorsModalProps = {
  setIsOpen(isOpen: boolean): void;
} & ColorsSelectorProps;

export default function ColorsModal({
  setSelectedColor,
  setIsOpen,
}: ColorsModalProps) {
  return (
    <Modal>
      <h2 className="text-2xl">Select color</h2>

      <ul className="game-grid grid-cols-4 bg-transparent">
        {symbols.map((symbol) => (
          <li
            key={symbol}
            onClick={() => {
              setSelectedColor(symbol);
              setIsOpen(false);
            }}
          >
            <img
              src={cellsImages[getImageName(symbol)]}
              className="aspect-square"
            />
          </li>
        ))}
      </ul>

      <button
        onClick={() => setIsOpen(false)}
        className="button animate-none self-end"
      >
        Cancel
      </button>
    </Modal>
  );
}
