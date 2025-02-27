import { useState, useEffect } from 'react';

import redBlockImg from '../assets/images/colors/red.png';

export default function LoadingIndicator() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <section className="section flex flex-col justify-center items-center gap-6">
      <img
        src={redBlockImg}
        alt="An image of a red block."
        className="origin-center animate-spin w-20 h-20"
      />
      <p className="text-4xl">Loading{dots}</p>
    </section>
  );
}
