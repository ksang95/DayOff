import React, { Component } from 'react';

class Total extends Component {
    render() {
      const {cart}= this.props;
        return (
            <div style={{"marginTop": "30px", "backgroundColor":"#F6F6F6","padding": "10px"}}>
            <h3 className="row" style={{ fontWeight: 400 }}>
              <span className="col-6">총 가격:</span>
              <span className="col-6 text-right">{cart.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
            </h3></div>
        );
    }
}

export default Total;