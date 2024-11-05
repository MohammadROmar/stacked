import { getImageName } from '../../utils/get-image-name';
import type { Symbol } from '../../types/game';

export default function SelectedColor({
  selectedColor,
}: {
  selectedColor: Symbol;
}) {
  return (
    <section className="section p-2 w-auto absolute top-4 left-4 z-10 flex items-center gap-2">
      <p className="w-min text-xs text-center">Selected Color</p>
      <img
        src={`/src/assets/images/colors/${getImageName(selectedColor)}.png`}
        className="w-8 h-8 shadow-md rounded-xl"
      />
    </section>
  );
}
