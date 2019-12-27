import React, { Component } from 'react'

class NavItem extends Component {
  render() {
    const { name } = this.props;
    return (
      <div className='NavItem'>
        {name}
      </div>
    )
  }
}

export default NavItem;
