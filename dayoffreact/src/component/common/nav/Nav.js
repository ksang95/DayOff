import React, { Component } from 'react'
import './nav.css';
import { Link } from 'react-router-dom';
import ProductNav from './ProductNav';

export default class Nav extends Component {
  state = {
    login: false,
    role: false
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
    if(this.state.login===true && this.state.role===false){
    return (
      <div className="Nav">
        <h1 className='Nav_Title'> My PAGE</h1>
        <div className='Nav_Info'>
        <h3>쇼핑정보</h3>
        <Link to={'/'} className='Nav_Info_List'>주문내역 및 환불/반품</Link><br></br>
        <Link to={'/MapPage'} className='Nav_Info_List'>매장 픽업 서비스</Link><br></br>
        <Link to={'/'} className='Nav_Info_List'>회원등급 현황</Link>
        </div>

        <div className='Nav_Info'>
        <h3>활동정보</h3>
        <Link to={'/'} className='Nav_Info_List'>적립금</Link><br></br>
        <Link to={'/'} className='Nav_Info_List'>쿠폰</Link>
        </div>

        <div className='Nav_Info'>
        <h3>나의정보</h3>
        <Link to={'/'} className='Nav_Info_List'>배송지관리</Link><br></br>
        <Link to={'/'} className='Nav_Info_List'>회원정보 관리</Link><br></br>
        <Link to={'/'} className='Nav_Info_List'>회원탈퇴</Link>
        </div>

        <div className='Nav_Info'>
          <h3>DayOff 고객센터</h3>
          <h3>Tel.02-1234-5678</h3>
          <h6>근무시간 9:00~18:00 <br></br>(점심시간 12:00~13:00)</h6>
        </div>
      </div>
    )
  } else if(this.state.login===false && this.state.role===false){
    return (
      <ProductNav />
    )
  } else if(this.state.login===true && this.state.role===true){
      return (
        <div className="Nav">
          <h1 className='Nav_Title'> ADMIN</h1>
          <div className='Nav_Info'>
          <h3>회원관리</h3>
          <Link to={'/'} className='Nav_Info_List'>회원정보리스트</Link>
          </div>
  
          <div className='Nav_Info'>
          <h3>주문관리</h3>
          <Link to={'/'} className='Nav_Info_List'>주문 내역</Link><br></br>
          <Link to={'/'} className='Nav_Info_List'>환불 내역</Link>
          </div>
  
          <div className='Nav_Info'>
          <h3>상품관리</h3>
          <Link to={'/'} className='Nav_Info_List'>상품등록</Link>
          </div>
  
          <div className='Nav_Info'>
          <h3>통계</h3>
          <Link to={'/'} className='Nav_Info_List'>매출 통계</Link><br></br>
          <Link to={'/'} className='Nav_Info_List'>회원 통계</Link>
          </div>
  
          <div className='Nav_Info'>
          <h3>DayOff 고객센터</h3>
            <h3>Tel.02-1234-5678</h3>
            <h6>근무시간 9:00~18:00 <br></br>(점심시간 12:00~13:00)</h6>
          </div>
        </div>
      )
    }
}
}