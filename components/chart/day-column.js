import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity
} from 'react-native'
import Svg,{ G, Rect, Line } from 'react-native-svg'
import { LocalDate } from 'js-joda'
import moment from 'moment'
import styles from './styles'
import config from '../../config'
import { getOrCreateCycleDay } from '../../db'
import cycleModule from '../../lib/cycle'
import { getCycleDay } from '../../db'
import DotAndLine from './dot-and-line'
import { normalizeToScale } from './y-axis'

const label = styles.column.label

export default class DayColumn extends Component {
  constructor(props) {
    super()
    const dateString = props.dateString
    const columnHeight = props.columnHeight
    this.getCycleDayNumber = cycleModule().getCycleDayNumber
    const cycleDay = getCycleDay(dateString)
    this.data = {}
    if (cycleDay) {
      this.data = props.chartSymptoms.reduce((acc, symptom) => {
        if (['bleeding', 'temperature', 'mucus', 'desire', 'note'].includes(symptom)) {
          acc[symptom] = cycleDay[symptom] && cycleDay[symptom].value
          if (symptom === 'temperature' && acc.temperature) {
            acc.y = normalizeToScale(acc.temperature, columnHeight)
            const neighbor = getInfoForNeighborColumns(dateString, columnHeight)
            for (const key in neighbor) {
              acc[key] = neighbor[key]
            }
          }
        } else if (symptom === 'cervix') {
          acc.cervix = cycleDay.cervix &&
            (cycleDay.cervix.opening + cycleDay.cervix.firmness)
        } else if (symptom === 'sex') {
          // solo = 1 + partner = 2
          acc.sex = cycleDay.sex &&
            (cycleDay.sex.solo + 2 * cycleDay.sex.partner)
        } else if (symptom === 'pain') {
          // is any pain documented?
          acc.pain = cycleDay.pain &&
            Object.values(cycleDay.pain).some(x => x === true)
        }
        acc[`${symptom}Exclude`] = cycleDay[symptom] && cycleDay[symptom].exclude
        return acc
      }, this.data)
    }

    this.fhmAndLtl = props.getFhmAndLtlInfo(
      props.dateString,
      props.temp,
      props.columnHeight
    )
  }

  passDateToDayView(dateString) {
    const cycleDay = getOrCreateCycleDay(dateString)
    this.props.navigate('CycleDay', { cycleDay })
  }

  shouldComponentUpdate(newProps) {
    return Object.keys(newProps).some(key => newProps[key] != this.props[key])
  }

