import React, { Component } from 'react'
import axios from 'axios';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import LoginMenu from '../common/login/LoginMenu';

 class CartView extends Component {
   state = {
     cartView: [],
     realTotal: 0,
     checkedItem: []
   };

   handleCartView = () => {
     const userId = sessionStorage.getItem("userId");
     if (userId !== null) {
       axios
         .get("/cartList", {
           params: { userId: sessionStorage.getItem("userId") }
         })
         .then(res => {
           console.log(res);
           this.setState({
             cartView: res.data
           });
         });
       this.setState({
         cartView: [],
         realTotal: this.state.realTotal + this.state.cartView.totalPrice
       });
     } else {
       const output = localStorage.getItem("cart1");
       const cart1 = JSON.parse(output);
       console.log(cart1);
       if (cart1) {
         this.setState({
           cartView: this.state.cartView.concat(cart1),
           realTotal: this.state.realTotal + this.state.cartView.totalPrice
         });
       }
     }
   };
   handleDeleteItem = async () => {
     const userId = sessionStorage.getItem("userId");
     const cartView = this.state.cartView;
     const checkedItem = this.state.checkedItem;
     const cart1 = cartView.filter(c => !checkedItem.includes(c));
     if (userId !== null) {
       console.log(this.state.checkedItem);
       const checkedItemId = this.state.checkedItem.map(c => c.id);
       console.log(checkedItemId);
       const params = new URLSearchParams();
       checkedItemId.forEach(c => {
         params.append("id", c);
       });
       await axios({
         method: "post",
         url: "/deleteCartItem",
         data: params
       });
     } else {
       localStorage.setItem("cart1", JSON.stringify(cart1));
     }
     this.setState({
       cartView: cart1
     });
   };
   onChange = e => {
     console.log(e.target.checked);
     if (e.target.checked) {
       if (e.target.value === "-1") {
         const checkGroup = document.getElementsByClassName("checkGroup");
         for (let i = 0; i < checkGroup.length; i++) {
           checkGroup[i].checked = true;
         }
         this.setState({
           checkedItem: this.state.cartView
         });
       } else {
         this.setState({
           checkedItem: this.state.checkedItem.concat(
             this.state.cartView[e.target.value]
           )
         });
       }
     } else {
       if (e.target.value === "-1") {
         const checkGroup = document.getElementsByClassName("checkGroup");
         for (let i = 0; i < checkGroup.length; i++) {
           checkGroup[i].checked = false;
         }
         this.setState({
           checkedItem: []
         });
       } else {
         this.setState({
           checkedItem: this.state.checkedItem.filter(c => {
             return this.state.cartView[e.target.value] !== c;
           })
         });
       }
     }
   };

   handleExit = e => {
     document.getElementById("loginFrame").style.visibility = "hidden";
   };
   componentDidMount() {
     this.handleCartView();
   }
   handleOrder = e => {
     if (!sessionStorage.getItem("userId")) {
       e.preventDefault();
       document.getElementById("loginFrame").style.visibility = "visible";
     }
   };

   render() {
     console.log(this.state.checkedItem);
     const cartView = this.state.cartView.map((cart, index) => {
       return (
         <Cart
           key={cart.id}
           id={index}
           productImage={
             "https://storage.googleapis.com/bit-jaehoon/" +
             (cart.productThumbnailName
               ? cart.productThumbnailName
               : cart.productImage)
           }
           name={cart.name}
           color={cart.color}
           size={cart.size}
           quantity={cart.quantity}
           price={cart.price}
           totalPrice={cart.totalPrice}
           realTotal={cart.realTotal}
           onChange={this.onChange}
         />
       );
     });
     return (
       <div>
         <table className="n-table">
           <colgroup>
             <col style={{ width: +5 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
           </colgroup>
           <tr>
             <th>
               <input
                 type="checkbox"
                 value="-1"
                 onChange={this.onChange}
               ></input>
             </th>
             <th>상품정보</th>
             <th>색깔</th>
             <th>사이즈</th>
             <th>수 량</th>
             <th>상품금액</th>
             <th>총금액</th>
           </tr>
           <tbody>{cartView}</tbody>
         </table>
         <button onClick={this.handleDeleteItem}>선택상품 삭제</button>
         <Link
           onClick={this.handleOrder}
           to={{
             pathname: "/payInfoList",
             state: {
               cartList: this.state.checkedItem
             }
           }}
         >
           <button >선택상품 주문하기</button>
         </Link>
         <div
           className="loginFrame"
           id="loginFrame"
           style={{ visibility: "hidden" }}
         >
           <LoginMenu onExit={this.handleExit} ></LoginMenu>
         </div>
       </div>
     );
   }
 }
export default CartView;