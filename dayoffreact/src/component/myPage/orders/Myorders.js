import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../../common/css/orderList.css'
import MyordersTable from './MyordersTable';



export default class orders extends Component {

  

  state ={
    value : 'all',
    page : 0,
    size : 10,
    list : [],
    name : ''
  }


  async orderList(userId,page){
    const params = new URLSearchParams();
    params.append("userId", sessionStorage.getItem("userId"))
    await Axios({
      method : "post",
      data : params,
      url : "/myOrderLIst?page="+page+"&size="+this.state.size
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

 

 

  componentDidMount(){
    this.orderList(sessionStorage.getItem("userId"),this.state.page)
  }


  


  render() {
    console.log(this.state.from)
    console.log(sessionStorage.getItem("userId"))


    
    return (
      <div> 
        
      <MyordersTable list={this.state.list}></MyordersTable>

      <button id="prev"  onClick={()=>this.orderList.bind(this)(this.state.value,this.state.page-1,this.state.name)}>이전페이지</button>

      <button id="next" disabled={false} onClick={()=>this.orderList.bind(this)(this.state.value,this.state.page+1,this.state.name)}>다음페이지</button>
      </div>
    );
  }
}
