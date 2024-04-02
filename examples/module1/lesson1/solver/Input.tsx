import { ChangeEvent } from 'react';

type InputProps = {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({onChange, value}: InputProps) => {
  return (
    <input
      type="number"
      className="rounded-md shadow-md p-4"
      value={value}
      onChange={onChange}
    />
  );
};
