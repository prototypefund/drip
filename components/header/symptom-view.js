import React from 'react'
import {
  View,
  Text} from 'react-native'
import styles, { iconStyles } from '../../styles'
import FeatherIcon from 'react-native-vector-icons/Feather'
import NavigationArrow from './navigation-arrow'

export default function SymptomViewHeader(props) {
  return (
    <View style={[styles.header, styles.headerCycleDay, styles.headerSymptom]}>
      <View
        style={styles.accentCircle}
        left={props.middle - styles.accentCircle.width / 2}
      />
      <NavigationArrow
        direction='left'
        {...props}
      />
      <View>
        <Text style={styles.dateHeader}>
          {props.title}
        </Text>
      </View >
      <FeatherIcon
        name='info'
        style={styles.symptomInfoIcon}
        {...iconStyles.symptomHeaderIcons}
      />
    </View>
  )
}