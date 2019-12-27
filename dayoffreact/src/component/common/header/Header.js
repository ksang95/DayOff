import React, { Component } from 'react'
import './header.css';
import HeaderSearch from './HeaderSearch';
import Category from './category/Category';
import LogoImg from './category/Img/DAYOFF_logo3.png'
import Login from '../login/Login'

export default class Header extends Component {
    state = {
        login: false
      }
    
      componentDidMount() {
        if(sessionStorage.getItem("userId")){
          this.setState({
            login:true
          })
        }
        else{
          this.setState({
            login:false
          })
        }
      }

    render() {
        if(this.state.login===true) {
        return (
            <div className='TotalHeader'>
                <div className='Header_Top'>
                  <Login history={this.props.hisotry}></Login>
                <a href='/'> <img className='cartlogo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_tGv3zp0DMgRlwrX-IigsyYiTWex_5B7PdYiKAhxlien9m6NF' alt='' /> 장바구니</a>
            </div>

            <div className="Header">
                <img className='logo' src={LogoImg} alt='' />
                <Category />
                <HeaderSearch />
            </div>
                </div>
        )



        
    }else {
        return (
            <div className='TotalHeader'>
             <div className='Header_Top'>
             <Login history={this.props.hisotry}></Login>
            <a href='/'> <img className='cartlogo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_tGv3zp0DMgRlwrX-IigsyYiTWex_5B7PdYiKAhxlien9m6NF' alt='' /> 장바구니</a>
            </div>

            <div className="Header">
                <img className='logo' src={LogoImg} alt='' />
                <Category />
                <HeaderSearch />
            </div>
                </div>
        )
    }
}
}
