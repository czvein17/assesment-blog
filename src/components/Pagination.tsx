interface PaginationProps {
  page: number;
  totalPages: number;
  onClick: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  page,
  onClick,
}) => {
  return (
    <div className="join mt-auto ml-auto py-5 px-5">
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          className={`join-item btn btn-square ${
            page === idx + 1 ? "btn-primary" : ""
          }`}
          onClick={() => onClick(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};
