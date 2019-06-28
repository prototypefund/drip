import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'

import { setCurrentPage } from '../../actions/navigation'

import styles from '../../styles/index'
import settingsLabels from '../../i18n/en/settings'
import AppText from '../app-text'

const labels = settingsLabels.menuTitles

// TODO: move it to the navigation config (components/navigation.js)
const menu = [
  {title: labels.reminders, component: 'Reminders'},
  {title: labels.nfpSettings, component: 'NfpSettings'},
  {title: labels.dataManagement, component: 'DataManagement'},
  {title: labels.password, component: 'Password'},
  {title: labels.about, component: 'About'},
  {title: labels.license, component: 'License'}
]

const SettingsMenu = (props) => {
  return (
    <ScrollView>
      { menu.map(menuItem)}
    </ScrollView>
  )

  function menuItem({title, component}) {
  // TODO: make MenuItem a component
    return (
      <TouchableOpacity
        style={styles.framedSegment}
        key={title}
        onPress={() => props.navigate(component)}
      >
        <AppText>{title.toLowerCase()}</AppText>
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(setCurrentPage(page)),
  })
}

export default connect(
  null,
  mapDispatchToProps,
)(SettingsMenu)