import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

import { getNavigation, goToPage } from '../slices/navigation'

import { pages, mainMenu } from './navigation'

import { menuTitles } from '../i18n/en/labels'

import styles, { iconStyles } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const menuTitlesLowerCase = Object.keys(menuTitles).reduce((acc, curr) => {
  acc[curr] = menuTitles[curr].toLowerCase()
  return acc
}, {})

export const isInMainMenu = (page) => {
  return mainMenu.indexOf(page) !== page
}

const MenuItem = ({ item, isActive, onMenuItemSelected }) => {
  const { icon } = pages[item]
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

const getParentPage = (currentPage) => {
  const page = pages[currentPage]
  return page.hasOwnProperty('parentPage') ? page.parentPage : null
}

class Menu extends Component {
  render() {
    const { currentPage } = this.props.navigation
    const currentParentPage = getParentPage(currentPage)
    return (
      <View style={styles.menu}>
        { mainMenu.map((item, i) =>
          <MenuItem
            item={item}
            isActive={item === currentPage || item === currentParentPage}
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
    navigation: getNavigation(state),
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(goToPage(page)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu)