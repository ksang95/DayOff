import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../../common/css/orderList.css'
import MyordersTable from './MyordersTable';
import ReactPaginate from 'react-paginate';



export default class orders extends Component {

  

  state ={
    value : 'all',
    page : 0,
    list : [],
    name : ''
  }

 

  handleCheck = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    }, () => {
      if (this.state.page !== 0)
        document.getElementsByClassName("page-link")[1].click();
      else
      this.orderList(this.state.value,this.state.page,this.state.name)
    })
  }

  handleClick = (e) => {
    if (this.state.page !== 0)
      document.getElementsByClassName("page-link")[1].click();
    else
    this.orderList(this.state.value,this.state.page,this.state.name)
  }

  handlePageClick = data => {
    const selected = data.selected;
    this.setState({ page: selected }, () => {
      this.orderList(this.state.value,this.state.page,this.state.name)
    });
  };
  async orderList(userId,page){
    const params = new URLSearchParams();
    params.append("userId", sessionStorage.getItem("userId"))
    await Axios({
      method : "post",
      data : params,
      url : "/myOrderLIst?page="+page
    }).then((res)=>{
      this.setState({
        list : res.data.content,
        totalPages: res.data.totalPages
      })
    })
  }




componentDidMount(){
  this.orderList(sessionStorage.getItem("userId"),this.state.page)
}


componentWillReceiveProps(nextProps){
  console.log(nextProps.match.params.change)
  console.log(this.props.match.params.change)
  if(nextProps.match.params.change!==this.props.match.paramschange){
    console.log(this.props.match.params.change)
    this.orderList(sessionStorage.getItem("userId"),this.state.page)

  }
}


  render() {
    console.log(this.state.from)


    
    return (
      <div> 
        
      <MyordersTable  list={this.state.list}></MyordersTable>
      <div className="pagenate">
      <ReactPaginate
            previousLabel={'이전'}
            nextLabel={'다음'}
            breakLabel={'...'}
            pageCount={this.state.totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />
          </div>
      </div>
    );
  }
}
