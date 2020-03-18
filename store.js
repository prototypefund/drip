import { combineReducers, createStore } from "redux"

import date from "./slices/date"
import navigation from "./slices/navigation"
import dimensions from "./slices/dimensions"

const reducer = combineReducers({
  date,
  navigation,
  dimensions
})

const store = createStore(reducer)

export default store
