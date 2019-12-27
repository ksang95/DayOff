import React, { Component } from 'react'
import './category.css';
export default class Category extends Component {
  render() {
    return (
      <div className='dropmenu'>
        <ul>
            <li className='category__item' src=''><a href>BEST</a> </li>

            <li className='category__item' src=''><a href>OUTER</a>
            <ul>
            <li><a href>가디건</a></li>
            <li><a href>자켓</a></li>
            <li><a href>점퍼</a></li>
            <li><a href>코트</a></li>
            <li><a href>패딩</a></li>
            </ul>
            </li>

            <li className='category__item' src=''><a href>TOP</a>
            <ul>
            <li><a href>니트</a></li>
            <li><a href>맨투맨</a></li>
            <li><a href>후드</a></li>
            <li><a href>티셔츠</a></li>
            <li><a href>반팔</a></li>
            <li><a href>조끼</a></li>

            </ul>
            </li>

            <li className='category__item' src=''><a href>BOTTOM</a>
            <ul>
            <li><a href>청바지</a></li>
            <li><a href>스키니</a></li>
            <li><a href>슬랙스</a></li>
            <li><a href>숏팬츠</a></li>
            <li><a href>레깅스</a></li>
            </ul>
            </li>

            <li className='category__item' src=''><a href>ACC</a>
            <ul>
            <li><a href>벨트</a></li>
            <li><a href>지갑</a></li>
            <li><a href>모자</a></li>
            <li><a href>안경/선글라스</a></li>
            <li><a href>목도리</a></li>
            <li><a href>양말</a></li>
            </ul>
            </li>
            
            </ul>
      </div>
    )
  }
}
