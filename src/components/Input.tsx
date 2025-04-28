// type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
//   error?: string; // 추가: 에러 메시지
// };

// function Input({ error, ...props }: InputProps) {
//   return (
//     <div className="flex flex-col">
//       <input
//         {...props}
//         className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       {error && (
//         <span className="text-red-500 text-sm mt-1">{error}</span>
//       )}
//     </div>
//   );
// }

// export default Input;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string; // 추가: 에러 메시지
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
