import { ButtonHTMLAttributes } from 'react';

function Button({
  className = '',
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`w-full h-[64px] rounded p-4 text-xl text-white transition
        ${
          disabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }
        ${className}`}
    />
  );
}

export default Button;
