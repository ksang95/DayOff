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
import Withdraw from './component/common/login/Withdraw';
import OrderDetail from './component/myPage/orders/orderDetail/OrderDetail';
import RefundRequest from './component/myPage/orders/RefundRequest';
import UpdateUser from './component/myPage/user/UpdateUser';
import Orders from './component/admin/orders/orders';
import Vision from './component/vision/vision';
import Myorders from './component/myPage/orders/Myorders'
import StopProductSale from './component/admin/product/StopProductSale';
import Header from './component/common/header/Header.js'

class App extends Component {
  render() {

    return (
      <div>
        <Switch>
        <Route path="/loginSuccess" component={LoginSuccess}/>
        <Route path="/" component={Header} />
        {/* <Route path="/" component={Menu} /> */}
        </Switch>
        <Switch>
          <Route path="/admin/updateInvoice" component={UpdateInvoice} />
          <Route path="/admin/addProduct" component={ProductAdd} />
          <Route path="/admin/stopProductSale/:productId" component={StopProductSale} />
          <Route path="/admin/userList" component={UserAxios} />
          <Route path="/admin/usersAnalysis" component={UserAnalysis} />
          <Route path="/admin/ordersAnalysis" component={OrderAnalysis} />
          <Route path="/orderDetail/:groupId" component={OrderDetail}/>
          <Route path="/refundRequest" component={RefundRequest}/>
          <Route path="/updateUser" component={UpdateUser}/>
          <Route path="/withdraw" component={Withdraw} />
          <Route path="/signUp" component={SignUp}/>
          <Route path="/admin/orders" component={Orders}/>
          <Route path="/vision" component={Vision}/>
          <Route path="/mypage/myorders" component={Myorders}/>
        </Switch>
      </div>
    );
  }
}

export default App;
