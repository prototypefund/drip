import { isInMainMenu } from '../components/menu'

export const navigation = (state = {}, action) => {
  switch (action.type) {
  case 'NAVIGATE_TO_PAGE':
    return Object.assign(
      {},
      state,
      {
        currentPage: action.currentPage,
        previousPage: state.currentPage,
        currentMenuItem: isInMainMenu(action.currentPage) ?
          action.currentPage :
          state.currentMenuItem
      })
  default:
    return state
  }
}
export default navigation