import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import MenuItem from './menu-item'

import { connect } from 'react-redux'
import { getNavigation, navigate } from '../../slices/navigation'
import { getDimensions } from '../../slices/dimensions'

import { pages } from '../pages'

import { default as local } from './styles'

const Menu = ({ navigate, navigation, dimensions }) => {
  const menuItems = pages.filter(page => page.isInMenu)
  const { menuHeight } = dimensions

  return (
    <View style={[local.menu, { height: menuHeight }]}>
      { menuItems.map(({ icon, label, component, children }) => {
        const isActive = (component === navigation.currentPage) ||
          (children && children.indexOf(navigation.currentPage) !== -1)
        return (
          <MenuItem
            key={label}
            label={label}
            icon={icon}
            active={isActive}
            onPress={() => navigate(component)}
          />
        )}
      )}
    </View >
  )
}

Menu.propTypes = {
  dimensions: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return({
    dimensions: getDimensions(state),
    navigation: getNavigation(state),
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu)