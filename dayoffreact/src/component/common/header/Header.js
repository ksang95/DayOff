import React, { Component } from 'react'
import './header.css';
import HeaderSearch from './HeaderSearch';
// import HeaderSearchch from './category/HeaderSearchch';
import Category from './category/Category';


export default class Header extends Component {
    render() {
        return (
            <div className="Header">
                <img className='logo' src='https://66girls.co.kr/web/upload/images/2018/logo_kr1.png' alt='' />
                <Category />
                {/* <HeaderSearchch /> */}
                <HeaderSearch history={this.props.history}/>
            </div>
        )
    }
}
