import React from 'react';
import { Link } from 'react-router-dom';



const Cart = (props) => (

    <tr>
        
 <td><input type="checkbox" style={{"transform":"scale(1.5)"}} className="checkGroup" name="check" onChange={props.onChange} value={props.id}></input></td>
    
    <td>
    <Link to={"/product/" + props.productId}><div style={{ wordBreak: "break-all" ,textAlign:"left",paddingLeft:"30px"}}><img height="120px"width="120px" src={props.productImage} alt="image"></img> &nbsp;&nbsp;&nbsp;{props.name}</div>
  
</Link>
    </td>
    <td>{props.color} </td>
    <td>{props.size} </td>
    <td>{props.quantity} </td>
    <td>{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </td>
    <td>{props.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </td> 
            
    </tr>
);

export default Cart;