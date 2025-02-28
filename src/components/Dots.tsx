import { useState, useEffect } from 'react';

export default function Dots() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  return <span>{dots}</span>;
}
