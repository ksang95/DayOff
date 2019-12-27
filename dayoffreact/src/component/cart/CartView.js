import React, { Component } from 'react'
import axios from 'axios';
import Cart from './Cart';

 class CartView extends Component {
  state = {
   cartView:[]
  ,realTotal:0
  }
  // handleCartView() {
  //   const params = new URLSearchParams();
  //   params.append("userId",1);
  //   axios({
  //     method: "post",
  //     url: "/cartView",
  //     data: params
  //   }).then(res => {
  //     console.log(res);
  //     this.setState({
  //       cartView: res.data
  //     });
  //   });
  // }
  handleCartView() {
      axios.get('/cartList',{params:{userId:sessionStorage.getItem("userId")}})
     .then(res => {
      
       console.log(res);
       this.setState({
         cartView:res.data
       })
   });
   this.setState({
    cartView:[],
    realTotal:this.state.realTotal +this.state.cartView.totalPrice
  })
  } 
// getRealTotal(){
//   this.setState({
//     cartView:[],
//     realTotal:this.state.realTotal +this.state.cartView.totalPrice
//   })
// }
  componentDidMount(){
    this.handleCartView();
  }
  render() {
   
    const cartView = this.state.cartView.map( cart => {
      return <Cart
      key={cart.id}
      productThumbnailName={"https://storage.googleapis.com/bit-jaehoon/"+cart.productThumbnailName}
      name={cart.name}
      color={cart.color}
      size={cart.size}
      quantity={cart.quantity}
      price={cart.price}
      totalPrice={cart.totalPrice}
      realTotal={cart.realTotal}
      //getRealTotal={cart.getRealTotal}
      handleCartView={cart.handleCartView}
      
    />;
    });
    return (
      <div> 
        <table className="n-table">
          <colgroup>
          
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
          </colgroup>
          <tr >
              <th>상품정보</th>
              <th>색깔</th>
              <th>사이즈</th>
              <th>수 량</th>
              <th>금액</th>
              <th>총금액</th>
          </tr>
          <tbody>
      {cartView}
        </tbody>
        </table>

    {/* {this.state.persons.map(ct => <div>{ct.id} {ct.size}</div>) } */}
    <button>주문하기</button>
      </div>
    )
  }
}
export default CartView;