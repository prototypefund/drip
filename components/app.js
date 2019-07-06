import React, { Component } from 'react'
import { View, BackHandler, Text } from 'react-native'
import { connect } from 'react-redux'

import { getNavigation, goToPage, goBack } from '../slices/navigation'

import Header from './header'
import Menu, { isInMainMenu } from './menu'

import { pages } from './navigation'
import symptomViews from './cycle-day/symptoms'

import {headerTitles} from '../i18n/en/labels'
import setupNotifications from '../lib/notifications'
import { closeDb } from '../db'

// design wants everyhting lowercased, but we don't
// have CSS pseudo properties
const headerTitlesLowerCase = Object.keys(headerTitles).reduce((acc, curr) => {
  acc[curr] = headerTitles[curr].toLowerCase()
  return acc
}, {})

class App extends Component {
  constructor(props) {
    super(props)
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonPress
    )
    // TODO: connect notifications to a store
    setupNotifications(this.props.navigate)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackButtonPress = () => {
    const { navigateBack, navigation } = this.props
    if (navigation.previousPages.length > 0) {
      navigateBack()
      return true
    } else {
      closeDb()
      return false
    }
  }

  isSymptomView() {
    return Object.keys(symptomViews).includes(this.props.currentPage)
  }

  isSettingsView() {
    const { currentMenuItem, currentPage } = this.props
    return (
      currentMenuItem === 'Settings' &&
      currentMenuItem !== currentPage
    )
  }

  shouldShowHeader() {
    return isInMainMenu(this.props.currentPage) || this.isSettingsView()
  }

  render() {
    const { currentPage, previousPages } = this.props.navigation
    const Page = pages[currentPage].component
    const title = headerTitlesLowerCase[currentPage]

    return (
      <View style={{flex: 1}}>
        <Text>{`current page: ${currentPage}`}</Text>
        <Text>{`previous page: ${previousPages}`}</Text>
        { this.shouldShowHeader() &&
            <Header
              title={title}
              shouldShowBackButton={this.isSettingsView()}
            />
        }
        <Page handleBackButtonPress={this.handleBackButtonPress} />

        { !this.isSymptomView() && <Menu /> }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    navigation: getNavigation(state),
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(goToPage(page)),
    navigateBack: () => dispatch(goBack())
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)