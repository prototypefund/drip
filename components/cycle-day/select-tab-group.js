import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import styles from '../../styles'
import AppText from '../app-text'

export default class SelectTabGroup extends Component {
  render() {
    const { buttons, active, onSelect } = this.props
    return (
      <View style={styles.selectTabGroup}>
        {
          buttons.map(({ label, value }, i) => {
            let firstOrLastStyle
            if (i === buttons.length - 1) {
              firstOrLastStyle = styles.selectTabLast
            } else if (i === 0) {
              firstOrLastStyle = styles.selectTabFirst
            }
            let activeStyle
            const isActive = value === active
            if (isActive) activeStyle = styles.selectTabActive
            return (
              <TouchableOpacity
                onPress={() => isActive ? onSelect(null) : onSelect(value)}
                key={i}
                activeOpacity={1}
              >
                <View>
                  <View style={[
                    styles.selectTab,
                    firstOrLastStyle,
                    activeStyle
                  ]}>
                    <AppText style={activeStyle}>{label}</AppText>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}