  render() {
    const columnElements = []
    const dateString = this.props.dateString
    const symptomHeight = this.props.symptomHeight

    if(this.fhmAndLtl.drawLtlAt) {
      const ltlLine = (<Line
        x1={0}
        y1={this.fhmAndLtl.drawLtlAt}
        x2={config.columnWidth}
        y2={this.fhmAndLtl.drawLtlAt}
        {...styles.nfpLine}
        key='ltl'
      />)
      columnElements.push(ltlLine)
    }

    if (this.fhmAndLtl.drawFhmLine) {
      const x = styles.nfpLine.strokeWidth / 2
      const fhmLine = (<Line
        x1={x}
        y1={x}
        x2={x}
        y2={this.props.columnHeight}
        {...styles.nfpLine}
        key='fhm'
      />)
      columnElements.push(fhmLine)
    }


    if (this.data.y) {
      columnElements.push(
        <DotAndLine
          y={this.data.y}
          exclude={this.data.temperatureExclude}
          rightY={this.data.rightY}
          rightTemperatureExclude={this.data.rightTemperatureExclude}
          leftY={this.data.leftY}
          leftTemperatureExclude={this.data.leftTemperatureExclude}
          key='dotandline'
        />
      )
    }

    const cycleDayNumber = this.getCycleDayNumber(dateString)
    const dayDate = LocalDate.parse(dateString)
    const shortDate = dayDate.dayOfMonth() === 1 ?
      moment(dateString, "YYYY-MM-DD").format('MMM')
      :
      moment(dateString, "YYYY-MM-DD").format('Do')
    const boldDateLabel = dayDate.dayOfMonth() === 1 ? {fontWeight: 'bold'} : {}
    const cycleDayLabel = (
      <Text style = {label.number}>
        {cycleDayNumber ? cycleDayNumber : ' '}
      </Text>)
    const dateLabel = (
      <Text style = {[label.date, boldDateLabel]}>
        {shortDate}
      </Text>
    )

    const column = (
      <G>
        <Rect
          height={this.props.chartHeight}
          {...styles.column.rect}
        />
        { columnElements }
      </G>
    )

    const symptomIconViews = {
      bleeding: (
        <SymptomIconView
          value={this.data.bleeding}
          symptomHeight={symptomHeight}
          key='bleeding'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.bleeding[this.data.bleeding]}
          />
        </SymptomIconView>
      ),
      mucus: (
        <SymptomIconView
          value={this.data.mucus}
          symptomHeight={symptomHeight}
          key='mucus'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.mucus[this.data.mucus]}
          />
        </SymptomIconView>
      ),
      cervix: (
        <SymptomIconView
          value={this.data.cervix}
          symptomHeight={symptomHeight}
          key='cervix'
        >
          <View
            {...styles.symptomIcon}
            // cervix is sum of openess and firmness - fertile only when closed and hard (=0)
            backgroundColor={this.data.cervix > 0 ?
              styles.iconShades.cervix[2] :
              styles.iconShades.cervix[0]
            }
          />
        </SymptomIconView>
      ),
      sex: (
        <SymptomIconView
          value={this.data.sex}
          symptomHeight={symptomHeight}
          key='sex'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.sex[this.data.sex - 1]}
          />
        </SymptomIconView>
      ),
      desire: (
        <SymptomIconView
          value={this.data.desire}
          symptomHeight={symptomHeight}
          key='desire'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.desire[this.data.desire]}
          />
        </SymptomIconView>
      ),
      pain: (
        <SymptomIconView
          value={this.data.pain}
          symptomHeight={symptomHeight}
          key='pain'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.pain}
          />
        </SymptomIconView>
      ),
      note: (
        <SymptomIconView
          value={this.data.note}
          symptomHeight={symptomHeight}
          key='note'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.note}
          />
        </SymptomIconView>
      )
    }

    return (
      <TouchableOpacity
        onPress={() => this.passDateToDayView(dateString)}
        activeOpacity={1}
      >
        <View>
          {this.props.symptomRowSymptoms.map(symptomName => {
            return symptomIconViews[symptomName]
          })}
        </View>

        <Svg width={config.columnWidth} height={this.props.columnHeight}>
          {column}
        </Svg>

        <View style={{height: this.props.xAxisHeight}}>
          {cycleDayLabel}
          {dateLabel}
        </View>
      </TouchableOpacity>
    )
  }
}


function SymptomIconView(props) {
  const style = [styles.symptomRow, {height: props.symptomHeight}]
  return (
    <View style={style}>
      {(typeof props.value === 'number' || props.value === true || typeof props.value === 'string') &&
        props.children
      }
    </View>
  )
}

function getInfoForNeighborColumns(dateString, columnHeight) {
  const ret = {
    rightY: null,
    rightTemperatureExclude: null,
    leftY: null,
    leftTemperatureExclude: null
  }
  const target = LocalDate.parse(dateString)
  const dayBefore = target.minusDays(1).toString()
  const dayAfter = target.plusDays(1).toString()
  const cycleDayBefore = getCycleDay(dayBefore)
  const cycleDayAfter = getCycleDay(dayAfter)
  if (cycleDayAfter && cycleDayAfter.temperature) {
    ret.rightY = normalizeToScale(cycleDayAfter.temperature.value, columnHeight)
    ret.rightTemperatureExclude = cycleDayAfter.temperature.exclude
  }
  if (cycleDayBefore && cycleDayBefore.temperature) {
    ret.leftY = normalizeToScale(cycleDayBefore.temperature.value, columnHeight)
    ret.leftTemperatureExclude = cycleDayBefore.temperature.exclude
  }

  return ret
}
