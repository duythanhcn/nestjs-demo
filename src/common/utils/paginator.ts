export function paginate(totalCount: number, numRecords: number, page: number) {
  const totalPage = Math.ceil(totalCount / numRecords);
  const currentPage = page;

  const isPrevPage = currentPage > 1;
  const isNextPage = currentPage < totalPage;
  return {
    numRecords,
    totalCount,
    totalPage: totalPage || 0,
    currentPage,
    isNextPage,
    isPrevPage,
  };
}
