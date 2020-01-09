import React, { Component } from 'react'
import './AdminNav.css';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {

  render() {
      return (
        <div className="ANav">
        <div className='ANav_Title'>
        <h5>DayOff</h5>
        <h3>Admin</h3>
        </div>
          <div className='ANav_Info10'>
          <h5>회원관리</h5>
          <NavLink activeStyle={{fontWeight:'bold'}} to={'/admin/userList'} className='ANav_Info_List'>회원정보리스트</NavLink>
          </div>
  
          <div className='ANav_Info9'>
          <h5>주문관리</h5>
          <NavLink activeStyle={{fontWeight:'bold'}} to={'/admin/orders'} className='ANav_Info_List'>주문 내역</NavLink><br></br>
          </div>
  
          <div className='ANav_Info8'>
          <h5>상품관리</h5>
          <NavLink activeStyle={{fontWeight:'bold'}} to={'/admin/addProduct'} className='ANav_Info_List'>상품등록</NavLink>
          </div>
  
          <div className='ANav_Info7'>
          <h5>통계</h5>
          <NavLink activeStyle={{fontWeight:'bold'}} to={'/admin/ordersAnalysis'} className='ANav_Info_List'>매출 통계</NavLink><br></br>
          <NavLink activeStyle={{fontWeight:'bold'}} to={'/admin/usersAnalysis'} className='ANav_Info_List'>회원 통계</NavLink>
          </div>
  
          <img className='Atphone' src='/images/tphone1.png'></img>
        </div>
      )
    }
}
