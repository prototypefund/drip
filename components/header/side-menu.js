import React, { Component } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Entypo'

import { PurpleText } from '../app-text'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'
import { getDimensions } from '../../slices/dimensions'

import { default as common } from '../../styles/redesign'
import { default as local } from './styles'

const settingsMenuItems = [
  {name: 'Settings', component: 'SettingsMenu'},
  {name: 'About', component: 'About'},
  {name: 'License', component: 'License'},
]

class SideMenu extends Component {
  static propTypes = {
    dimensions: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
    showMenu: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)

    this.state = { menuStyle: [] }
  }

  navigateMenuItem = (page) => {
    this.props.onPress()
    this.props.navigate(page)
  }

  render() {
    const { dimensions, onPress, showMenu } = this.props
    const { screenHeight, screenWidth, isPortrait } = dimensions

    const menuCalcCoeff = isPortrait ? 0.6 : 0.4
    const menuWidth = screenWidth * menuCalcCoeff
    const margin = screenWidth * (1 - menuCalcCoeff)
    const menuStyle = ([common.homeContentContainer, local.settingsMenu,
      { height: screenHeight, width: menuWidth, marginLeft: margin}])

    return(
      <React.Fragment>
        {!showMenu &&
          <TouchableOpacity onPress={onPress}>
            <Icon name={'dots-three-vertical'} style={local.headerIcon}/>
          </TouchableOpacity>
        }
        {showMenu &&
          <Modal
            animationType='fade'
            onRequestClose={onPress}
            transparent={true}
            visible={showMenu}
          >
            <View style={local.modalBackground}></View>
            <View style={menuStyle}>
              <TouchableOpacity onPress={onPress} style={local.threeDots} >
                <Icon name={'cross'} style={local.cross}/>
              </TouchableOpacity>
              {settingsMenuItems.map(item =>
                <MenuItem
                  item={item}
                  key={item.name}
                  navigate={this.navigateMenuItem}
                />
              )}
            </View>
          </Modal>
        }
      </React.Fragment>
    )
  }
}

const MenuItem = ({ item, navigate }) => {
  return(
    <View style={local.menuItem}>
      <TouchableOpacity onPress={() => navigate(item.component)}>
        <PurpleText>{item.name}</PurpleText>
      </TouchableOpacity>
    </View>
  )
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return({
    dimensions: getDimensions(state)
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu)
