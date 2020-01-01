import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom'

class productTogetherBuy extends Component {
    state = {
        list : []
    }

   
  
    render() {
        const detail = "/product/"
        const {Togetherlist} = this.props;
        let result;
        if(Togetherlist){
         result = Togetherlist.map(
            (data1,index) => (<div className="listDiv"><Link to={detail+data1.productId}><img className="imglist" width="200px" height="250px" alt="" src={"https://storage.googleapis.com/bit-jaehoon/"+data1.productThumbnailName}></img><p>{data1.productName}</p></Link></div>)
        )
        }
        return (
            <div>
                <h2>이 상품을 구매한 회원이 함께 구매한 상품</h2>
                <hr width="93%" style={{marginLeft : "50px",borderTop : "1px solid black"}}></hr>                    {result}
            </div>
        );
    }
}

export default productTogetherBuy;