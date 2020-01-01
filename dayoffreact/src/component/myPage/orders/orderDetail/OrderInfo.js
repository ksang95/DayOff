import React, { Component } from 'react';
import './orderInfo.css';
import { Link } from 'react-router-dom';
import SlideToggle from "react-slide-toggle";
import axios from 'axios';
import OrderCancel from '../OrderCancel';
import Deliver from '../Deliver';
import OrderConfirm from '../OrderConfirm';
import { Button, Form, Col, Row } from 'react-bootstrap';
import GoNextState from '../GoNextState';

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

    invoiceSubmit = () => {
        if (this.state.newInvoice.length > 0)
            this.updateInvoice(this.state.newInvoice, this.props.order.groupId, this.props.order.orderId);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.order !== nextProps.order || this.state.newInvoice !== nextState.newInvoice;
    }


    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        const { orderId, userId, productName, orderPrice, orderColor, orderSize, orderQuantity, productThumbnailName, productId, codeContent, orderCount, groupId, invoice } = this.props.order;
        const className = this.props.thisOrder ? "orderBold" : "orderLight";
        let adminCodeButton = null;
        if (this.props.isAdmin) {
            switch (codeContent) {
                case "배송준비중":
                    adminCodeButton = (
                        <SlideToggle collapsed="true" render={({ toggle, setCollapsibleElement }) => (
                            <div className="my-collapsible">
                                <Button variant="secondary" className="my-collapsible__toggle" onClick={toggle}>
                                    송장번호 등록
                                </Button>
                                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                                    <div className="my-collapsible__content-inner">
                                        <Form.Control style={{ width: "70%", display: "inline" }} type="text" placeholder="송장번호" onChange={this.handleChangeInput2.bind(this)} name="newInvoice" value={this.state.newInvoice} />
                                        <Button variant="secondary" className="ml-1" onClick={this.invoiceSubmit}>등록</Button>
                                    </div>
                                </div>
                            </div>
                        )}></SlideToggle>);
                    break;
                // case "배송중":
                //     adminCodeButton = <Deliver invoice={invoice}></Deliver>;
                //     break;
                case "환불대기중":
                    adminCodeButton = (<GoNextState orderId={orderId} buttonName="환불 승인"></GoNextState>);
                    break;
                case "픽업예정":
                    adminCodeButton = (<GoNextState orderId={orderId} buttonName="픽업 완료"></GoNextState>);
                    break;
            }
        }
        let userCodeButton = null;
        if (!this.props.isAdmin) {
            switch (codeContent) {
                case "배송준비중":
                    userCodeButton = <OrderCancel order={this.props.order} orderCount={orderCount}></OrderCancel>;
                    break;
                // case "배송중":
                //     userCodeButton = <Deliver invoice={invoice}></Deliver>;
                //     break;
                case "구매확정":
                    userCodeButton = <Link to={"/reviewInsert/" + productId}><Button variant="secondary">후기 작성</Button></Link>;
                    break;
                case "배송완료":
                    userCodeButton = (<div><OrderConfirm orderId={orderId} userId={userId} groupId={groupId}></OrderConfirm><br></br><Link to={{
                        pathname: "/mypage/refundRequest",
                        state: {
                            orderView: this.props.order,
                            orderCount: this.props.orderCount
                        }
                    }}><Button variant="secondary">환불 신청</Button></Link></div>);
                    break;

            }
        }

        return (
            <tr className={className}>
                <td style={{ width: "5%" }}>{orderId}</td>
                <td style={{ width: "50%" }}>
                    <Link to={"/product/" + productId}><div className="infoDiv"><img width="100px" height="100px" src={"https://storage.googleapis.com/bit-jaehoon/" + productThumbnailName}></img>
                        <div style={{ maxWidth: "90%", padding: "0px 20px", wordBreak: "break-all" }} className="nameColor">
                            {productName}
                        </div>
                    </div></Link>
                </td>
                <td>{orderColor}</td>
                <td>{orderSize}</td>
                <td>{orderQuantity}</td>
                <td>{this.numberWithCommas(orderPrice)}원</td>
                <td style={{ width: "18%" }}>{codeContent}
                    {adminCodeButton}
                    {userCodeButton}
                </td>
            </tr >
        )
    }
}


export default OrderInfo;