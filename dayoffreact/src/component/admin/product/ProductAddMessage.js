import React, { Component } from 'react';

class ProductAddMessage extends Component {

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.latestProduct!==this.props.latestProduct;
    }

    render() {
        const { latestProduct, productCount } = this.props;
        console.log(latestProduct);
        const completeMessage = latestProduct?
                (<div className="ProductAddMessage">
                    <div className="latestProduct">
                        <img src={"https://storage.googleapis.com/bit-jaehoon/" + latestProduct.productImage[0].name}></img>
                    </div>
                    <span className="productCount">{productCount}</span>
                    <span className="completeMessage">등록 완료</span>
                </div>):null;

        return (
            <div>

                {completeMessage}
            </div>
        );
    }


}

export default ProductAddMessage;