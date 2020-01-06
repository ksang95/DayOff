import React, { Component } from "react";
import axios from "axios";
import "./ProductInfo.css";
import Total from './Total';
import Select from './Select';
import { Link} from "react-router-dom";
import LoginMenu from "../../common/login/LoginMenu";
import ProductCookie from "./productCookie";
import ProductTogetherBuy from "./productTogetherBuy";
import Reviews from "../review/Reviews";
import CenterMode from "./CenterMode";
import SlideToggle from 'react-slide-toggle';



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
      id: -1,
      isAvailable: 1
    },
    cookielist: "",
    Togetherlist: "",
    cart: {
      color: "",
      size: "",
      quantity: 0,
      price: 0
    }
  };
  async showCookie() {
    const response = await axios.get("/showcookie");
    console.log(response);
    this.setState({
      cookielist: response.data
    });
  }

  async TogetherBuy(productId) {
    const params = new URLSearchParams();
    params.append("id", productId);
    await axios({
      method: "post",
      data: params,
      url: "/togetherBuy"
    }).then(response =>
      this.setState({
        Togetherlist: response.data
      })
    );
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
    const userId = sessionStorage.getItem("userId");
    if (userId !== null) {
      const cart = {
        quantity: this.state.cart.quantity,
        price: this.state.cart.price,
        color: this.state.color,
        size: this.state.size,
        product: { id: this.state.product.id },
        users: { id: sessionStorage.getItem("userId") }
      };
      if (cart.quantity == 0 || cart.color == null || cart.size == null) {
        alert("상품 선택을 완료해주세요");
      } else {
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
        const isConfirmed = window.confirm(
          "장바구니에 상품이 담겼습니다! 장바구니로 이동하시겠습니까?"
        );

        if (isConfirmed) {
          window.location.href = "/cart";
        }
      }
    } else {
      const cart = {
        quantity: this.state.cart.quantity,
        totalPrice: this.state.cart.price,
        price: this.state.product.price,
        color: this.state.color,
        size: this.state.size,
        product: { id: this.state.product.id },
        name: this.state.product.name,
        users: { id: null },
        productImage: this.state.product.productImage[0].name
      };
      if (cart.quantity == 0 || cart.color == null || cart.size == null) {
        alert("상품 선택을 완료해주세요");
      } else {
        // localStorage.removeItem("cart1");
        let prevCart = JSON.parse(localStorage.getItem("cart1"));
        if (prevCart == null) {
          prevCart = [];
        }
        prevCart.push(cart);
        localStorage.setItem("cart1", JSON.stringify(prevCart));
        this.setState({
          cart: {
            color: "",
            size: "",
            quantity: 0,
            price: 0
          }
        });
        const isConfirmed = window.confirm(
          "장바구니에 상품이 담겼습니다! 장바구니로 이동하시겠습니까?"
        );

        if (isConfirmed) {
          window.location.href = "/cart";
        }
      }
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
    const sizes = document.getElementsByClassName("sizeBtn");
    for(let i=0; i<sizes.length;i++){
      sizes[i].style.backgroundColor='white';
    }
    e.target.style.backgroundColor = 'black';
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
    const colors=document.getElementsByClassName("colorBtn");
    for(let i=0; i<colors.length;i++){
      colors[i].style.border='none';
  
    }
    e.target.style.border = '1px solid #626262';
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
  handleOrder = e => {
    if (!sessionStorage.getItem("userId")) {
      e.preventDefault();
      document.getElementById("loginFrame").style.visibility = "visible";
    }
  };
  handleExit = e => {
    document.getElementById("loginFrame").style.visibility = "hidden";
  };

  scrollToTop(e) {
    document.getElementById("root").scrollTo(0, 0);
  }

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
  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      "shouldComponentUpdate: " +
        JSON.stringify(nextProps) +
        " " +
        JSON.stringify(nextState)
    );
    return true;
  }

  render() {
    console.log(this.state.product.id);
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
          className="colorBtn"
          key={index}
          name={c.color}
          src={"/images/" + c.image}
        ></img>
      </span>
    ));
    // const image = product.productImage.map((p, index) => (
    //   <img
    //     key={p.id}
    //     value={index}
    //     className="productImage"
    //     src={"https://storage.googleapis.com/bit-jaehoon/" + p.name}
    //     alt="상품이미지"
    //   ></img>
    // ));

    return (
      <div className={this.state.product.isAvailable == 0 && "modalroot"}>
        <div className="modal">
          <div className="popup">
            선택 불가 상품입니다...<Link to="/"> 메인으로 돌아가기 </Link>
          </div>
        </div>

        <div className="product">
          <div className="productData">
            <div className="top">
              <div className="topLeft">
                {/* <div className="images">{image}</div> */}
                <div className="images">
                  <CenterMode images={product.productImage}></CenterMode>
                </div>
              </div>
              <div className="topRight">
                <p>
                  카테고리:{product.category.name}/{product.category.subName}
                </p>
                <h1>{product.name}</h1>
                <h2>
                  가격:
                  {product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </h2>
                <h4>
                  {" "}
                  색상
                  <div className="colorOpt">
                    {" "}
                    {colorOp}
                    <span className="colorName">{this.state.color}</span>{" "}
                  </div>
                </h4>
                <h4>
                  {" "}
                  사이즈
                  <div className="sizeOpt">{sizeOp}</div>
                </h4>
                <h4>
                  {" "}
                  수량
                  <div className="sizeOpt">
                    <Select
                      cart={cart}
                      subtract={this.subtract}
                      add={this.add}
                    />
                  </div>
                </h4>

                <Total cart={cart} />
                <div>
                  <Link
                    onClick={this.handleOrder}
                    to={{
                      pathname: "/payInfoList",
                      state: {
                        cartList: [
                          {
                            id: -1,
                            name: this.state.product.name,
                            quantity: this.state.cart.quantity,
                            price: this.state.product.price,
                            totalPrice: this.state.cart.price,
                            color: this.state.color,
                            size: this.state.size,
                            productId: this.state.product.id,
                            userId: sessionStorage.getItem("userId"),
                            productThumbnailName:
                              this.state.product.productImage[0] &&
                              this.state.product.productImage[0].name
                          }
                        ]
                      }
                    }}
                  >
                    <button className="btnBuy"> 바로구매 </button>
                  </Link>
                  <div
                    className="loginFrame"
                    id="loginFrame"
                    style={{ visibility: "hidden" }}
                  >
                    <LoginMenu onExit={this.handleExit}></LoginMenu>
                  </div>
                  <br />
                  <button className="btnCart" onClick={this.addToCart}>
                    {" "}
                    장바구니담기{" "}
                  </button>
                </div>
              </div>
            </div>
            <SlideToggle
              collapsed
              onExpanding={() => {
                const item = document
                  .getElementsByClassName("ProductSlideToggle toggle_EXPANDED")
                  .item(0);
                if (item) item.click();
              }}
              render={({ toggle, setCollapsibleElement, toggleState }) => (
                <div className="my-collapsible">
                  <div
                    className={
                      "my-collapsible__toggle SeveralProductSlideToggle toggle_" +
                      toggleState
                    }
                    onClick={toggle}
                  >
                    <div className="title1">
                      <h2>상세상품정보</h2>
                      <span className="toggleBtn">&or;</span>
                    </div>
                  </div>
                  <div
                    className="my-collapsible__content"
                    ref={setCollapsibleElement}
                  >
                    <div className="my-collapsible__content-inner">
                      {" "}
                      <img
                        src={
                          "https://storage.googleapis.com/bit-jaehoon/" +
                          product.detailImage
                        }
                        alt="1"
                      />
                    </div>
                  </div>
                </div>
              )}
            />
            <div>
              <ProductCookie cookieList={this.state.cookielist}></ProductCookie>
              <br></br>
              <br></br>
              <ProductTogetherBuy
                Togetherlist={this.state.Togetherlist}
              ></ProductTogetherBuy>
            </div>

            <div>
              {this.state.product.id > 0 && (
                <Reviews productId={this.state.product.id}></Reviews>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
          
export default ProductInfo;