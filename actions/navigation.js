export const setCurrentPage = (currentPage, currentMenuItem) => (
  {
    type: 'NAVIGATE_TO_PAGE',
    currentPage,
    currentMenuItem
  })