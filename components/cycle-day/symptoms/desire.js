import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import { intensity as labels } from '../labels/labels'
import ActionButtonFooter from './action-button-footer'

export default class Desire extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.makeActionButtons = props.makeActionButtons
    let desireValue = this.cycleDay.desire && this.cycleDay.desire.value
    if (!(typeof desireValue === 'number')) {
      desireValue = -1
    }
    this.state = { currentValue: desireValue }
  }

  render() {
    const desireRadioProps = [
      { label: labels[0], value: 0 },
      { label: labels[1], value: 1 },
      { label: labels[2], value: 2 }
    ]
    return (
      <View style={styles.menuOnBottom}>
        <View>
          <View style={styles.radioButtonRow}>
            <RadioForm
              radio_props={desireRadioProps}
              initial={this.state.currentValue}
              formHorizontal={true}
              labelHorizontal={false}
              labelStyle={styles.radioButton}
              onPress={(itemValue) => {
                this.setState({ currentValue: itemValue })
              }}
            />
          </View>
        </View>
        <ActionButtonFooter
          symptom='desire'
          cycleDay={this.cycleDay}
          saveAction={() => {
            saveSymptom('desire', this.cycleDay, { value: this.state.currentValue })
          }}
          saveDisabled={this.state.currentValue === -1}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
