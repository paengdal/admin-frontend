import { Fragment } from 'react';
import PaginationButton from '../atoms/PaginationButton';

const PAGE_LENGTH = 5; // 페이지 표시 개수

interface Props {
  currentPage: number;
  maxPage: number;
  onClick: (page: number) => void;
}

function Pagination({ currentPage, onClick, maxPage }: Props) {
  // 현재 페이지와 페이지 표시 개수를 바탕으로 기준 숫자 설정
  const referenceNum = Math.ceil(currentPage / PAGE_LENGTH) - 1;

  // 숫자 버튼 클릭 실행 함수
  const handleNumberClick = (page: number) => {
    onClick(page);
  };

  // 화살표 버튼 클릭 실행 함수
  const handleArrowClick = (index: number) => {
    if (index === 0) {
      // 1. 좌측 화살표 클릭
      // 첫 페이지에서는 작동 금지
      if (referenceNum >= 1) {
        onClick(PAGE_LENGTH * (referenceNum - 1) + 1);
      }
    } else {
      // 2. 우측 화살표 클릭
      // 최대 페이지 이내에서만 작동
      if (referenceNum < Math.ceil(maxPage / PAGE_LENGTH) - 1) {
        onClick(PAGE_LENGTH * (referenceNum + 1) + 1);
      }
    }
  };

  return (
    <div className="flex justify-center my-10">
      {Array(PAGE_LENGTH + 2)
        .fill('')
        .map((_, i) => {
          // 좌측 화살표 버튼 생성
          if (i === 0) {
            if (referenceNum >= 1) {
              return (
                <PaginationButton
                  key={i}
                  arrowDirection="previous"
                  index={i}
                  onClick={handleArrowClick}
                />
              );
            } else {
              // 이동 불가능할 경우 빈 Fragment 리턴
              return <Fragment key={i} />;
            }
          }

          // 우측 화살표 버튼 생성
          if (i === PAGE_LENGTH + 1) {
            if (referenceNum < Math.ceil(maxPage / PAGE_LENGTH) - 1) {
              return (
                <PaginationButton
                  key={i}
                  arrowDirection="next"
                  index={i}
                  onClick={handleArrowClick}
                />
              );
            } else {
              // 이동 불가능할 경우 빈 Fragment 리턴
              return <Fragment key={i} />;
            }
          }

          // 숫자 버튼 생성
          if (PAGE_LENGTH * referenceNum + i > maxPage) {
            // 최대 페이지 수를 넘어가는 경우 빈 Fragment 리턴
            return <Fragment key={i} />;
          } else {
            return (
              <PaginationButton
                key={i}
                index={PAGE_LENGTH * referenceNum + i}
                currentPage={currentPage}
                onClick={handleNumberClick}
              />
            );
          }
        })}
    </div>
  );
}

export default Pagination;
