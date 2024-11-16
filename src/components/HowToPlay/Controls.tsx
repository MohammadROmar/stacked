import wasdKeysImg from '../../assets/images/wasd-keys.png';
import arrowKeysImg from '../../assets/images/arrow-keys.png';

export default function Controls() {
  return (
    <article className="self-start">
      <h3 className="text-lg text-[#ff8345]">Controls:</h3>
      <p className="p-2">you can move your finger around the screen or use</p>
      <p className="flex items-center justify-center gap-2  p-2 text-sm">
        <span>
          <img src={wasdKeysImg} alt="WASD Keys" className="w-full" />
        </span>
        or
        <span>
          <img src={arrowKeysImg} alt="Arrow Keys" className="w-full" />
        </span>
      </p>
      <p className="px-2">to control how colors move</p>
    </article>
  );
}
