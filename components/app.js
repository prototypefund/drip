import React, { Component } from 'react'
import { BackHandler, Dimensions, View } from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { getDate } from '../slices/date'
import { getNavigation, navigate, goBack } from '../slices/navigation'
import { setDimensions } from '../slices/dimensions'

import Header from './header'
import Menu from './menu'
import { viewsList } from './views'
import { isSymptomView } from './pages'

import setupNotifications from '../lib/notifications'
import { getCycleDay } from '../db'

class App extends Component {

  static propTypes = {
    date: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    setDimensions: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      props.goBack
    )

    setupNotifications(this.props.navigate)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  onLayout = () => {
    const screenHeight = Math.round(Dimensions.get('window').height)
    const screenWidth = Math.round(Dimensions.get('window').width)
    const isPortrait = screenWidth < screenHeight
    const headerHeight = isPortrait ? screenHeight * 0.12 : screenHeight * 0.11
    const menuHeight = isPortrait ? screenHeight * 0.16 : screenHeight * 0.14
    const pageHeight = isPortrait ? screenHeight * 0.72 : screenHeight * 0.75

    this.props.setDimensions({
      headerHeight,
      isPortrait,
      menuHeight,
      pageHeight,
      screenHeight,
      screenWidth
    })
  }

  render() {
    const { date, navigation } = this.props
    const { currentPage } = navigation

    if (!currentPage) {
      return false
    }

    const Page = viewsList[currentPage]

    const isSymptomEditView = isSymptomView(currentPage)
    const isCycleDayView = currentPage === 'CycleDay'

    const pageProps = {
      cycleDay: date && getCycleDay(date),
      date,
    }

    return (
      <View style={{ flex: 1 }} onLayout={this.onLayout}>
        { !isSymptomEditView && !isCycleDayView && <Header /> }

        <Page { ...pageProps } />

        { !isSymptomEditView && <Menu /> }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    date: getDate(state),
    navigation: getNavigation(state)
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
    goBack: () => dispatch(goBack()),
    setDimensions: (dimensions) => dispatch(setDimensions(dimensions))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
