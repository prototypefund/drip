import React, { Component } from 'react'
import { Dimensions, Modal, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Entypo'

import { PurpleText } from '../app-text'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'

import { default as common } from '../../styles/redesign'
import { default as local } from './styles'

const settingsMenuItems = [
  {name: 'Settings', component: 'SettingsMenu'},
  {name: 'About', component: 'About'},
  {name: 'License', component: 'License'},
]

class SideMenu extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
    showMenu: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)

    this.state = { menuStyle: [] }
  }

  onLayout = () => {
    const screenHeight = Math.round(Dimensions.get('window').height)
    const screenWidth = Math.round(Dimensions.get('window').width)
    const isPortraitLayout = screenWidth < screenHeight ? true : false
    const menuCalcCoeff = isPortraitLayout ? 0.6 : 0.4
    const menuWidth = screenWidth * menuCalcCoeff
    const margin = screenWidth * (1 - menuCalcCoeff)
    const menuStyle = ([common.homeContentContainer, local.settingsMenu,
      { height: screenHeight, width: menuWidth, marginLeft: margin}])

    this.setState({ menuStyle })
  }

  navigateMenuItem = (page) => {
    this.props.onPress()
    this.props.navigate(page)
  }

  render() {
    const { onPress, showMenu } = this.props
    const { menuStyle } = this.state

    return(
      <React.Fragment>
        {!showMenu &&
          <TouchableOpacity onPress={onPress}>
            <Icon name={'dots-three-vertical'} style={local.headerIcon}/>
          </TouchableOpacity>
        }
        {showMenu &&
          <View onLayout={this.onLayout}>
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
          </View>
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
  navigate: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page))
  })
}

export default connect(
  null,
  mapDispatchToProps,
)(SideMenu)
