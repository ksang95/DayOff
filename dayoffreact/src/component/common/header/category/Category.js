import React, { Component } from 'react'
import './category.css';
import {Link} from 'react-router-dom';
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
        keyword: '',
    };
}
componentDidMount() {
}

refreshPage() {
  window.history.go(0);
}

  render() {
    return (
      <div className='dropmenu' onClick={this.refreshPage}>
        <ul>
            <li className='category__item'><Link to={"/productList/category/BEST"}>BEST</Link></li>

            <li className='category__item'><Link to={"/productList/category/아우터"}>아우터</Link>
            <ul>
            <li><Link to={"/productList/category/가디건"}>가디건</Link></li>
            <li><Link to={"/productList/category/자켓"}>자켓</Link></li>
            <li><Link to={"/productList/category/점퍼"}>점퍼</Link></li>
            <li><Link to={"/productList/category/코트"}>코트</Link></li>
            <li><Link to={"/productList/category/패딩"}>패딩</Link></li>
            </ul>
            </li>

            <li className='category__item'><Link to={"/productList/category/상의"}>상의</Link>
            <ul>
            <li><Link to={"/productList/category/니트"}>니트</Link></li>
            <li><Link to={"/productList/category/맨투맨"}>맨투맨</Link></li>
            <li><Link to={"/productList/category/후드"}>후드</Link></li>
            <li><Link to={"/productList/category/티셔츠"}>티셔츠</Link></li>
            <li><Link to={"/productList/category/반팔"}>반팔</Link></li>
            <li><Link to={"/productList/category/조끼"}>조끼</Link></li>

            </ul>
            </li>

            <li className='category__item'><Link to={"/productList/category/셔츠_블라우스"}>셔츠/블라우스</Link>
            <ul>
            <li><Link to={"/productList/category/체크셔츠"}>체크셔츠</Link></li>
            <li><Link to={"/productList/category/블라우스"}>블라우스</Link></li>
            <li><Link to={"/productList/category/셔츠"}>셔츠</Link></li>
            </ul>
            </li>

            <li className='category__item'><Link to={"/productList/category/팬츠"}>팬츠</Link>
            <ul>
            <li><Link to={"/productList/category/청바지"}>청바지</Link></li>
            <li><Link to={"/productList/category/스키니"}>스키니</Link></li>
            <li><Link to={"/productList/category/일자핏"}>일자핏</Link></li>
            <li><Link to={"/productList/category/레깅스"}>레깅스</Link></li>
            <li><Link to={"/productList/category/슬랙스"}>슬랙스</Link></li>
            <li><Link to={"/productList/category/숏팬츠"}>숏팬츠</Link></li>
            </ul>
            </li>

            <li className='category__item'><Link to={"/productList/category/원피스"}>원피스</Link>
            <ul>
            <li><Link to={"/productList/category/미니"}>미니</Link></li>
            <li><Link to={"/productList/category/미디움"}>미디움</Link></li>
            <li><Link to={"/productList/category/롱"}>롱</Link></li>
            </ul>
            </li>

            <li className='category__item'><Link to={"/productList/category/악세사리"}>악세사리</Link>
            <ul>
            <li><Link to={"/productList/category/벨트"}>벨트</Link></li>
            <li><Link to={"/productList/category/지갑"}>지갑</Link></li>
            <li><Link to={"/productList/category/모자"}>모자</Link></li>
            <li><Link to={"/productList/category/안경/선글라스"}>안경/선글라스</Link></li>
            <li><Link to={"/productList/category/목도리"}>목도리</Link></li>
            <li><Link to={"/productList/category/양말"}>양말</Link></li>
            </ul>
            </li>
            
            </ul>
      </div>
    )
  }
}
