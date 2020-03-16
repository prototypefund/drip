import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

import AppText from '../app-text'
import SideMenu from './side-menu'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'

import { default as local } from './styles'

class Header extends Component {

  static propTypes = { navigate: PropTypes.func.isRequired }
  state = { showMenu: false }

  constructor(props) {
    super(props)

    this.changeMenuState = this.changeMenuState.bind(this)
  }

  changeMenuState() {
    this.setState({ showMenu: !this.state.showMenu})
  }

  componentWillUnmount() {
    this.setState({ showMenu: false})
  }

  render() {
    const { showMenu } = this.state

    return (
      <View style={local.header}>
        <DripIcon navigate={this.props.navigate}/>
        <SideMenu showMenu={showMenu} onPress={this.changeMenuState}/>
      </View >
    )
  }
}

const DripIcon = ({ navigate }) => {
  return(
    <TouchableOpacity onPress={() => navigate('Home')}>
      <AppText style={local.headerText}>drip.</AppText>
    </TouchableOpacity>
  )
}

DripIcon.propTypes = { navigate: PropTypes.func }

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  null,
  mapDispatchToProps,
)(Header)
