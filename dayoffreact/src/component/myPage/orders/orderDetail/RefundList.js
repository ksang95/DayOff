import React, { Component } from 'react';
import RefundInfo from './RefundInfo';

class RefundList extends Component{
    static defaultProps={
        data:[]
    }

    render(){
        const {data}=this.props;
        const list = data.map(
            (order,index) => {
                const thisOrder=order.orderId===this.props.orderId&&true;
                return (
                    <RefundInfo key={order.orderId} order={order} thisOrder={thisOrder}/>
                )
            }
        );

        return (
            <div>
                환불 내역
            <table>
                <thead><tr><th>번호</th><th>상품정보</th><th>환불금액</th><th>환불신청날짜</th><th>환불날짜</th></tr></thead>
                <tbody>{list}</tbody>
            </table>
            </div>
        )
    }
}

export default RefundList;