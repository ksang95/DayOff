import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import VisionMain from  './visionMain';
class visionList extends Component {
    state = {
      };
     
     
    
      render() {
        let result1;
        let resultRecommend;
        const detail = "/detail/"
        const {list,recommendlist} = this.props;
        if( list!=null){
         result1 = list.map(
                  (data1,index) => (<div className="listDiv"><Link to={detail+data1.productId}><img className="imglist" width="200px" height="250px" alt="" src={data1.url}></img><p>{data1.productName}</p></Link></div>)
                  )}
                  
        if(recommendlist !=null){
             resultRecommend = recommendlist.map(
        (data,index) => (<div className="listDiv"><Link to={detail+data.productId}><img className="imglist" width="200px" height="250px" alt="" src={data.url}></img><p>{data.productName}</p></Link></div>)
                   )}          
        return (
         <div> 
           
          {list ?  <div className="imgbox">
            <h1>상품검색 결과</h1>
            <hr></hr>
          {result1}
          </div> : ''}
          {recommendlist ?  <div className="imgbox">
            <h1>일치하는 상품없음</h1>
            <h2>유사한 카테고리 상품추천-{recommendlist[0].categoryName}</h2>
            <hr></hr>
          {resultRecommend}
          </div> : ''}
          
          </div>
         )

    }
}

export default visionList;