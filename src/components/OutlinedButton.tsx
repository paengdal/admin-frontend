import { ButtonHTMLAttributes } from 'react';

interface OutlinedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function OutlinedButton({ className = '', ...props }: OutlinedButtonProps) {
  return (
    <button
      {...props}
      className={`w-full h-[64px] text-xl bg-transparent text-blue-500 border border-blue-500 rounded box-border p-4 hover:bg-blue-50 transition ${className}`}
    />
  );
}

export default OutlinedButton;
