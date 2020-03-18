import { createSlice } from 'redux-starter-kit'

const dimensionsSlice = createSlice({
  slice: 'dimensions',
  initialState: {},
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
