import React, { Component } from 'react';
import './OrderInfo.css';
import { Link } from 'react-router-dom';
import SlideToggle from "react-slide-toggle";
import axios from 'axios';
import OrderCancel from '../OrderCancel';
import Deliver from '../Deliver';
import OrderConfirm from '../OrderConfirm';

class OrderInfo extends Component {

    state = {
        newInvoice: ''
    }
    async updateInvoice(invoice, groupId, orderId) {
        console.log(invoice)
        const params = new URLSearchParams();
        params.append("invoice", invoice);
        params.append("groupId", groupId);
        params.append("orderId", orderId)
        await axios({
            method: "post",
            data: params,
            url: "/updateInvoice"
        }).then((res) => {

        })
        this.props.getData();
    }

    handleChangeInput2(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { orderId, productName, orderPrice, orderColor, orderSize, orderQuantity, productThumbnailName, productId, codeContent, orderCount, groupId, invoice } = this.props.order;
        console.log(invoice)
        const className = this.props.thisOrder ? "orderBold" : "orderLight";
        const adminCodeButton = this.props.isAdmin && codeContent === "배송준비중" && (
            <SlideToggle collapsed="true" render={({ toggle, setCollapsibleElement }) => (
                <div className="my-collapsible">
                    <button className="my-collapsible__toggle" onClick={toggle}>
                        송장번호등록
                 </button>
                    <div className="my-collapsible__content" ref={setCollapsibleElement}>
                        <div className="my-collapsible__content-inner">
                            <input type="text" onChange={this.handleChangeInput2.bind(this)} name="newInvoice" value={this.state.newInvoice}></input>
                            <button onClick={() => this.updateInvoice.bind(this)(this.state.newInvoice, groupId, orderId)}>등록</button>
                        </div>
                    </div>
                </div>
            )}></SlideToggle>);
        let userCodeButton=null;
        if (this.props.isAdmin) {
            switch (codeContent) {
                case "배송준비중":
                    userCodeButton = <OrderCancel order={this.props.order} orderCount={orderCount}></OrderCancel>;
                    break;
                case "배송중":
                    userCodeButton = <Deliver invoice={invoice}></Deliver>;
                    break;
                case "구매확정":
                    userCodeButton = <Link to={"/reviewInsert/" + productId}>후기 작성</Link>;
                    break;
                case "배송완료":
                    userCodeButton = (<div><OrderConfirm orderId={orderId}></OrderConfirm><br></br><Link to={{
                        pathname: "/mypage/refundRequest",
                        state: {
                            orderView: this.props.order,
                            orderCount: this.props.orderCount
                        }
                    }}>환불 신청</Link></div>);
                    break;

            }
        }

        return (
            <tr className={className}>
                <td>{orderId}</td>
                <td>
                    <Link to={"/detail/" + productId}><div className="infoDiv"><img width="90px" height="106px" src={"https://storage.googleapis.com/bit-jaehoon/" + productThumbnailName}></img>
                        <div style={{ overflow: 'hidden' }} className="nameColor">
                            {productName}
                        </div>
                    </div></Link>
                </td>
                <td>{orderColor}</td>
                <td>{orderSize}</td>
                <td>{orderQuantity}</td>
                <td>{orderPrice}원</td>
                <td>{codeContent}
                    {adminCodeButton}
                    {userCodeButton}
                </td>
            </tr >
        )
    }
}


export default OrderInfo;