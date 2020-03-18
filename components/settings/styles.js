import { StyleSheet } from 'react-native'
import {
  fragmentTitleSize,
  hintTextSize,
  mainTextSize,
  orange
} from '../../styles/redesign'

export default StyleSheet.create({
  icon: {
    color: orange,
    fontSize: mainTextSize
  },
  menuItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  settingsMenu: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: fragmentTitleSize,
    marginVertical: hintTextSize,
  },
})