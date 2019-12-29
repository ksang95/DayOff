import React, { Component } from "react";
import axios from "axios";
// import ProductDetail from "../ProductDetail";
import "./ProductInfo.css";
import Total from './Total';
import Select from './Select';
import queryString from 'query-string';

class ProductInfo extends Component {
  state = {
    product: {
      productImage: [],
      name: "",
      price: "",
      category: [],
      color: [],
      productSize: [],
      detailImage: "",
      id: ""
    },
    cart: {
      color: "",
      size: "",
      quantity: 0,
      price: 0
    }
  };
  getProductDetail() {
    const params = new URLSearchParams();
    const productId = this.props.match.params.productId
    console.log(productId)
    params.append("id", productId);
    axios({
      method: "post",
      url: "/showProductDetail",
      data: params
    }).then(res => {
      console.log(res);
      this.setState({
        product: res.data
      });
    });
  }
  addToCart = () => {
    
    const cart = {
      quantity: this.state.cart.quantity,
      price: this.state.cart.price,
      color: this.state.color,
      size: this.state.size,
      product: { id: this.state.product.id },
      users: { id: sessionStorage.getItem("userId") }
    };
if(cart.quantity==0||cart.color==null ||cart.size==null){
  alert('상품 선택을 완료해주세요')
}else{
       axios
         .post("/addToCart", cart)
         .then(res =>
           this.setState({
             cart: {
               color: "",
               size: "",
               quantity: 0,
               price: 0
             }
           })
         )
         .catch(error => console.log(error));
     }
  };

  buyNow = e => {
    if (this.state.selected.length > 0) {
      this.state.buyNow();
    }
  };
  selectSize = e => {
    this.setState({
      size: e.target.value
    });
    this.setState({
      cart: {
        ...this.state.cart,
        size: this.state.size
      }
    });
  };
  selectColor = e => {
    this.setState({
      color: e.target.name
    });
    this.setState({
      cart: {
        ...this.state.cart,
        color: this.state.color
      }
    });
  };

  add = () => {
    this.setState({
      cart: {
        ...this.state.cart,
        quantity: this.state.cart.quantity + 1,
        price: this.state.cart.price + this.state.product.price
      }
    });
  };

  subtract = () => {
    this.setState({
      cart: {
        ...this.state.cart,

        quantity: this.state.cart.quantity - 1,
        price: this.state.cart.price - this.state.product.price
      }
    });
  };

  componentDidMount() {
    this.getProductDetail();
  }

  render() {
    console.log(this.state.size);
    console.log(this.state.color);
    console.log(this.state.cart);
    console.log(this.state.quantity);
    const { product, cart } = this.state;
    const sizeOp = product.productSize
      .map((s, index) => (
        <button
          onClick={this.selectSize.bind(this)}
          className="sizeBtn"
          key={index}
          value={s.size}
        >
          {s.size}
        </button>
      ))
      .reverse();
    const colorOp = product.color.map((c, index) => (
      <span>
        <img
          onClick={this.selectColor.bind(this)}
          className="color"
          key={index}
          name={c.color}
          src={"/images/" + c.image}
        ></img>
      </span>
    ));
    const image = product.productImage.map((p, index) => (
      <img
        key={p.id}
        value={index}
        src={"https://storage.googleapis.com/bit-jaehoon/" + p.name}
        alt="상품이미지"
      ></img>
    ));

    return (
      <section>
        <div className="product">
          <div className="productData">
            <div className="top">
              <div className="topLeft">
                <div className="ProductImage">{image}</div>
              </div>
              <div className="topRight">
                <span>
                  {" "}
                  카테고리:{product.category.name}/{product.category.subName}
                </span>
                <p>상품명:{product.name}</p>
                <p>
                  {" "}
                  가격:
                  {product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
                <div>{sizeOp}</div>
                <div> {colorOp}</div>
                {this.state.color}
                <Select cart={cart} subtract={this.subtract} add={this.add} />

                <Total cart={cart} />
              </div>
            </div>
          </div>
        </div>

        <button className="btnBuy" onClick={this.state.buyNow}>
          {" "}
          바로구매{" "}
        </button>
        <br />
        <button className="btnCart" onClick={this.addToCart}>
          {" "}
          장바구니담기{" "}
        </button>
        <section>
          <div className="productDetail">
            상품상세정보:
            <img
              src={
                "https://storage.googleapis.com/bit-jaehoon/" +
                product.detailImage
              }
              alt="1"
            />
          </div>
        </section>
        <p>후기게시판</p>
        <div>
          {/* <ProductDetail /> */}
        </div>
      </section>
    );
  }
}

export default ProductInfo;