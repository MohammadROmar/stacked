import { ChangeEvent } from 'react';

type InputProps = {
  id: string;
  value: string;
  onChange(newValue: ChangeEvent<HTMLInputElement>): void;
};

export default function Input({ id, value, onChange }: InputProps) {
  return (
    <input
      id={id}
      type="number"
      value={value}
      onChange={onChange}
      required
      className="w-14 h-14 rounded-md border-2 border-white/60 bg-transparent px-2.5 focus:outline-0"
    />
  );
}
