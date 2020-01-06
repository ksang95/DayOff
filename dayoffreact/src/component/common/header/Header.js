import React, { Component } from 'react'
import './header.css';
import HeaderSearch from './HeaderSearch';
import Category from './category/Category';
import LogoImg from '../../main/Img/DAYOFF_logo3.png';
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
          <div className='TotalHeader'>
            <div className='imgHeader'>
            <Login history={this.props.history}></Login>
              <Link to='/cart'> <img className='cartlogo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_tGv3zp0DMgRlwrX-IigsyYiTWex_5B7PdYiKAhxlien9m6NF' alt='' /> 장바구니</Link>
            </div>
              <div className='Header_Top'>
              <Link to={"/"}><img className='logo' src={logoImg}></img></Link>
          </div>

          <div className="Header">
              <Link to={"/"}><img className='logo' src='' alt='' /></Link>
              <Category />
              <HeaderSearch />
          </div>
              </div>
      )



      
  }else {
      return (
          <div className='TotalHeader'>
          <div className='Toplogin_Info'>
          <a>길용성{sessionStorage.getItem("userId")}</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={"/"}> 로그아웃</Link> &nbsp;&nbsp;
          <Link to={"/"}> <img className='cartlogo' src='https://i.pinimg.com/474x/a1/9b/e9/a19be91f8b17de33ff7dbe40f6a796ce.jpg' alt='' /> 장바구니</Link>
          </div>
          <div className='imgHeader'>
          </div>
           <div className='Header_Top'>
           <Link to={"/"}><img className='logo' src={logoImg}></img></Link>
          </div>

          <div className="Header">
              <Category />
              <HeaderSearch />
          </div>
              </div>
      )
  }
}
}
