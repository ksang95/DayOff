import axios from 'axios';
import React, { Component, Fragment } from 'react';
import OrderGroupList from './OrderGroupList';
import OrderType from './OrderType';
import PayInfo from './PayInfo';
import queryString from 'query-string';
import RefundList from './RefundList';

class OrderDetail extends Component {
    state = {
        orderId: null,
        groupId: null,
        data: [],
        info: null,
        totalPrice: null
    }

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }

    async getData() {
        const groupId = this.props.match.params.groupId;
        const orderId = parseInt(queryString.parse(this.props.location.search).orderId);
        this.setState({
            groupId: groupId,
            orderId: orderId
        });
        try {
            const response = await axios.get("/orderDetail/" + groupId);
            const sum = response.data.reduce((prev, i) => {
                return prev + i.orderPrice;
            }, 0);
            this.setState({
                data: response.data,
                info: response.data[0],
                totalPrice: sum,
                userId: response.data[0].userId,
                userName: response.data[0].userName
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const isAdmin = sessionStorage.getItem("userRole") === "admin";
        const isMine = sessionStorage.getItem("userId") === this.state.userId;
        // const isMine=true;
        const refundData = this.state.data.filter(d => d.refundRequestDate);

        return (
            <div className="orderDetail">
                {(isMine||isAdmin) && this.state.totalPrice &&

                    <Fragment>
                        주문 상세정보
                {isAdmin && <div><span>회원: {this.state.userName}</span> <span>(ID: {this.state.userId})</span></div>}
                        <div>주문번호: {this.state.info.groupId}</div>
                        <OrderGroupList data={this.state.data} orderId={this.state.orderId} isAdmin={isAdmin} getData={this.getData} needState={true}></OrderGroupList>
                        {refundData && <RefundList data={refundData} orderId={this.state.orderId}></RefundList>}
                        <OrderType info={this.state.info} />
                        <PayInfo totalPrice={this.state.totalPrice} info={this.state.info} />
                    </Fragment>
                }
            </div>

        );
    }
}

export default OrderDetail;