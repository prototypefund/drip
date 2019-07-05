import { createSlice } from 'redux-starter-kit'

const navigationSlice = createSlice({
  slice: 'navigationSlice',
  initialState: {
    currentPage: 'Home',
    previousPage: null,
  },
  reducers: {
    goToPage: (state, action) => {
      return {
        currentPage: action.payload,
        previousPage: state.currentPage
      }
    },
  }
})

// Extract the action creators object and the reducer
const { actions, reducer, selectors } = navigationSlice
// Extract and export each action creator by name
export const { goToPage } = actions

export const { getNavigation } = selectors

export default reducer