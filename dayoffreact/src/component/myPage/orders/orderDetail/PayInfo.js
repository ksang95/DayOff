import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class PayInfo extends Component {
    static defaultProps = {
        info: []
    }
    render() {
        if (this.props.info) {
            const sum = this.props.totalPrice;
            const { totalPay, orderDate, gradeDiscount, couponDiscount, pointUse, totalRefund } = this.props.info;
            return (
                <div className="PayInfo">
                    <Table bordered>
                        <tbody>

                    <tr><th>주문날짜</th><td>{orderDate}</td></tr>
                    <tr><th>주문금액</th><td>{sum}원</td></tr>
                    <tr><th>등급할인</th><td>-{gradeDiscount?gradeDiscount:0}원</td></tr>
                    <tr><th>쿠폰할인</th><td>-{couponDiscount?couponDiscount:0}원</td></tr>
                    <tr><th>적립금사용</th><td>-{pointUse?pointUse:0}원</td></tr>
            {totalPay?<tr><th>최종 결제금액</th><td>{totalPay}원</td></tr>:<tr><th>환불받을 금액</th><td>{totalRefund}원</td></tr>}
                        </tbody>
                    </Table>
                </div>
            );
        }
        else return (<div></div>);
    }
}

export default PayInfo;