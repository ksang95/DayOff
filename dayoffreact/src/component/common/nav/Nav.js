import React, { Component } from 'react'
import './nav.css';
import NavItem from './NavItem';

export default class Nav extends Component {
  render() {
    const sample = [
      { name: '회원관리'},
      { name: '회원정보리스트'},
      { name: '주문 관리'},
      { name: '주문 내역'},
      { name: '환불 내역'},
      { name: '상품 관리'},
      { name: '상품 등록'}
    ]

    return (
      <div className="Nav">
        <h1> ADMIN</h1>
        {
          sample.map(item => {
            return (
              <NavItem name={item.name} />
            )
          })
        }
        
      </div>
    )
  }
}
