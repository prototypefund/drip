import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import AppText from './app-text'
import styles from '../styles/redesign'

export default function Button({ children, onPress, style, testID }) {
  const commonStyle = [styles.button, style]

  return (
    <TouchableOpacity onPress={onPress} style={commonStyle} testID={testID} >
      <AppText style={styles.buttonText}>{children}</AppText>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  testID: PropTypes.string,
}
