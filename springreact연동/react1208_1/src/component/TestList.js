import React, {Component} from 'react';
import Test from './Test';

class TestList extends Component{
    static defaultProps={
        data:[]
    }

    render(){
        const {data}=this.props;
        const list = data.map(
            (order) => (<Test key={order.orderId} order={order}/>)
        );

        return (
            <table>
                <thead><tr><th>주문id</th><th>상품명</th><th>주문가격</th><th>색상</th><th>사이즈</th><th>수량</th></tr></thead>
                <tbody>{list}</tbody>
            </table>
        )
    }
}

export default TestList;