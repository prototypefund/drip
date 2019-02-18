import {
  BackHandler,
  ScrollView,
  Switch,
  View
} from 'react-native'
import React, { Component } from 'react'

import ActionButtonFooter from './action-button-footer'
import Header from '../../header'
import SelectTabGroup from '../select-tab-group'
import SymptomSection from './symptom-section'
import { bleeding } from '../../../i18n/en/cycle-day'
import { saveSymptom } from '../../../db'
import styles from '../../../styles'
import { dirtyAlert } from './dirtyAlert'

export default class Bleeding extends Component {
  backListener = () => null

  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.bleeding = cycleDay && cycleDay.bleeding
    this.makeActionButtons = props.makeActionButtons
    this.state = {
      dirty: false,
      currentValue: this.bleeding && this.bleeding.value,
      exclude: this.bleeding ? this.bleeding.exclude : false
    }
  }

  componentDidMount () {
    this.backListener = BackHandler.addEventListener('hardwareBackPress', () => {
      dirtyAlert(this.state.dirty, this.props.goBack)
      return true
    })
  }

  componentDidUnmout () {
    BackHandler.removeEventListener('hardwareBackPress', this.backListener)
  }

  render() {
    const bleedingRadioProps = [
      { label: bleeding.labels[0], value: 0 },
      { label: bleeding.labels[1], value: 1 },
      { label: bleeding.labels[2], value: 2 },
      { label: bleeding.labels[3], value: 3 },
    ]
    return (
      <View style={{ flex: 1 }}>
        <Header {...this.props} goBack={() => dirtyAlert(this.state.dirty, this.props.goBack)} />

        <ScrollView style={styles.page}>
          <SymptomSection
            header={bleeding.heaviness.header}
            explainer={bleeding.heaviness.explainer}
          >
            <SelectTabGroup
              buttons={bleedingRadioProps}
              active={this.state.currentValue}
              onSelect={val => this.setState({ currentValue: val, dirty: true })}
            />
          </SymptomSection>
          <SymptomSection
            header={bleeding.exclude.header}
            explainer={bleeding.exclude.explainer}
            inline={true}
          >
            <Switch
              onValueChange={(val) => {
                this.setState({ exclude: val })
              }}
              value={this.state.exclude}
            />
          </SymptomSection>
        </ScrollView>
        <ActionButtonFooter
          symptom='bleeding'
          date={this.props.date}
          currentSymptomValue={this.bleeding}
          saveAction={() => {
            this.setState({ dirty: false })
            saveSymptom('bleeding', this.props.date, {
              value: this.state.currentValue,
              exclude: this.state.exclude
            })
          }}
          saveDisabled={typeof this.state.currentValue != 'number'}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}