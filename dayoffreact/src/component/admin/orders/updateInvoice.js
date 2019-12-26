import React, { Component } from 'react';
import Axios from 'axios';
class updateInvoice extends Component {

  state = {
    invoice : ''
  }

  
  async updateInvoice(invoice, groupId,orderId){
    console.log(invoice)
    const params = new URLSearchParams();
    params.append("invoice", invoice);
    params.append("groupId", groupId);
    params.append("orderId", orderId)
    await Axios({
      method : "post",
      data : params,
      url : "/updateInvoice"
    }).then((res)=>{
      window.location.reload(false)
    })
  }


  handleChangeInput2(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChangeInput2.bind(this)} name="invoice" value={this.state.invoice}></input>
              <button onClick={()=>this.updateInvoice.bind(this)(this.state.invoice, this.props.groupId, this.props.orderId)}>등록</button>
      </div>
    );
  }
}

export default updateInvoice;