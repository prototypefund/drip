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

export const GreyText = ({ children, style, ...props }) => {
  return(
    <AppText style={[styles.greyText, style]} {...props} >
      {children}
    </AppText>)
}

GreyText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

export const OrangeText = ({ children, style, ...props }) => {
  return(
    <AppText style={[styles.orangeText, style]} {...props} >
      {children}
    </AppText>
  )
}

OrangeText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

export const PurpleText = ({ children, style, ...props }) => {
  return(
    <AppText style={[styles.purpleText, style]} {...props} >
      {children}
    </AppText>
  )
}

PurpleText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

export const WhiteText = ({ children, style, ...props }) => {
  return(
    <AppText style={[styles.whiteText, style]} {...props} >
      {children}
    </AppText>
  )
}

WhiteText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

export const Title = ({ children, style, ...props}) => {
  return(
    <AppText style={[styles.title, style]} {...props} >
      {children}
    </AppText>
  )
}

Title.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}