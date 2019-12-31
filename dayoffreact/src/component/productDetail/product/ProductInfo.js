import React, { Component } from "react";
import axios from "axios";
// import ProductDetail from "../ProductDetail";
import "./ProductInfo.css";
import Total from './Total';
import Select from './Select';
import ProductCookie from "./productCookie";
import ProductTogetherBuy from "./productTogetherBuy";

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
      id: "",
    },
    cookielist : "",
    Togetherlist : "",
    cart: {
      color: "",
      size: "",
      quantity: 0,
      price: 0
    }
  };

  async showCookie(){
     const response = await axios.get("/showcookie");
    console.log(response)
    this.setState({
        cookielist : response.data
    })
}

async TogetherBuy(productId){
  const params = new URLSearchParams();
  params.append("id",productId)
  await axios({
    method : "post",
    data : params,
    url : "/togetherBuy"
  }).then((response)=>

  this.setState({
      Togetherlist : response.data
  })
  )
}

  getProductDetail(productId) {
    const params = new URLSearchParams();
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
    const userId = sessionStorage.getItem("userId")
    if(userId !== null){
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
               ).catch(error => console.log(error));
           }
           } else{
    const cart = {
      quantity: this.state.cart.quantity,
      totalPrice: this.state.cart.price,
      price: this.state.product.price,
      color: this.state.color,
      size: this.state.size,
      product: { id: this.state.product.id },
      users: { id: sessionStorage.getItem("userId") },
      productImage: this.state.product.productImage[0].name
    };
  
 const prevCart = [].concat(JSON.parse(localStorage.getItem("cart1")))
 if(prevCart==null){
   prevCart = [];
 }
 
 prevCart.push(cart);
    localStorage.setItem("cart1",JSON.stringify(prevCart));
  console.log(cart);
};
  }
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

  scrollToTop (e) {
    document.getElementById("root").scrollTo(0, 0);
  };

  componentDidMount() {
    this.getProductDetail(this.props.match.params.productId);
    this.showCookie();
    this.TogetherBuy(this.props.match.params.productId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.productId !== nextProps.match.params.productId) {
      this.getProductDetail(nextProps.match.params.productId);
      this.showCookie();
      this.TogetherBuy(nextProps.match.params.productId);
      window.scrollTo(0, 0);
    }
   
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
    return true;
  }

  render() {
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
        <div className="product">
          <div className="productData">
            <div className="top">
              <div className="topLeft">
                <div className="ProductImage">{image}</div>
              </div>
              <div className="topRight">
                <p>
                  카테고리:{product.category.name}/{product.category.subName}
                </p>
                <p>상품명:{product.name}</p>
                <p>
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
        <button className="btnBuy" onClick={this.buyNow}>
          {" "}
          바로구매{" "}
        </button>
        <br />
        <button className="btnCart" onClick={this.addToCart}>
          {" "}
          장바구니담기{" "}
        </button>
              </div>
            </div>

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
              <ProductCookie cookieList={this.state.cookielist}></ProductCookie>
              <ProductTogetherBuy Togetherlist={this.state.Togetherlist}></ProductTogetherBuy>

        <p>후기게시판</p>
        <div>
          {/* <ProductDetail /> */}
        </div>
     

          </div>
        </div>
       

    );
  }
}

export default ProductInfo;