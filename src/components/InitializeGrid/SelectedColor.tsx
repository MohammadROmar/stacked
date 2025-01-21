import { cellsImages } from '../../assets/images/colors';
import { getImageName } from '../../utils/get-image-name';
import type { Symbol } from '../../models/symbol';

export default function SelectedColor({
  selectedColor,
}: {
  selectedColor: Symbol;
}) {
  return (
    <section className="section p-2 w-auto absolute top-4 left-4 z-10 flex items-center gap-2">
      <p className="w-min text-xs text-center text-[#ff8345]">Selected Color</p>
      <img src={cellsImages[getImageName(selectedColor)]} className="w-8 h-8" />
    </section>
  );
}
