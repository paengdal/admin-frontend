type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

function Input({ error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      <input
        {...props}
        className={`w-full h-[64px] border rounded box-border p-4 ${className}`}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}

export default Input;
