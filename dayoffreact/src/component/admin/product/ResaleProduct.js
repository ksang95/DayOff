import React, { Component } from 'react';
import axios from 'axios';

class ResaleProduct extends Component {

    componentDidMount(){
    }

    async resaleProduct(id) {
        const params = new URLSearchParams();
        params.append('id', id);
        await axios({
            method: 'post',
            url: '/ResaleProduct',
            data: params
        });
    }

   
    handleResale = () => {
        const productId=this.props.match.params.productId;
        this.resaleProduct(productId);
    }


    render() {
        const { handleResale } = this;
        return (
                <button onClick={handleResale}>판매재개</button>
        );
    }
}

export default ResaleProduct;