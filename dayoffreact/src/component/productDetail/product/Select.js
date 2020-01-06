import React, { Component } from 'react';
import './Select.css';

class Select extends Component {
    render() {
        const {cart, subtract,add}=this.props;
        return (
            <div  style={{"margin": "12px"}}>
                
            
          <p>
              <button
                className="selectBtn"
                onClick={subtract}
                disabled={cart.quantity < 1}
                
              >
                -
              </button>
               <input className="input1" readOnly type="text" value= {cart.quantity}/>
             
              <button
                className="selectBtn"
                onClick={add}
              >
                +
              </button>
              </p>
            </div>
        );
    }
}

export default Select;
               