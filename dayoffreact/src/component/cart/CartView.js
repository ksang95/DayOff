import React, { Component } from 'react'
import axios from 'axios';
import Cart from './Cart';

 class CartView extends Component {

  state = {
   cartView:[]
  ,realTotal:0
  }



  handleCartView = () => {
    const userId = sessionStorage.getItem("userId")
    if(userId !== null){
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
    }else{
      const output =localStorage.getItem("cart1");
      const cart1 = JSON.parse(output);
      console.log(cart1);
      this.setState({cartView:this.state.cartView.concat(cart1),
      
      });
      this.setState({
        realTotal:this.state.realTotal + this.state.cartView.totalPrice
      })
    }
}
DeleteAll(){
  const userId = sessionStorage.getItem("userId")
  if(userId !== null){
  console.log(this.state.cartView.id)
  axios.post('/deleteCartItem',this.state.cartView.id)
  .then(res=> {
    this.setState({
      cartView:res.data
    })
  })}else{
  console.log(this.state.cartView.id)

    localStorage.clear();
  }
}

handleDeleteItem(){
  const userId = sessionStorage.getItem("userId")
  if(userId !== null){
  console.log(this.state.cartView.id)
  axios.post('/deleteCartItem',this.state.cartView.id)
  .then(res=> {
    this.setState({
      cartView:res.data
    })
  })}else{
  console.log(this.state.cartView.id)

    localStorage.clear();
  }
}

  componentDidMount(){
    this.handleCartView();
  }
  render() {
   
    const cartView = this.state.cartView.map( cart => {
      console.log(cart)
      return <Cart
      key={cart.id} 
      productImage={"https://storage.googleapis.com/bit-jaehoon/"+cart.productImage}
      productThumbnailName={"https://storage.googleapis.com/bit-jaehoon/"+cart.productThumbnailName}
      name={cart.name}
      color={cart.color}
      size={cart.size}
      quantity={cart.quantity}
      price={cart.price}
      totalPrice={cart.totalPrice}
      realTotal={cart.realTotal}
      onClick={this.state.handleDeleteItem}
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
            <col style={{width: + 10+'%'}}></col>
          </colgroup>
          <tr onClick={this.state.DeleteAll}>전체삭제</tr>
          <tr >
              <th>상품정보</th>
              <th>색깔</th>
              <th>사이즈</th>
              <th>수 량</th>
              <th>금액</th>
              <th>총금액</th>
              <th>단일상품 삭제</th>
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