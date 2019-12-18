import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import UpdateInvoice from './component/admin/orders/updateInvoice';
import DeleteProduct from './component/admin/product/DeleteProduct';
import Menu from './component/admin/product/Menu';
import ProductForm from './component/admin/product/ProductForm';
import UserAxios from './component/admin/userList/UserAxios';
import Withdraw from './component/common/login/Withdraw';
import LoginProcess from './component/common/login/LoginProcess';
class App extends Component {
  render() {

    return (
      <div>
        <Route path="/" component={Menu} />
        <Route path="/login/process" component={LoginProcess}/>
        <Switch>
          <Route path="/admin/updateInvoice" component={UpdateInvoice} />
          <Route path="/admin/addProduct" component={ProductForm} />
          <Route path="/admin/deleteProduct" component={DeleteProduct} />
          <Route path="/admin/userList" component={UserAxios} />
          <Route path="/withdraw" component={Withdraw} />
        </Switch>
      </div>
    );
  }
}

export default App;
