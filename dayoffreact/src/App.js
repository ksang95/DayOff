import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProductForm from './component/admin/product/ProductForm';
import DeleteProduct from './component/admin/product/DeleteProduct';
import Menu from './component/admin/product/Menu';
import UpdateInvoice from './component/admin/orders/updateInvoice'
import UserAxios from './component/admin/userList/UserAxios';
function App() {
  return (
    <div>
      <Route path="/" component={Menu}/>
      <Switch>
      <Route path="/admin/updateInvoice" component={UpdateInvoice} />
        <Route path="/admin/addProduct" component={ProductForm} />
        <Route path="/admin/deleteProduct" component={DeleteProduct}/>
        <Route path="/admin/userList" component={UserAxios}/>
      </Switch>
    </div>
  );
}

export default App;
