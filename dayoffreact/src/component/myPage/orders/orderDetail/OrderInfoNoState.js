import React, { Component } from 'react';
import './OrderInfo.css';
import { Link } from 'react-router-dom';

class OrderInfoNoState extends Component {

    render() {
        const { orderId, productName, orderPrice, orderColor, orderSize, orderQuantity, productThumbnailName, productId, codeContent, orderCount, groupId } = this.props.order;
        const className = "orderLight";
        return (
            <tr>
                <td>{orderId}</td>
                <td>
                    <Link to={"/detail/" + productId}><div className={"infoDiv " + className}><img width="90px" height="106px" src={"https://storage.googleapis.com/bit-jaehoon/" + productThumbnailName}></img>
                        <div style={{ overflow: 'hidden' }} className="nameColor">
                            {productName}
                        </div>
                    </div></Link>
                </td>
                <td>{orderColor}</td>
                <td>{orderSize}</td>
                <td>{orderQuantity}</td>
                <td>{orderPrice}원</td>
            </tr>
        )
    }
}


export default OrderInfoNoState;