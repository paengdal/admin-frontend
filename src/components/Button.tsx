import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full h-[64px] bg-blue-500 text-xl text-white rounded box-border p-4 hover:bg-blue-600 transition ${className}`}
    />
  );
}

export default Button;
