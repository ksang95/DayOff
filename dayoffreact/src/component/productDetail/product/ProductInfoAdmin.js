import React, { Component } from "react";
import axios from "axios";
import "./ProductInfo.css";
import Total from './Total';
import Select from './Select';
import { Link } from "react-router-dom";
import ProductCookie from "./productCookie";
import ProductTogetherBuy from "./productTogetherBuy";

class ProductInfoAdmin extends Component {
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
    // params.append("id", this.props.productId);
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

  scrollToTop (e) {
    document.getElementById("root").scrollTo(0, 0);
  };
  
  componentDidMount() {
    this.getProductDetail(this.props.productId);
    this.showCookie();
    this.TogetherBuy(this.props.productId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.productId !== nextProps.productId) {
      this.getProductDetail(nextProps.productId);
      this.showCookie();
      this.TogetherBuy(nextProps.productId);
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
        className="productImage"
        src={"https://storage.googleapis.com/bit-jaehoon/" + p.name}
        alt="상품이미지"
      ></img>
    ));

    return (
      <div className="product">
        <div className="productData">
          <div className="top">
            <div className="topLeft">
            <div className="images">
    <div className={this.state.product.isAvailable==0&&"modal2"}><div className="popup2">{this.state.product.isAvailable==0&&"판매불가"}</div></div>
                {image}
              </div>
              </div>
          
            <div className="topRight">
              <p>
                카테고리:{product.category.name}/{product.category.subName}
              </p>
              <p>상품명:{product.name}</p>
              <p>
                가격:
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
              <div>{sizeOp}</div>
              <div> {colorOp}</div>
              {this.state.color}
              
              <Select cart={cart} subtract={this.subtract} add={this.add} />

              <Total cart={cart} />
              <div>
                <Link to="/admin/updateProduct/:productId">
                  <button className="btnBuy">  {" "} 상품수정 {" "} </button>
                </Link>
                </div>
                <br />
                <div>
                <Link to="/admin/stopProductSale/:productId">
                <button className="btnCart">
                  {" "}
                  상품삭제{" "}
                </button>
                </Link>
              </div>
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
          <div>
            <ProductCookie cookieList={this.state.cookielist}></ProductCookie>
            <ProductTogetherBuy
              Togetherlist={this.state.Togetherlist}
            ></ProductTogetherBuy>
          </div>

          <div className="review">
            <p>후기게시판</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductInfoAdmin;