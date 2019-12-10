import React, {Component} from 'react';

class Test extends Component {

    render(){
        const {orderId,productName,productPrice,orderColor,orderSize,orderQuantity} = this.props.order;
        return (
            <tr>
                <td>{orderId}</td>
                <td>{productName}</td>
                <td>{productPrice}</td>
                <td>{orderColor}</td>
                <td>{orderSize}</td>
                <td>{orderQuantity}</td>
            </tr>
        )
    }
}

export default Test;