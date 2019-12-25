import React, {Component} from 'react';
import ProductAddMessage from './ProductAddMessage';
import ProductForm from './ProductForm';
import SeveralProductForm from './SeveralProductForm';

class ProductAdd extends Component {
    state={
        latestProduct:null, 
        productCount:0 
    }

    createMessage=({latestProduct,productCount})=>{
        this.setState({
            latestProduct:latestProduct,
            productCount:this.state.productCount+productCount
        })
    }

    render(){
        const {latestProduct, productCount}=this.state;
        return(
            <div>
                <SeveralProductForm createMessage={this.createMessage}/>
                ===================================
                <ProductForm createMessage={this.createMessage}></ProductForm>
                <ProductAddMessage latestProduct={latestProduct} productCount={productCount}></ProductAddMessage>
            </div>
        );
    };
}

export default ProductAdd;