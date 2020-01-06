import React, { Component } from 'react'
import './header.css';
import HeaderSearch from './HeaderSearch';
import Category from './category/Category';
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
      if(this.state.login===false) {
      return (
          <div className='TotalHeader'>
            <div className='Toplogin_Info'>
            <Login history={this.props.history}></Login>
            <Link to='/cart'> <img className='cartlogo' src='https://i.pinimg.com/474x/a1/9b/e9/a19be91f8b17de33ff7dbe40f6a796ce.jpg' alt='' /> 장바구니</Link>
            </div>
            <div className='imgHeader'>
              </div>
              <div className='Header_Top'>
              <Link to={"/"}><img className='logo' src={"/images/DAYOFF_logo3.png"}></img></Link>
          </div>

          <div className="Header">
              <Category />
              <HeaderSearch />
          </div>
          </div>
      )



      
  }else {
      return (
          <div className='TotalHeader'>
          <div className='Toplogin_Info'>
          <a>{sessionStorage.getItem("userId")}</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={"/"}> 로그아웃</Link> &nbsp;&nbsp;
          <Link to={"/"}> <img className='cartlogo' src='https://i.pinimg.com/474x/a1/9b/e9/a19be91f8b17de33ff7dbe40f6a796ce.jpg' alt='' /> 장바구니</Link>
          </div>
          <div className='imgHeader'>
          </div>
           <div className='Header_Top'>
           <Link to={"/"}><img className='logo' src='/images/DAYOFF_logo3.png'></img></Link>
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
