import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

import { setCurrentPage } from '../actions/navigation'

import { menuTitles } from '../i18n/en/labels'

import styles, { iconStyles } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const menuTitlesLowerCase = Object.keys(menuTitles).reduce((acc, curr) => {
  acc[curr] = menuTitles[curr].toLowerCase()
  return acc
}, {})

export const menuItems = {
  'Home': {
    icon: 'home',
    component: 'Home',
  },
  'Calendar': {
    icon: 'calendar-range',
    component: 'Calendar',
  },
  'Chart': {
    icon: 'chart-line',
    component: 'Chart',
  },
  'Stats': {
    icon: 'chart-pie',
    component: 'Stats',
  },
  'Settings': {
    icon: 'settings',
    component: 'SettingsMenu',
  }
}

export const isInMainMenu = (page) => {
  return menuItems.hasOwnProperty(page)
}

const MenuItem = ({ item, isActive, onMenuItemSelected }) => {
  const { icon } = menuItems[item]
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => onMenuItemSelected(item)}
    >
      <Icon
        name={icon}
        {...iconStyles.menuIcon}
        {...isActive ? styles.menuItemIconActive : null}
      />
      <Text style={[
        styles.menuItemText,
        isActive ? styles.menuItemTextActive : null
      ]}>
        {menuTitlesLowerCase[item]}
      </Text>
    </TouchableOpacity>
  )
}

class Menu extends Component {
  render() {
    const { currentPage } = this.props
    return (
      <View style={styles.menu}>
        { Object.keys(menuItems)
          .map((item, i) =>
            <MenuItem
              item={item}
              isActive={item === currentPage}
              key={i}
              onMenuItemSelected={this.props.navigate}
            />)
        }
      </View >
    )
  }
}

const mapStateToProps = (state) => {
  return({
    currentPage: state.navigation.currentPage,
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(setCurrentPage(page)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu)