import React, { Component } from 'react';
import axios from 'axios';

class ResaleProduct extends Component {

    componentDidMount(){
    }

    async changeProductSale(id,availability) {
        const params = new URLSearchParams();
        params.append('id', id);
        params.append('availability', availability);
        await axios({
            method: 'post',
            url: '/changeProductSale',
            data: params
        });
    }

   
    handleChangeSale = () => {
        this.changeProductSale(this.props.productId, 1);
    }


    render() {
        const { handleChangeSale } = this;

        return (
        <button onClick={handleChangeSale}>판매재개</button>
        );
    }
}

export default ResaleProduct;