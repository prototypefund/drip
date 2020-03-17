import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'

import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconConfig from '../../selection.json'

const Icon = createIconSetFromIcoMoon(iconConfig, '', 'Menu')

import { default as local } from './styles'

export default function MenuItem({ active, icon, label, onPress }) {
  const textColor = active ? local.menuTextActive : local.menuTextInactive
  const iconColor = active ? local.menuIconActive : local.menuIconInactive
  const testID = active ? 'activeMenuItem' : `menuItem${label}`

  return (
    <TouchableOpacity style={local.menuItem} onPress={onPress} >
      <Icon name={icon} size={40} {...iconColor} />
      <Text testID={testID} style={[local.menuText, textColor]} >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

MenuItem.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}