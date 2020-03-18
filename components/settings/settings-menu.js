import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, ScrollView, View } from 'react-native'

import Icon from 'react-native-vector-icons/Entypo'
import { GreyText, PurpleText, Title } from '../app-text'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'
import { getDimensions } from '../../slices/dimensions'

import { default as common } from '../../styles/redesign'
import { default as local } from './styles'
import settingsLabels from '../../i18n/en/settings'
import { headerTitles } from '../../i18n/en/labels'
const menu = settingsLabels.menu

const SettingsMenu = ({ navigate, dimensions }) => {
  const { isPortrait, pageHeight } = dimensions

  return (
    <ScrollView style={[common.pageContainer, {height: pageHeight}]}>
      <Title>{headerTitles.SettingsMenu}</Title>
      { menu.map(menuItem)}
    </ScrollView>
  )

  function menuItem(item) {
    const style = isPortrait ? common.flexColumn : common.flexRow
    const textStyle = isPortrait ? {} : common.marginRight

    return (
      <TouchableOpacity
        style={local.settingsMenu}
        key={item.title}
        onPress={() => navigate(item.component)}
      >
        <View style={local.menuItemContainer}>
          <View style={style}>
            <PurpleText style={textStyle}>{item.title}</PurpleText>
            <GreyText>{item.description}</GreyText>
          </View>
          <Icon name={'chevron-right'} style={local.icon}/>
        </View>
        {item.title !== 'Password' && <View style={common.line}></View>}
      </TouchableOpacity>
    )
  }
}

SettingsMenu.propTypes = {
  dimensions: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return({
    dimensions: getDimensions(state),
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMenu)