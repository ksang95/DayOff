import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import OrderAnalysis from './component/admin/analysis/OrderAnalysis';
import UserAnalysis from './component/admin/analysis/UserAnalysis';
import UpdateInvoice from './component/admin/orders/updateInvoice';
import Menu from './component/admin/product/Menu';
import ProductAdd from './component/admin/product/ProductAdd';
import UserAxios from './component/admin/userList/UserAxios';
import LoginSuccess from './component/common/login/LoginSuccess';
import SignUp from './component/common/login/SignUp';
import Withdraw from './component/myPage/user/Withdraw';
import OrderDetail from './component/myPage/orders/orderDetail/OrderDetail';
import RefundRequest from './component/myPage/orders/RefundRequest';
import UpdateUser from './component/myPage/user/UpdateUser';
import Orders from './component/admin/orders/orders';
import Vision from './component/vision/vision';
import Myorders from './component/myPage/orders/Myorders'
import StopProductSale from './component/admin/product/StopProductSale';
import Header from './component/common/header/Header.js'
import Main from './component/main/Main';
import Footer from './component/common/footer/Footer';
import LoginPage from './component/common/login/LoginPage';
import ErrorPage from './component/common/login/ErrorPage';
import CartView from "./component/cart/CartView";
import ProductInfo from './component/productDetail/product/ProductInfo';
import { ProtectedRoute } from "./ProtectedRoute";
import {ProtectedRouteAdmin} from "./ProtectedRouteAdmin"
import deny from './component/common/login/deny';
class App extends Component {
  render() {
    return (
      <div>

        <Switch>
          <Route path="/loginSuccess" component={LoginSuccess} />
          <Route path="/" component={Header} />
        </Switch>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={LoginPage} />
          <Route path="/error" component={ErrorPage} />
          <ProtectedRouteAdmin path="/admin/updateInvoice" component={UpdateInvoice} />
          <ProtectedRouteAdmin path="/admin/addProduct" component={ProductAdd} />
          <ProtectedRouteAdmin path="/admin/stopProductSale/:productId" component={StopProductSale} />
          <ProtectedRouteAdmin path="/admin/userList" component={UserAxios} />
          <ProtectedRouteAdmin path="/admin/usersAnalysis" component={UserAnalysis} />
          <ProtectedRouteAdmin path="/admin/ordersAnalysis" component={OrderAnalysis} />
          <ProtectedRoute path="/mypage/myorders/orderDetail/:groupId" component={OrderDetail} />
          <ProtectedRouteAdmin path="/admin/orders/orderDetail/:groupId" component={OrderDetail} />
          <ProtectedRoute path="/mypage/refundRequest" component={RefundRequest} />
          <ProtectedRoute path="/mypage/myInfo" component={UpdateUser} />
          <ProtectedRoute path="/mypage/withdraw" component={Withdraw} />
          <Route path="/signUp" component={SignUp} />
          <ProtectedRouteAdmin path="/admin/orders" component={Orders} />
          <Route path="/vision" component={Vision} />
          <ProtectedRoute path="/mypage/myorders" component={Myorders} />
          <Route path="/cart" component={CartView} />
          <Route path="/product/:productId" component={ProductInfo} />
          <Route path="/deny" component={deny} />


        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
