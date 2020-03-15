import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View } from 'react-native'

import { LocalDate } from 'js-joda'
import AppText from './app-text'
import Button from './button'

import { connect } from 'react-redux'
import { navigate } from '../slices/navigation'
import { getDate, setDate } from '../slices/date'
import cycleModule from '../lib/cycle'
import { getFertilityStatusForDay } from '../lib/sympto-adapter'
import { determinePredictionText, dateEnding } from './helpers/home'

import styles from '../styles/redesign'
import { homeRedesign as labels, home as cycle } from '../i18n/en/labels'

class Home extends Component {

  static propTypes = {
    navigate: PropTypes.func,
    setDate: PropTypes.func,
  }

  constructor(props) {
    super(props)

    const today = LocalDate.now()
    this.todayDateString = today.toString()
    const { getCycleDayNumber, getPredictedMenses } = cycleModule()
    this.cycleDayNumber = getCycleDayNumber(this.todayDateString)
    const {status, phase, statusText} =
      getFertilityStatusForDay(this.todayDateString)
    const prediction = getPredictedMenses()

    this.cycleDayText = !this.cycleDayNumber ? cycle.cycleDayNotEnoughInfo
      : `${this.cycleDayNumber}${dateEnding[this.cycleDayNumber] || dateEnding['default']}`
    this.phase = phase
    this.phaseText = !phase ? statusText
      : `${phase}${dateEnding[phase] || dateEnding['default']}`
    this.predictionText = determinePredictionText(prediction)
    this.status = status
    this.statusDescription = statusText
    this.titleText = `${today.dayOfMonth()} ${today.month()}`
  }

  navigateToCycleDayView = () => {
    this.props.setDate(this.todayDateString)
    this.props.navigate('CycleDay')
  }

  render() {
    const {
      cycleDayText,
      phase,
      phaseText,
      predictionText,
      status,
      statusDescription,
      titleText
    } = this

    return (
      <View style={styles.homePageContainer}>
        <ScrollView
          contentContainerStyle={styles.homeContentContainer}
          vertical={true}
        >
          <AppText style={styles.titleText}>{titleText}</AppText>
          <TextLine>
            {this.cycleDayNumber && (
              <React.Fragment>
                <WhiteText>{cycleDayText}</WhiteText>
                <AppText>{labels.cycleDay}</AppText>
              </React.Fragment>
            )}
            {!this.cycleDayNumber && <AppText>{cycleDayText}</AppText>}
          </TextLine>
          <TextLine>
            {!phase && <AppText>{phaseText}</AppText>}
            {phase && (
              <React.Fragment>
                <WhiteText>{phaseText}</WhiteText>
                <AppText>{labels.cyclePhase}</AppText>
                <WhiteText>{status}</WhiteText>
                <Asterisk />
              </React.Fragment>
            )}
          </TextLine>
          <TextLine>
            <AppText>{predictionText}</AppText>
          </TextLine>
          <Button onPress={this.navigateToCycleDayView}>
            {labels.addData}
          </Button>
          {phase && (
            <View style={styles.itemRow}>
              <Asterisk />
              <Hint>{statusDescription}</Hint>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

const WhiteText = ({children}) => {
  return(
    <AppText style={styles.whiteText}>{children}</AppText>
  )
}

WhiteText.propTypes = {
  children: PropTypes.node
}

const Hint = ({children}) => {
  return(
    <AppText style={styles.hintText}>{children}</AppText>
  )
}

Hint.propTypes = {
  children: PropTypes.node
}

const Asterisk = () => {
  return(
    <AppText style={styles.orangeText}>*</AppText>
  )
}

const TextLine = ({children}) => {
  return(
    <View style={styles.lineContainer}>{children}</View>
  )
}

TextLine.propTypes = {
  children: PropTypes.node
}

const mapStateToProps = (state) => {
  return({
    date: getDate(state),
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
    setDate: (date) => dispatch(setDate(date)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
