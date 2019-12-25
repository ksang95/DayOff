import React, { Component } from 'react'
import './header.css';
import Login from '../login/Login';
//import Contact from '../../Search/Contact';

export default class HeaderSearch extends Component {
  render() {
    return (
        <div className='HeaderSearch'>
        <div className='headerA'>
        <Login history={this.props.history}></Login>
         <a href='/'> <img className='cartlogo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_tGv3zp0DMgRlwrX-IigsyYiTWex_5B7PdYiKAhxlien9m6NF' alt='' /> 장바구니</a>
        {/* <Contact /> */}
        </div>
      </div>

      
    )
  }
}
