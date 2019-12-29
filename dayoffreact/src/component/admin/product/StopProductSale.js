import React, { Component } from 'react';
import axios from 'axios';

class StopProductSale extends Component {

    componentDidMount(){
    }

    async stopProductSale(id) {
        const params = new URLSearchParams();
        params.append('id', id);
        await axios({
            method: 'post',
            url: '/stopProductSale',
            data: params
        });
    }

   
    handleStopSale = () => {
        const productId=this.props.productId;
        this.stopProductSale(productId);
    }


    render() {
        const { handleStopSale } = this;
        return (
                <button onClick={handleStopSale}>판매중지</button>
        );
    }
}

export default StopProductSale;