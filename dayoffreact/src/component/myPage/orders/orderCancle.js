import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class orderCancle extends Component {

    async cancle(orderId) {
        const params = new URLSearchParams();
        params.append("orderId", orderId)
        await Axios({
            method : "post",
            data : params,
            url : "/cancleOrder"  
        }).then((res)=>{
            window.location.reload(false)
        })
    }

    f3 = ()=>{
        window.confirm(`상품 주문을 취소하시겠습니까?`) //리액트에서는 window. 붙여야함
        return this.cancle(this.props.orderId);
      }

    render() {
        return (
            <div>
                <button onClick={this.f3.bind(this)}>주문취소</button>
            </div>
        );
    }
}

export default withRouter(orderCancle);