import React, { Component } from 'react'
import { View, BackHandler, Text } from 'react-native'
import { connect } from 'react-redux'

import { setCurrentPage } from '../actions/navigation'

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
    const { previousPage, navigate } = this.props
    if (previousPage) {
      navigate(previousPage)
      return true
    }
    closeDb()
    return false
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
    const { currentPage } = this.props

    const Page = pages[currentPage].component
    const title = headerTitlesLowerCase[currentPage]

    return (
      <View style={{flex: 1}}>
        <Text>{`current page: ${this.props.currentPage}`}</Text>
        <Text>{`previous page: ${this.props.previousPage}`}</Text>
        <Text>{`current menu item: ${this.props.currentMenuItem}`}</Text>
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
  const { currentPage, previousPage, currentMenuItem } = state.navigation
  return({
    currentPage,
    previousPage,
    currentMenuItem,
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page, menuItem) => dispatch(setCurrentPage(page, menuItem)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)