import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

import AppText from '../app-text'
import SideMenu from './side-menu'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'
import { getDimensions } from '../../slices/dimensions'

import { default as local } from './styles'

class Header extends Component {

  static propTypes = {
    dimensions: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired
  }
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
    const { headerHeight } = this.props.dimensions

    return (
      <View style={[local.header, {height: headerHeight}]}>
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
  mapDispatchToProps,
)(Header)
