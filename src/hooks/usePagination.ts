import { useState } from 'react';

const usePagination = (data: any, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newData, setNewData] = useState(data);

  const maxPage = Math.ceil(newData.length / itemsPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return newData.slice(begin, end);
  };

  const next = () => {
    setCurrentPage((current) => Math.min(current + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((current) => Math.max(current - 1, 1));
  };

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  };

  const updateNewData = (datas: any) => {
    setNewData(datas);
  };

  return {
    next,
    prev,
    jump,
    currentData,
    currentPage,
    updateNewData,
    newData,
    maxPage,
  };
};

export default usePagination;
