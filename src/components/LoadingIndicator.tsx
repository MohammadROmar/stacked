import Dots from './Dots';
import redBlockImg from '../assets/images/colors/red.png';

export default function LoadingIndicator() {
  return (
    <section className="section flex flex-col justify-center items-center gap-6">
      <img
        src={redBlockImg}
        alt="An image of a red block."
        className="origin-center animate-spin w-20 h-20"
      />

      <p className="text-4xl">
        <span>Loading</span>
        <Dots />
      </p>
    </section>
  );
}
