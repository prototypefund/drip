import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import styles from '../styles/redesign'
import Link from './link'

export default function AppText({ children, onPress, numberOfLines, style}) {
  // we parse for links in case the text contains any
  return (
    <Link>
      <Text style={[styles.mainText, style]}
        onPress={onPress}
        numberOfLines={numberOfLines}
      >
        {children}
      </Text>
    </Link>
  )
}

AppText.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  numberOfLines: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export const OrangeText = ({ children, ...props }) => {
  return(<AppText style={styles.orangeText} {...props} >{children}</AppText>)
}

OrangeText.propTypes = { children: PropTypes.node }

export const PurpleText = ({ children, ...props }) => {
  return(<AppText style={styles.purpleText} {...props} >{children}</AppText>)
}

PurpleText.propTypes = { children: PropTypes.node }

export const WhiteText = ({children}) => {
  return(<AppText style={styles.whiteText}>{children}</AppText>)
}

WhiteText.propTypes = { children: PropTypes.node }