import { useState } from "react";

import { pageLength } from "./tableConfig";
import { IPendingVacationDaysTable } from "./types";

export const usePagination = (initialData: IPendingVacationDaysTable[]) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data] = useState(initialData);

  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / pageLength);

  const handleStartPage = () => setCurrentPage(0);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handleEndPage = () => setCurrentPage(totalPages - 1);

  const firstEntryInPage = currentPage * pageLength;
  const lastEntryInPage = Math.min(firstEntryInPage + pageLength, totalRecords);

  const currentData = data.slice(firstEntryInPage, lastEntryInPage);

  return {
    currentPage,
    totalRecords,
    totalPages,
    firstEntryInPage,
    lastEntryInPage,
    currentData,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
  };
};
