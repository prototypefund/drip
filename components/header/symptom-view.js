import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'

import styles, { iconStyles } from '../../styles'
import Icon from 'react-native-vector-icons/AntDesign'
import NavigationArrow from './navigation-arrow'
import formatDate from '../helpers/format-date'

import { getDate } from '../../slices/date'

const SymptomViewHeader = (props) => {
  const middle = Dimensions.get('window').width / 2
  return (
    <View style={[styles.header, styles.headerCycleDay, styles.headerSymptom]}>
      <View
        style={styles.accentCircle}
        left={middle - styles.accentCircle.width / 2}
      />
      <NavigationArrow
        direction='left'
        {...props}
      />
      <View>
        <Text style={styles.dateHeader}>
          {props.title}
        </Text>
        <Text style={styles.cycleDayNumber}>
          {formatDate(props.date)}
        </Text>
      </View >
      { props.deleteIconActive &&
        <TouchableOpacity
          onPress={props.deleteEntry}
          style={[
            styles.headerDeleteButton,
          ]}
        >
          <Icon
            name="delete"
            {...iconStyles.symptomHeaderIcons}
          />
        </TouchableOpacity>
      }

    </View>
  )
}

const mapStateToProps = (state) => {
  return({
    date: getDate(state)
  })
}

export default connect(
  mapStateToProps,
  null
)(SymptomViewHeader)
