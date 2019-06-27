export const main = (state = {}, action) => {
  switch (action.type) {
  case 'SET_DATE':
    return Object.assign(
      {},
      state,
      {
        date: action.date,
      })
  default:
    return state
  }
}
export default main