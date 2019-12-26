import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../../common/css/orderList.css'

import OrdersTable from "./ordersTable"

export default class orders extends Component {

  

  state ={
    value : 'all',
    page : 0,
    size : 10,
    list : [],
    name : ''
  }

  

  async orderList(code,page,name){
    const params = new URLSearchParams();
    params.append("code", code)
    params.append("name", name)
    await Axios({
      method : "post",
      data : params,
      url : "/orderList?page="+page+"&size="+this.state.size
    }).then((res)=>{
      console.log(this.state.value)
      console.log(res.data)
      console.log(page)
      console.log(this.state.page)
      this.setState({
        list : res.data.content,
        page : page
      })
      if(page === res.data.totalPages-1 || page === res.data.totalPages){
        document.getElementById("next").setAttribute('disabled','true');
      }else{
        document.getElementById("next").removeAttribute('disabled')

      }
      
      if(page === 0){
        document.getElementById("prev").setAttribute('disabled','true');
      }else{
        document.getElementById("prev").removeAttribute('disabled')

      }
    })
  }

  



  handleChangeInput(e) {
    this.setState({
      name : e.target.value
    })
    this.orderList(this.state.value, 0, e.target.value);
  }

  componentDidMount(){
    this.orderList("all",this.state.page, this.state.name)
  }

  handleChange(event) {
    this.setState({
      value : event.target.value,
    });

    this.orderList(event.target.value,0,this.state.name)
  }
  
  handleKeyPress(e){
    console.log(e.keyCode)
    if(e.keyCode === 0){ 
      console.log(this.state.name)
      this.orderList(this.state.value, 0, this.state.name);
    }
  }



  render() {
   


    
    return (
      <div> 
        <h1>주문내역</h1>
        <hr width="97%"></hr>
       주문상태별 조회 -> <select value={this.state.value} onChange={this.handleChange.bind(this)}>
          <option value="all">전체</option>
          <option value="0001">배송준비중</option>
          <option value="0007">배송중</option>
          <option value="0002">배송완료</option>
          <option value="0003">구매확정</option>
          <option value="0004">환불신청완료</option>
          <option value="0005">환불완료</option>
          <option value="0006">취소완료</option>
          <option value="0000">후기작성완료</option>
        
        </select> 
        <br></br>
      회원이름으로 검색 -> <input type="text" name="name" value={this.state.name} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleChangeInput.bind(this)}></input>
      <button onClick={()=> this.orderList.bind(this)(this.state.value, 0, this.state.name)}>검색</button>
       
      <OrdersTable list={this.state.list}></OrdersTable>

      <button id="prev"  onClick={()=>this.orderList.bind(this)(this.state.value,this.state.page-1,this.state.name)}>이전페이지</button>

      <button id="next" disabled={false} onClick={()=>this.orderList.bind(this)(this.state.value,this.state.page+1,this.state.name)}>다음페이지</button>
      </div>
    );
  }
}
