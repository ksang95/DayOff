import React, {Component, Fragment} from 'react';
import axios from 'axios';
import TestList from './TestList';
import OrderType from './OrderType';
import PayInfo from './PayInfo';

class TestComponent extends Component {

    state={
        data:[],
        info:null,
        totalPrice:null
    }
    async getData(){
        try{
            const response=await axios.get("/home");
            const sum = response.data.list.reduce((prev, i) => {
                return prev + i.orderPrice;
            }, 0);
            this.setState({
                data:response.data.list,
                info:response.data.list[0],
                totalPrice:sum
            });
        } catch (e) {
            console.log(e);
        }
        //console.log(data[0].order.orderId);
    }

    componentDidMount(){
        this.getData();
    }

    render (){
        return (
            <Fragment>
            <TestList data={this.state.data}></TestList>
            <OrderType info={this.state.info} />
            <PayInfo totalPrice={this.state.totalPrice} info={this.state.info} />
            </Fragment>

        );
    }
}

export default TestComponent;