import axios from 'axios';
import React, { Component } from 'react';
import OrderGroupList from './orderDetail/OrderGroupList';
import PayInfo from './orderDetail/PayInfo';

class RefundRequest extends Component {
    state = {
        orderView: null,
        refundAmount: 0,
        code: [],
        selectedCode: '',
        error: '',
        orderCount: null
    }
    async getCode() {
        try {
            const response = await axios.get("/refundRequest");
            this.setState({
                code: response.data
            });

        } catch (e) {
            console.log(e);
        }
    }

    refund = async () => {
        const code = this.state.code[this.state.selectedCode];
        const { orderView, info } = this.state;
        if (code) {
            let refunds = {
                orders: {id:orderView.orderId},
                code: code,
                refundAmount: info.totalRefund
            }
            console.log(refunds);
            const response = await axios.post('/refundRequestProcess', refunds);
            this.props.history.push(`/mypage/myorders/orderDetail/${orderView.groupId}?orderId=${orderView.orderId}`);
        } else {
            this.setState({
                error: '환불 사유를 선택해주세요.'
            });
        }
    }

    orderCount = async () => {
        console.log("orderCount중");
        const params = new URLSearchParams();
        params.append("groupId", this.props.location.state.orderView.groupId)
        await axios({
            method: "post",
            data: params,
            url: "/orderCount"
        }).then(async (res) => {
            this.calculateRefundAmount(res.data);

        });
    }

    calculateRefundAmount = (orderCount) => {
        const { orderView } = this.props.location.state;
        const { gradeDiscount, couponDiscount, pointUse, orderPrice, totalPay } = orderView;
        const ratio = orderPrice / (totalPay + gradeDiscount + couponDiscount + pointUse);
        const refundAmount = orderPrice - Math.round(ratio * gradeDiscount) - Math.round(ratio * couponDiscount) - Math.round(pointUse / orderCount);
        const info = {
            totalRefund: refundAmount,
            orderDate: orderView.orderDate,
            gradeDiscount: Math.round(ratio * gradeDiscount),
            couponDiscount: Math.round(ratio * couponDiscount),
            pointUse: pointUse / orderCount
        }
        this.setState({
            orderView: orderView,
            info: info,
            orderPrice: orderPrice
        })
    }

    handleSelect = (e) => {
        this.setState({
            error: '',
            selectedCode: e.target.value
        })

    }

    componentDidMount() {
        if (!this.props.location.state.orderCount) this.orderCount();
        else this.calculateRefundAmount(this.props.location.state.orderCount);
        this.getCode();
    }

    render() {
        const { selectedCode, code, orderView, info, orderPrice } = this.state;
        const { handleSelect, refund } = this;
        const codeOp = code.map((c, index) => (<option key={c.code} value={index}>{c.content}</option>));
        return (
            <div>
                <div>환불신청</div>
                {orderView && <OrderGroupList data={[].concat(orderView)}></OrderGroupList>}
                <PayInfo info={info} totalPrice={orderPrice}></PayInfo>
                <select value={selectedCode} onChange={handleSelect}>
                    <option value="-1">환불 사유 선택</option>
                    {codeOp}
                </select>
                <div>{this.state.error}</div>
                <button onClick={refund}>신청하기</button>
            </div>

        );
    }
}

export default RefundRequest;