import React, { Component } from 'react'
import { View, BackHandler, Text } from 'react-native'
import { connect } from 'react-redux'

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

const HOME_PAGE = 'Home'
const CYCLE_DAY_PAGE = 'CycleDay'
const SETTINGS_MENU_PAGE = 'SettingsMenu'

class App extends Component {
  constructor(props) {
    super(props)
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPress)
    setupNotifications(this.navigate)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackButtonPress = () => {
    const { currentPage, currentProps } = this.state
    if (currentPage === HOME_PAGE) {
      closeDb()
      return false
    }
    if (this.isSymptomView()) {
      this.navigate(
        this.originForSymptomView, { date: currentProps.date }
      )
    } else if (this.isSettingsView()) {
      this.navigate(SETTINGS_MENU_PAGE)
    } else if (currentPage === CYCLE_DAY_PAGE) {
      this.navigate(this.menuOrigin)
    } else {
      this.navigate(HOME_PAGE)
    }
    return true
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
    // , currentProps
    // const allPages = {
    //   Home,
    //   Calendar,
    //   CycleDay,
    //   Chart,
    //   SettingsMenu,
    //   ...settingsViews,
    //   Stats,
    //   ...symptomViews
    // }
    // console.log('/// allPages: ', allPages)
    const Page = pages[currentPage].component
    const title = headerTitlesLowerCase[currentPage]

    return (
      <View style={{flex: 1}}>
        <Text>{`current page: ${this.props.currentPage}`}</Text>
        <Text>{`current menu item: ${this.props.currentMenuItem}`}</Text>
        { this.shouldShowHeader() &&
            <Header
              title={title}
              shouldShowBackButton={this.isSettingsView()}
            />
        }
        <Page
          navigate={this.navigate}
          handleBackButtonPress={this.handleBackButtonPress}
        />

        { !this.isSymptomView() && <Menu /> }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    currentPage: state.navigation.currentPage,
    currentMenuItem: state.navigation.currentMenuItem,
  })
}

export default connect(
  mapStateToProps,
  null
)(App)