import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'

import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconConfig from '../../selection.json'

import { connect } from 'react-redux'
import { getDimensions } from '../../slices/dimensions'

const Icon = createIconSetFromIcoMoon(iconConfig, '', 'Menu')

import { default as local } from './styles'

const MenuItem = ({ active, dimensions, icon, label, onPress }) => {
  const textColor = active ? local.menuTextActive : local.menuTextInactive
  const iconColor = active ? local.menuIconActive : local.menuIconInactive
  const testID = active ? 'activeMenuItem' : `menuItem${label}`

  const { isPortrait } = dimensions
  const itemStyle = isPortrait ?
    local.menuItemPortrait : local.menuItemLandscape
  const iconSize = isPortrait ? 40 : 30
  const textStyle = isPortrait ? [local.menuTextPortrait, textColor]
    : [local.menuTextLandscape, textColor]

  return (
    <TouchableOpacity style={itemStyle} onPress={onPress} >
      <Icon name={icon} size={iconSize} {...iconColor} />
      <Text testID={testID} style={textStyle} >{label}</Text>
    </TouchableOpacity>
  )
}

MenuItem.propTypes = {
  active: PropTypes.bool,
  dimensions: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return({
    dimensions: getDimensions(state)
  })
}

export default connect(
  mapStateToProps,
  null,
)(MenuItem)
