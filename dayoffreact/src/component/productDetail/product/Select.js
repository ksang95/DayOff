import React, { Component } from 'react';
import './Select.css';


class Select extends Component {
    render() {
        const {cart, subtract,add}=this.props;
        return (
            <div  style={{"margin": "30px","padding": "10px"}}>
                
            
            <span>수량</span>
          
              <button
                className="btn primary"
                onClick={subtract}
                disabled={cart.quantity < 1}
                
              >
                -
              </button>
                
              {cart.quantity}
              <button
                className="btn primary"
                onClick={add}
              >
                +
              </button>
              
            </div>
        );
    }
}

export default Select;
               