import React, { Component } from 'react';
import './OrderInfo.css';
import { Link } from 'react-router-dom';
import SlideToggle from "react-slide-toggle";
import axios from 'axios';

class OrderInfo extends Component {

    state={
        invoice:''
    }
    async updateInvoice(invoice, groupId,orderId){
        console.log(invoice)
        const params = new URLSearchParams();
        params.append("invoice", invoice);
        params.append("groupId", groupId);
        params.append("orderId", orderId)
        await axios({
          method : "post",
          data : params,
          url : "/updateInvoice"
        }).then((res)=>{
          
        })
        this.props.getData();
      }
    
      handleChangeInput2(e) {
        this.setState({
          [e.target.name] : e.target.value
        })
      }
    render() {
        const { orderId, productName, orderPrice, orderColor, orderSize, orderQuantity, productThumbnailName, productId, codeContent, orderCount, groupId } = this.props.order;
        const className = this.props.thisOrder ? "orderBold" : "orderLight";
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
                <td>{codeContent}
                    <br></br>
                    {codeContent === "배송준비중"&&this.props.isAdmin ?
                        <SlideToggle collapsed="true" render={({ toggle, setCollapsibleElement }) => (
                            <div className="my-collapsible">
                                <button className="my-collapsible__toggle" onClick={toggle}>
                                    송장번호등록
                                 </button>
                                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                                    <div className="my-collapsible__content-inner">
                                        <input type="text" onChange={this.handleChangeInput2.bind(this)} name="invoice" value={this.state.invoice}></input>
                                        <button onClick={() => this.updateInvoice.bind(this)(this.state.invoice, groupId, orderId)}>등록</button>
                                    </div>
                                </div>
                            </div>
                        )}></SlideToggle>
                        : ""}
                    {codeContent === "배송완료" ? <button>구매 확정</button> : ""}
                    {codeContent === "구매확정" ? <Link to={{
                        pathname: "/mypage/refundRequest",
                        state: {
                            orderCount: orderCount, //해당 order가 있는 orderGroup에 속한 order개수 넘겨주시오
                            orderView: this.props.order
                        }
                    }}>환불 신청</Link> : ""}

                </td>
            </tr>
        )
    }
}


export default OrderInfo;