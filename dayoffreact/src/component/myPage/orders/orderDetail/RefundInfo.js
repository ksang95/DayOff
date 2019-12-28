import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RefundInfo extends Component {

    render() {
        const { orderId, productName, refundAmount, refundRequestDate, refundDate, productThumbnailName, productId } = this.props.order;
        const className = this.props.thisOrder ? "orderBold" : "orderLight";
        return (
            <tr className={className}>
            <td style={{width:"5%"}}>{orderId}</td>
            <td style={{width:"50%"}}>
                <Link to={"/product/" + productId}><div className="infoDiv"><img width="100px" height="100px" src={"https://storage.googleapis.com/bit-jaehoon/" + productThumbnailName}></img>
                    <div style={{ maxWidth:"90%", padding:"0px 20px", wordBreak:"break-all" }} className="nameColor">
                        {productName}
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