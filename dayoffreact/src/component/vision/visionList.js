import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import VisionMain from  './visionMain';
import Display from '../productDetail/product/Display'
import { Tiles2 } from '../main/banner/Tiles2';
class visionList extends Component {
    state = {
      };
     
     
    
      render() {
        let result1;
        let resultRecommend;
        // const detail = "/product/"
        // const {list,recommendlist} = this.props;
        // if( list!=null){
        //  result1 = list.map(
        //           (data1,index) => (<div className="listDiv"><Link to={detail+data1.productId}><img className="imglist" width="200px" height="250px" alt="" src={"https://storage.googleapis.com/bit-jaehoon/"+data1.productThumbnailName}></img><p>{data1.productName}</p></Link></div>)
        //           )}
                  
        // if(recommendlist !=null){
        //      resultRecommend = recommendlist.map(
        // (data,index) => (<div className="listDiv"><Link to={detail+data.productId}><img className="imglist" width="200px" height="250px" alt="" src={"https://storage.googleapis.com/bit-jaehoon/"+data.productThumbnailName}></img><p>{data.productName}</p></Link></div>)
        //            )}          
        return (
         <div className="visionsList"> 
           
          {this.props.list ?  <div className="imgbox">
            <h1>상품검색 결과</h1>
            <hr></hr>
           {/* <Display cookieList={this.props.list}></Display>  */}
           <Display List={this.props.list}></Display>
          </div> : ''}
          {this.props.recommendlist ?  <div className="imgbox">
            <h2 style={{color : "red"}}>일치하는 상품이 없습니다</h2>
            <h2>유사한 카테고리 상품추천-{this.props.recommendlist[0].categorysubName}</h2>
            <hr></hr>
            <Display List={this.props.recommendlist}></Display> 
          </div> : ''}
          
          </div>
         )

    }
}

export default visionList;