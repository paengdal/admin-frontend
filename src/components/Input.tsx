import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full h-[64px] border rounded box-border p-4 ${className}`}
    />
  );
}

export default Input;
