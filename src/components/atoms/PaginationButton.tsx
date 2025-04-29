interface Props {
  arrowDirection?: string;
  index: number;
  currentPage?: number;
  onClick: (index: number) => void;
}

function PaginationButton({
  arrowDirection,
  index,
  currentPage,
  onClick,
}: Props) {
  const handleClick = () => {
    if (arrowDirection) {
      onClick(index);
    } else {
      onClick(index);
    }
  };

  if (arrowDirection) {
    const arrowClassName = `w-10 h-10 bg-white border rounded-full flex justify-center items-center text-gray-500 font-semibold mr-1 cursor-pointer ${
      arrowDirection === 'previous' ? '' : 'transform rotate-180'
    }`;

    return (
      <div className={arrowClassName} onClick={handleClick}>
        <img src="/arrow-left.png" alt="arrow" className="w-4" />
      </div>
    );
  } else {
    const className =
      index === currentPage
        ? 'w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center text-white font-semibold mr-1 cursor-pointer'
        : 'w-10 h-10 bg-white border rounded-full flex justify-center items-center text-gray-500 font-semibold mr-1 cursor-pointer';

    return (
      <div className={className} onClick={handleClick}>
        {index}
      </div>
    );
  }
}

export default PaginationButton;
