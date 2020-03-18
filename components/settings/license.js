import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'

import { GreyText } from '../app-text'
import FramedSegment from '../framed-segment'
import { Title } from '../app-text'

import { connect } from 'react-redux'
import { getDimensions } from '../../slices/dimensions'

import labels from '../../i18n/en/settings'
import { default as common } from '../../styles/redesign'

const License = ({ dimensions }) => {
  const { pageHeight } = dimensions
  return (
    <ScrollView style={[common.pageContainer, {height: pageHeight}]}>
      <Title>{labels.menuTitles.license}</Title>
      <FramedSegment title={labels.license.title} last>
        <GreyText>{`${labels.license.text} `}</GreyText>
      </FramedSegment>
    </ScrollView>
  )
}

License.propTypes = {
  dimensions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return({
    dimensions: getDimensions(state),
  })
}

export default connect(
  mapStateToProps,
  null,
)(License)
