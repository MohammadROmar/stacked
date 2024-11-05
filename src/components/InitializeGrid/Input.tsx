import { ChangeEvent } from 'react';

type InputProps = {
  id: string;
  value: string;
  onChange(newValue: number): void;
};

export default function Input({ id, value, onChange }: InputProps) {
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = +event.target.value;
    const newValue = inputValue < 0 ? 1 : inputValue > 6 ? 6 : inputValue;

    onChange(newValue);
  }

  return (
    <input
      id={id}
      type="number"
      value={value}
      onChange={handleInputChange}
      required
      className="w-12 h-12 rounded-md border-2 border-white/60 bg-transparent px-3.5 focus:outline-0 text-lg"
    />
  );
}
