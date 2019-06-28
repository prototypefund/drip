import React, { Component } from 'react'
import nodejs from 'nodejs-mobile-react-native'

import { getLicenseFlag, saveEncryptionFlag } from '../local-storage'
import { openDb } from '../db'

import App from './app'
import PasswordPrompt from './password-prompt'
import License from './license'
import AppLoadingView from './app-loading'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../reducers'

const initialStore = {
  navigation: {
    currentPage: "Home",
    previousPage: null,
    currentMenuItem: "Home",
  }
}

const store = createStore(rootReducer, initialStore)

export default class AppWrapper extends Component {
  constructor() {
    super()
    this.state = {
      isCheckingLicenseAgreement: true,
      shouldShowLicenseAgreement: false,
      shouldShowPasswordPrompt: false,
      shouldShowApp: false,
    }
    nodejs.start('main.js')
    this.checkLicenseAgreement()
    this.checkDbPasswordSet()
  }

  async checkLicenseAgreement() {
    const isLicenseFlagSet = await getLicenseFlag()
    if (!isLicenseFlagSet) {
      this.enableShowLicenseAgreement()
    } else {
      this.setState({ isCheckingLicenseAgreement: false })
    }
  }

  async checkDbPasswordSet() {
    const canConnectToDb = await openDb()
    if (canConnectToDb) {
      this.enableShowApp()
      await saveEncryptionFlag(false)
      return false
    }
    this.setState({ shouldShowPasswordPrompt: true })
    await saveEncryptionFlag(true)
  }

  enableShowLicenseAgreement = () => {
    this.setState({
      shouldShowLicenseAgreement: true,
      isCheckingLicenseAgreement: false
    })
  }

  disableShowLicenseAgreement = () => {
    this.setState({ shouldShowLicenseAgreement: false })
  }

  enableShowApp = () => {
    this.setState({
      shouldShowApp: true,
      shouldShowPasswordPrompt: false
    })
  }

  render() {
    const {
      isCheckingLicenseAgreement,
      shouldShowLicenseAgreement,
      shouldShowPasswordPrompt,
      shouldShowApp,
    } = this.state

    let firstView = null

    if (isCheckingLicenseAgreement) {
      firstView = <AppLoadingView />
    } else if (shouldShowLicenseAgreement) {
      firstView = <License setLicense={this.disableShowLicenseAgreement}/>
    } else if (shouldShowPasswordPrompt) {
      firstView = <PasswordPrompt enableShowApp={this.enableShowApp} />
    } else if (shouldShowApp) {
      firstView = <App />
    }

    return <Provider store={store}>{firstView}</Provider>
  }
}