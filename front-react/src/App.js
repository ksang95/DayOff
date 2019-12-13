import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Commons from './component/common/Commons';
import ProductForm from './component/admin/product/ProductForm';
import DeleteProduct from './component/admin/product/DeleteProduct';
import Menu from './component/admin/product/Menu';

function App() {
  return (
    <div>
      <Route pathh="/" component={Menu}/>
      <Switch>
        <Route path="/admin/addProduct" component={ProductForm} />
        <Route path="/admin/deleteProduct" component={DeleteProduct}/>
      </Switch>
    </div>
  );
}

export default App;
