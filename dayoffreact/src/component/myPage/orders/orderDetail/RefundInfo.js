import React, { Component } from 'react';
import './OrderInfo.css';

class RefundInfo extends Component {

    render() {
        const { orderId, productName, refundAmount, refundRequestDate, refundDate, productThumbnailName } = this.props.order;
        const className = this.props.thisOrder ? "orderBold" : "orderLight";
        return (
            <tr className={className}>
                <td>{orderId}</td>
                <td><div><img src={"https://storage.googleapis.com/bit-jaehoon/"+productThumbnailName}/></div>
                <div>{productName}</div></td>
                <td>{refundAmount}</td>
                <td>{refundRequestDate}</td>
                <td>{refundDate}</td>

            </tr>
        )
    }
}

export default RefundInfo;