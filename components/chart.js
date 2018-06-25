import React, { Component } from 'react'
import { FlatList } from 'react-native'
import range from 'date-range'
import Svg,{
  G,
  Rect,
  Text,
  Circle,
  Line
} from 'react-native-svg'
import { LocalDate } from 'js-joda'
import { getCycleDay, getOrCreateCycleDay, cycleDaysSortedByDate } from '../db'
import getCycleDayNumberModule from '../get-cycle-day-number'
import styles from './styles'
import config from './config'

const getCycleDayNumber = getCycleDayNumberModule()


export default class CycleChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: makeColumnInfo(config.cycleDaysToShow)
    }

    this.reCalculateChartInfo = (function(Chart) {
      return function() {
        Chart.setState({columns: makeColumnInfo(config.cycleDaysToShow)})
      }
    })(this)

    cycleDaysSortedByDate.addListener(this.reCalculateChartInfo)
  }

  componentWillUnmount() {
    cycleDaysSortedByDate.removeListener(this.reCalculateChartInfo)
  }

  passDateToDayView(dateString) {
    const cycleDay = getOrCreateCycleDay(dateString)
    this.props.navigation.navigate('cycleDay', { cycleDay })
  }

  makeDayColumn({ dateString, cycleDay, y }, index) {
    const cycleDayNumber = getCycleDayNumber(dateString)
    const labelProps = styles.column.label
    const dateLabel = dateString.split('-').slice(1).join('-')

    return (
      <G key={dateString} onPress={() => this.passDateToDayView(dateString)}>
        <Rect {...styles.column.rect} />
        <Text {...labelProps} y={config.cycleDayNumberRowY}>{cycleDayNumber}</Text>
        <Text {...labelProps} y={config.dateRowY}>{dateLabel}</Text>

        {cycleDay && cycleDay.bleeding ? <Circle {...styles.bleedingIcon} /> : null}

        {y ? this.drawDotAndLines(y, index) : null}
      </G>
    )
  }

  drawDotAndLines(currY, index) {
    let lineToRight
    let lineToLeft
    const cols = this.state.columns

    function makeLine(otherColY, x) {
      const middleY = ((otherColY - currY) / 2) + currY
      const rightTarget = [x, middleY]
      return <Line
        x1={config.columnMiddle}
        y1={currY}
        x2={rightTarget[0]}
        y2={rightTarget[1]}
        {...styles.curve}
      />
    }

    const thereIsADotToTheRight = index > 0 && cols[index - 1].y
    const thereIsADotToTheLeft = index < cols.length - 1 && cols[index + 1].y

    if (thereIsADotToTheRight) {
      lineToRight = makeLine(cols[index - 1].y, config.columnWidth)
    }
    if (thereIsADotToTheLeft) {
      lineToLeft = makeLine(cols[index + 1].y, 0)
    }

    return (<G>
      <Circle
        cx={config.columnMiddle}
        cy={currY}
        {...styles.curveDots}
      />
      {lineToRight}
      {lineToLeft}
    </G>)
  }

  render() {
    return (
      <FlatList
        horizontal={true}
        inverted={true}
        data={this.state.columns}
        renderItem={({item, index}) => {
          return (
            <Svg width={config.columnWidth} height={config.chartLength}>
              {this.makeDayColumn(item, index)}
            </Svg>
          )
        }}
        keyExtractor={item => item.label}
      >
      </FlatList>
    )
  }
}

function makeColumnInfo(n) {
  const xAxisDates = getPreviousDays(n).map(jsDate => {
    return LocalDate.of(
      jsDate.getFullYear(),
      jsDate.getMonth() + 1,
      jsDate.getDate()
    ).toString()
  })

  return xAxisDates.map(dateString => {
    const cycleDay = getCycleDay(dateString)
    const temp = cycleDay && cycleDay.temperature && cycleDay.temperature.value
    return {
      dateString,
      cycleDay,
      y: temp ? normalizeToScale(temp) : null
    }
  })
}

function getPreviousDays(n) {
  const today = new Date()
  today.setHours(0); today.setMinutes(0); today.setSeconds(0); today.setMilliseconds(0)
  const twoWeeksAgo = new Date(today - (range.DAY * n))

  return range(twoWeeksAgo, today).reverse()
}

function normalizeToScale(temp) {
  const temperatureScale = config.temperatureScale
  const valueRelativeToScale = (temperatureScale.high - temp) / (temperatureScale.high - temperatureScale.low)
  const scaleHeight = config.chartLength
  return scaleHeight * valueRelativeToScale
}