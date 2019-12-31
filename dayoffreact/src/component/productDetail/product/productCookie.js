import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class productCookie extends Component {
    state = {
        list : []
    }

    
  

    render() {
        console.log(this.props.cookieList)
        console.log(this.props.cookieList[0])
        const detail = "/product/"
        const {cookieList} = this.props;
        let result;
        if(cookieList){
         result = cookieList.map(
            (data1,index) => (<div className="listDiv"><Link to={detail+data1.productId}><img className="imglist" width="200px" height="250px" alt="" src={"https://storage.googleapis.com/bit-jaehoon/"+data1.productThumbnailName}></img><p>{data1.productName}</p></Link></div>)
        )
        }
        return (
            <div>
                <h2>최근 본 상품</h2>
                <hr width="93%" style={{marginLeft : "50px",borderTop : "1px solid black"}}></hr>
                    {result}
            </div>
        );
    }
}

export default productCookie;