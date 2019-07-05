import { combineReducers } from 'redux'
import navigation from '../slices/navigation'
import date from '../slices/date'

export default combineReducers({
  navigation,
  date,
})