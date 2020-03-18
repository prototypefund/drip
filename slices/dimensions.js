import { createSlice } from 'redux-starter-kit'

const dimensionsSlice = createSlice({
  slice: 'dimensions',
  initialState: {
    headerHeight: 0,
    isPortrait: null,
    menuHeight: 0,
    pageHeight: 0,
    screenHeight: 0,
    screenWidth: 0
  },
  reducers: {
    setDimensions: (state, action) => action.payload
  }
})

// Extract the action creators object and the reducer
const { actions, reducer, selectors } = dimensionsSlice
// Extract and export each action creator by name
export const { setDimensions } = actions

export const { getDimensions } = selectors

export default reducer
