import React, { Component } from 'react'
import './header.css';
import HeaderSearch from './HeaderSearch';
import Category from './category/Category';
import LogoImg from './category/Img/DAYOFF_logo3.png'
import Login from '../login/Login'
import { Link } from 'react-router-dom';

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
          <div>
            <div className='TotalHeader'>
                <div className='Header_Top'>
                  <Login history={this.props.history}></Login>
                <Link to='/cart'> <img className='cartlogo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_tGv3zp0DMgRlwrX-IigsyYiTWex_5B7PdYiKAhxlien9m6NF' alt='' /> 장바구니</Link>
            </div>

            <div className="Header">
                <Link to="/"><img className='logo' src={LogoImg} alt='' /></Link>
                <Category />
                <HeaderSearch />
            </div>
                </div>
                <div className="headerNone"></div>
          </div>
        )



        
    }else {
        return (
          <div>
            <div className='TotalHeader'>
             <div className='Header_Top'>
             <Login history={this.props.history}></Login>
            <Link to='/cart'> <img className='cartlogo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_tGv3zp0DMgRlwrX-IigsyYiTWex_5B7PdYiKAhxlien9m6NF' alt='' /> 장바구니</Link>
            </div>

            <div className="Header">
            <Link to="/"><img className='logo' src={LogoImg} alt='' /></Link>
                <Category />
                <HeaderSearch />
            </div>
            </div>
            <div className="headerNone"></div>
          </div>
        )
    }
}
}
