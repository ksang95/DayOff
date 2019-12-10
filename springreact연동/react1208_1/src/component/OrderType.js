import React, { Component } from 'react';

class OrderType extends Component {
    static defaultProps = {
        info: null
    }

    render() {
        const { info } = this.props;
        if (info) {
            if (info.deliverId) {
                const { invoice, deliverName, deliverLocation, deliverPostalCode, deliverPhone } = info;
                return (
                    <div>
                        <div>
                            <span>송장번호</span> <span>{invoice}</span>
                        </div>
                        <div>
                            <span>수령인</span> <span>{deliverName}</span>
                        </div>
                        <div>
                            <span>배송지 주소</span> <span>{deliverLocation}</span>
                        </div>
                        <div>
                            <span>배송지 우편번호</span> <span>{deliverPostalCode}</span>
                        </div>
                        <div>
                            <span>전화번호</span>< span>{deliverPhone}</span>
                        </div>
                    </div>
                );
            }
            else {
                const { storesName, storesLocation } = info;
                return (
                    <div>
                        <div>
                            <span>픽업 매장</span><span>{storesName}</span>
                            <span>주소</span><span>{storesLocation}</span>

                        </div>

                    </div>
                );
            }
        }
        else
            return (<div></div>);

    }
}

export default OrderType;