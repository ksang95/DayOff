import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../../common/css/orderList.css'
import MyordersTable from './MyordersTable';
import ReactPaginate from 'react-paginate';



export default class orders extends Component {

  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }

  state ={
    value : 'all',
    page : 0,
    list : [],
    name : '',
    change : 0
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
        totalPages: res.data.totalPages,
        change : 0
      })
    })
  }

change(){
  this.setState({
    change : 1
  })
  console.log(111)
}


componentDidMount(){
  
  this.orderList(sessionStorage.getItem("userId"),this.state.page)
}

shouldComponentUpdate(nextProps,nextState){
  console.log(nextState.change)
  if(nextState.change!==this.state.change){
    console.log(this.state.change)
    this.orderList(sessionStorage.getItem("userId"),this.state.page)
  }
  return true;
}


// componentWillReceiveProps(nextProps){
//   console.log(nextProps.change)
//   console.log(this.props.change)
//   if(nextProps.change!==this.props.change){
//     console.log(this.props.change)
//     this.orderList(sessionStorage.getItem("userId"),this.state.page)

//   }
// }




  render() {
    console.log(this.state.from)
    console.log(this.state.change)

    
    return (
      <div>
      <div className="orderTable"> 
        
      <MyordersTable orderList={this.change} list={this.state.list}></MyordersTable>
      </div>
      <div className="pagenate1">
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
