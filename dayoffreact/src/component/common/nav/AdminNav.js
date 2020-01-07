import React, { Component } from 'react'
import './AdminNav.css';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {

  render() {
      return (
        <div className="Nav">
        <div className='Nav_Info10'>
          <h1 className='Nav_Title'> ADMIN</h1></div>
          <div className='Nav_Info10'>
          <h3>회원관리</h3>
          <NavLink activeStyle={{fontWeight:'bold'}} to={'/admin/userList'} className='Nav_Info_List'>회원정보리스트</NavLink>
          </div>
  
          <div className='Nav_Info9'>
          <h3>주문관리</h3>
          <NavLink activeStyle={{fontWeight:'bold'}} to={'/admin/orders'} className='Nav_Info_List'>주문 내역</NavLink><br></br>
          </div>
  
          <div className='Nav_Info8'>
          <h3>상품관리</h3>
          <NavLink activeStyle={{fontWeight:'bold'}} to={'/admin/addProduct'} className='Nav_Info_List'>상품등록</NavLink>
          </div>
  
          <div className='Nav_Info7'>
          <h3>통계</h3>
          <NavLink activeStyle={{fontWeight:'bold'}} to={'/admin/ordersAnalysis'} className='Nav_Info_List'>매출 통계</NavLink><br></br>
          <NavLink activeStyle={{fontWeight:'bold'}} to={'/admin/usersAnalysis'} className='Nav_Info_List'>회원 통계</NavLink>
          </div>
  
          <div className='Nav_Info4'>
          <h5>DayOff 고객센터</h5>
          <h6>Tel.02-1234-5678</h6>
          <h6>근무시간 9:00~18:00 <br></br>(점심시간 12:00~13:00)</h6>
          </div>
        </div>
      )
    }
}
