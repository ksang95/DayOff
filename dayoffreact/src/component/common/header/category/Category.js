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
            <li className='category__item'><Link to={"/productListPage/BEST"}>BEST</Link></li>

            <li className='category__item'><Link to={"/productListPage/아우터"}>아우터</Link>
            <ul>
            <li><Link to={"/productListPage/가디건"}>가디건</Link></li>
            <li><Link to={"/productListPage/자켓"}>자켓</Link></li>
            <li><Link to={"/productListPage/점퍼"}>점퍼</Link></li>
            <li><Link to={"/productListPage/코트"}>코트</Link></li>
            <li><Link to={"/productListPage/패딩"}>패딩</Link></li>
            </ul>
            </li>

            <li className='category__item'><Link to={"/productListPage/상의"}>상의</Link>
            <ul>
            <li><Link to={"/productListPage/니트"}>니트</Link></li>
            <li><Link to={"/productListPage/맨투맨"}>맨투맨</Link></li>
            <li><Link to={"/productListPage/후드"}>후드</Link></li>
            <li><Link to={"/productListPage/티셔츠"}>티셔츠</Link></li>
            <li><Link to={"/productListPage/반팔"}>반팔</Link></li>
            <li><Link to={"/productListPage/조끼"}>조끼</Link></li>

            </ul>
            </li>

            <li className='category__item'><Link to={"/productListPage/셔츠_블라우스"}>셔츠/블라우스</Link>
            <ul>
            <li><Link to={"/productListPage/체크셔츠"}>체크셔츠</Link></li>
            <li><Link to={"/productListPage/블라우스"}>블라우스</Link></li>
            <li><Link to={"/productListPage/셔츠"}>셔츠</Link></li>
            </ul>
            </li>

            <li className='category__item'><Link to={"/productListPage/팬츠"}>팬츠</Link>
            <ul>
            <li><Link to={"/productListPage/청바지"}>청바지</Link></li>
            <li><Link to={"/productListPage/스키니"}>스키니</Link></li>
            <li><Link to={"/productListPage/일자핏"}>일자핏</Link></li>
            <li><Link to={"/productListPage/레깅스"}>레깅스</Link></li>
            <li><Link to={"/productListPage/슬랙스"}>슬랙스</Link></li>
            <li><Link to={"/productListPage/숏팬츠"}>숏팬츠</Link></li>
            </ul>
            </li>

            <li className='category__item'><Link to={"/productListPage/원피스"}>원피스</Link>
            <ul>
            <li><Link to={"/productListPage/미니"}>미니</Link></li>
            <li><Link to={"/productListPage/미디움"}>미디움</Link></li>
            <li><Link to={"/productListPage/롱"}>롱</Link></li>
            </ul>
            </li>

            <li className='category__item'><Link to={"/productListPage/악세사리"}>악세사리</Link>
            <ul>
            <li><Link to={"/productListPage/벨트"}>벨트</Link></li>
            <li><Link to={"/productListPage/지갑"}>지갑</Link></li>
            <li><Link to={"/productListPage/모자"}>모자</Link></li>
            <li><Link to={"/productListPage/안경/선글라스"}>안경/선글라스</Link></li>
            <li><Link to={"/productListPage/목도리"}>목도리</Link></li>
            <li><Link to={"/productListPage/양말"}>양말</Link></li>
            </ul>
            </li>
            
            </ul>
      </div>
    )
  }
}
