import { createSlice } from 'redux-starter-kit'

const navigationSlice = createSlice({
  slice: 'navigation',
  initialState: {
    currentPage: 'Home',
    previousPages: [],
  },
  reducers: {
    goToPage: (state, action) => {
      state.previousPages.push(state.currentPage)
      state.currentPage = action.payload
    },
    goBack: (state) => {
      state.currentPage = state.previousPages.pop()
    },
  }
})

// Extract the action creators object and the reducer
const { actions, reducer, selectors } = navigationSlice
// Extract and export each action creator by name
export const { goToPage, goBack } = actions

export const { getNavigation } = selectors

export default reducer