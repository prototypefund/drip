export const navigation = (state = {}, action) => {
  switch (action.type) {
  case 'NAVIGATE_TO_PAGE':
    return Object.assign(
      {},
      state,
      {
        currentPage: action.currentPage,
        currentMenuItem: action.currentMenuItem
      })
  default:
    return state
  }
}
export default navigation