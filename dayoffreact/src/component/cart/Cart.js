import React from 'react';



const Cart = (props) => (

    <tr>
        
 <td><input type="checkbox" className="checkGroup" name="check" onChange={props.onChange} value={props.id}></input></td>
    <td>
    <img height="100px"width="100px" src={props.productImage} alt="image"></img>
    </td>
    <td>{props.color} </td>
    <td>{props.size} </td>
    <td>{props.quantity} </td>
    <td>{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </td>
    <td>{props.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </td> 
 {/* <td>{props.realTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </td>  */}
            
    </tr>
);

export default Cart;