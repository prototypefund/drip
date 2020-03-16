import { StyleSheet } from 'react-native'
import {
  headerTextSize,
  mainTextSize,
  orange,
  purple,
  textFontBold,
  tourquise
} from '../../styles/redesign'

export default StyleSheet.create({
  //Header
  header: {
    alignItems: 'center',
    backgroundColor: purple,
    flex: 0.18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: mainTextSize
  },
  headerText: {
    color: tourquise,
    fontFamily: textFontBold,
    fontSize: headerTextSize
  },
  headerIcon: {
    color: orange,
    fontSize: mainTextSize
  },
  //Settings
  modalBackground: {
    backgroundColor: 'black',
    flex: 1,
    opacity: 0.65
  },
  settingsMenu: {
    backgroundColor: 'white',
    position: 'absolute',
    paddingHorizontal: mainTextSize
  },
  threeDots: {
    flex: 0.135,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  menuItem: {
    flex: 0.12,
    justifyContent: 'center',
  },
  cross: {
    color: purple,
    fontSize: mainTextSize
  }
})