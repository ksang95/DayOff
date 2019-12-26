import React, { Component } from 'react';
import './OrderInfo.css';
import { Link } from 'react-router-dom';

class RefundInfo extends Component {

    render() {
        const { orderId, productName, refundAmount, refundRequestDate, refundDate, productThumbnailName, productId } = this.props.order;
        const className = this.props.thisOrder ? "orderBold" : "orderLight";
        return (
            <tr className={className}>
                <td>{orderId}</td>
                <td>
                    <Link to={"/detail/" + productId}><div className={"infoDiv " + className}><img width="90px" height="106px" src={"https://storage.googleapis.com/bit-jaehoon/" + productThumbnailName}></img>
                        <div style={{ overflow: 'hidden' }} className="nameColor">
                            {productName}>
                        </div>
                    </div></Link>
                </td>
                <td>{refundAmount}원</td>
                <td>{refundRequestDate}</td>
                <td>{refundDate?refundDate:"환불대기"}</td>

            </tr>
        )
    }
}

export default RefundInfo;