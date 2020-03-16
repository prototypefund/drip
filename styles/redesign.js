import { StyleSheet } from 'react-native'

export const purple = '#3A2671'
export const purpleLight = '#5D4F8A'
export const tourquise = '#69CBC1'
export const tourquiseLight = '#CFECEA'
export const orange = '#F38337'
export const grey = '#666666'
export const greyLight = '#A5A5A5'

export const textFont = 'Jost-400-Book'
export const textFontBold = 'Jost-700-Bold'

export const mainTextSize = 20
export const hintTextSize = 16
export const titleTextSize = 44
export const headerTextSize = 28

export default StyleSheet.create({
  mainText: {
    color: tourquiseLight,
    fontFamily: textFont,
    fontSize: mainTextSize
  },
  hintText: {
    fontSize: hintTextSize,
    marginLeft: hintTextSize
  },
  orangeText: { color: orange },
  purpleText: { color: purple },
  whiteText: { color: 'white' },
  titleText: {
    color: purpleLight,
    fontFamily: textFontBold,
    fontSize: titleTextSize,
    marginBottom: (mainTextSize * 1.3),
    textTransform: 'lowercase'
  },
  link: {
    color: 'white',
    textDecorationLine: 'underline'
  },
  button: {
    alignItems: 'center',
    backgroundColor: orange,
    borderRadius: 25,
    margin: 30,
    paddingVertical: hintTextSize
  },
  buttonText: {
    color: 'white',
    fontFamily: textFontBold,
    fontSize: hintTextSize,
    textTransform: 'uppercase'
  },
  itemRow: { flexDirection: 'row' },
  //Home page styles
  homePageContainer: {
    backgroundColor: purple,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  homeContentContainer: { marginHorizontal: (mainTextSize * 1.3) },
  lineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: (mainTextSize * 0.4)
  },
})

