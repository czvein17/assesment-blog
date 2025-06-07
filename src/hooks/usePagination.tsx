import { useState } from "react";

export function usePagination(totalCount: number) {
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const totalPages = Math.ceil(totalCount / pageSize);

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return { page, setPage: goToPage, totalPages, pageSize };
}
