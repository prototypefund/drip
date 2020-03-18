import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'

import FramedSegment from '../framed-segment'
import { GreyText } from '../app-text'
import { Title } from '../app-text'

import { connect } from 'react-redux'
import { getDimensions } from '../../slices/dimensions'

import labels from '../../i18n/en/settings'
import links from '../../i18n/en/links'
import { default as common } from '../../styles/redesign'

const AboutSection = ({ dimensions }) => {
  const { pageHeight } = dimensions
  return (
    <ScrollView style={[common.pageContainer, {height: pageHeight}]}>
      <Title>{labels.aboutSection.title}</Title>
      <FramedSegment>
        <GreyText>{labels.aboutSection.text}</GreyText>
      </FramedSegment>
      <FramedSegment title={labels.philosophy.title}>
        <GreyText>{labels.philosophy.text}</GreyText>
      </FramedSegment>
      <FramedSegment title={labels.credits.title}>
        <GreyText>{labels.credits.note}</GreyText>
      </FramedSegment>
      <FramedSegment title={labels.donate.title}>
        <GreyText>{labels.donate.note}</GreyText>
      </FramedSegment>
      <FramedSegment title={labels.website.title}>
        <GreyText>{links.website.url}</GreyText>
      </FramedSegment>
      <FramedSegment title={labels.version.title} last>
        <GreyText>{require('../../package.json').version}</GreyText>
      </FramedSegment>
    </ScrollView>
  )
}

AboutSection.propTypes = {
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
)(AboutSection)
