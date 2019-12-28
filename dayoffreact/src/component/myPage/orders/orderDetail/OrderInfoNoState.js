import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OrderInfoNoState extends Component {

    render() {
        const { orderId, productName, orderPrice, orderColor, orderSize, orderQuantity, productThumbnailName, productId, codeContent, orderCount, groupId } = this.props.order;
        return (
            <tr className="orderLight">
                <td style={{width:"5%"}}>{orderId}</td>
                <td style={{width:"50%"}}>
                    <Link to={"/product/" + productId}><div className="infoDiv"><img width="100px" height="100px" src={"https://storage.googleapis.com/bit-jaehoon/" + productThumbnailName}></img>
                        <div style={{ maxWidth:"90%", padding:"0px 20px", wordBreak:"break-all" }} className="nameColor">
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