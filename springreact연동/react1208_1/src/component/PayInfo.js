import React, { Component } from 'react';

class PayInfo extends Component {
    static defaultProps = {
        info: []
    }
    render() {
        if (this.props.info) {
            const sum = this.props.totalPrice;
            const { totalPay, orderDate, gradeDiscount, couponDiscount, pointUse } = this.props.info;
            return (
                <div>
                    <div><span>주문금액</span><span>{sum}</span></div>
                    <div><span>주문날짜</span><span>{orderDate}</span></div>
                    <div><span>등급할인</span><span>-{gradeDiscount}</span></div>
                    <div><span>쿠폰할인</span><span>-{couponDiscount?couponDiscount:0}</span></div>
                    <div><span>적립금사용</span><span>-{pointUse}</span></div>
                    <div><span>결제금액</span><span>{totalPay}</span></div>
                </div>
            );
        }
        else return (<div></div>);
    }
}

export default PayInfo;