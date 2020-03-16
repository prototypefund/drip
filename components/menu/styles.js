import { StyleSheet } from 'react-native'
import { grey, greyLight, mainTextSize, orange, textFontBold } from '../../styles/redesign'

export default StyleSheet.create({
  menu: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 0.23,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 15
  },
  menuText: {
    fontFamily: textFontBold,
    marginTop: (mainTextSize * 0.3),
    textTransform: 'uppercase'
  },
  menuTextInactive: { color: greyLight },
  menuTextActive: { color: orange },
  menuIconActive: { color: grey },
  menuIconInactive: { color: greyLight }
})