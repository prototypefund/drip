import React, { Component } from 'react'
import {
  View,
  ScrollView,
  TextInput,
} from 'react-native'

import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import ActionButtonFooter from './action-button-footer'
import Header from '../../header'
import SymptomSection from './symptom-section'
import { noteExplainer } from '../../../i18n/en/cycle-day'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import { dirtyAlert } from './dirtyAlert'

export default class Note extends Component {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.note = cycleDay && cycleDay.note
    this.makeActionButtons = props.makeActionButtons

    this.state = {
      currentValue: this.note && this.note.value || '',
      dirty: false
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header {...this.props} goBack={() => dirtyAlert(this.state.dirty, this.props.goBack)} />

        <ScrollView style={styles.page}>
          <SymptomSection
            explainer={noteExplainer}
          >
            <TextInput
              autoFocus={!this.state.currentValue}
              multiline={true}
              placeholder={sharedLabels.enter}
              onChangeText={(val) => {
                this.setState({ currentValue: val, dirty: true })
              }}
              value={this.state.currentValue}
            />
          </SymptomSection>
        </ScrollView>
        <ActionButtonFooter
          symptom='note'
          date={this.props.date}
          currentSymptomValue={this.note}
          saveAction={() => {
            this.setState({ dirty: false })
            saveSymptom('note', this.props.date, {
              value: this.state.currentValue
            })
          }}
          saveDisabled={!this.state.currentValue}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
