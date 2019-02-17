import React, { Component } from 'react'
import {
  ScrollView,
  TextInput,
  View
} from 'react-native'
import { saveSymptom } from '../../../db'
import { mood as labels } from '../../../i18n/en/cycle-day'
import ActionButtonFooter from './action-button-footer'
import Header from '../../header'
import SelectBoxGroup from '../select-box-group'
import SymptomSection from './symptom-section'
import styles from '../../../styles'
import { dirtyAlert } from './dirtyAlert'

export default class Mood extends Component {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    if (cycleDay && cycleDay.mood) {
      this.state = Object.assign({}, cycleDay.mood)
    } else {
      this.state = {}
    }
    if (this.state.note) {
      this.state.other = true
    }
  }

  toggleState = (key) => {
    const curr = this.state[key]
    this.setState({
      [key]: !curr,
      dirty: true
    })
    if (key === 'other' && !curr) {
      this.setState({
        focusTextArea: true,
        dirty: true
      })
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header {...this.props} goBack={() => dirtyAlert(this.state.dirty, this.props.goBack)} />

        <ScrollView style={styles.page}>
          <SymptomSection
            explainer={labels.explainer}
          >
            <SelectBoxGroup
              labels={labels.categories}
              onSelect={this.toggleState}
              optionsState={this.state}
            />
            { this.state.other &&
              <TextInput
                autoFocus={this.state.focusTextArea}
                multiline={true}
                placeholder="Enter"
                value={this.state.note}
                onChangeText={(val) => {
                  this.setState({note: val})
                }}
              />
            }
          </SymptomSection>
        </ScrollView>
        <ActionButtonFooter
          symptom='mood'
          date={this.props.date}
          currentSymptomValue={this.state}
          saveAction={() => {
            this.setState({ dirty: false })
            const copyOfState = Object.assign({}, this.state)
            if (!copyOfState.other) {
              copyOfState.note = null
            }
            saveSymptom('mood', this.props.date, copyOfState)
          }}
          saveDisabled={Object.values(this.state).every(value => !value)}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
