import React, { Component } from 'react'
import './MyNav.css';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {

  render() {
    return (
      <div className="Nav">
        <div className='Nav_Title'>
        <h3><img className='Face' src='/images/face.png'></img> My PAGE</h3>
        </div>
        <div className='Nav_Info1'>
          <h5>쇼핑정보</h5>
          <NavLink to={'/mypage/myorders'} className='Nav_Info_List'>주문내역/환불/반품</NavLink><br></br>
          <NavLink to={'/mypage/map'} className='Nav_Info_List'>매장 픽업 서비스</NavLink><br></br>
          <NavLink to={'/mypage/myGrade'} className='Nav_Info_List'>회원등급 현황</NavLink>
        </div>

        <div className='Nav_Info2'>
          <h5>나의정보</h5>
          <NavLink to={'/mypage/myInfo'} className='Nav_Info_List'>회원정보 관리</NavLink><br></br>
          <NavLink to={'/mypage/withdraw'} className='Nav_Info_List'>회원탈퇴</NavLink>
        </div>

          <img className='tphone' src='/images/tphone1.png'></img>
      </div>
    )


  }
}