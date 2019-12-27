import React, { Component } from 'react';

class Select extends Component {
    render() {
        const {cart, subtract,add}=this.props;
        return (
            <div className="col-6 text-right">
                
            <p>
            수량:</p>
          
              <button
                className="btn btn-outline-primary"
                onClick={subtract}
                disabled={cart.quantity < 1}
              >
                -
              </button>
              {cart.quantity}
              <button
                className="btn btn-outline-primary"
                onClick={add}
              >
                +
              </button>
              
            </div>
        );
    }
}

export default Select;
               