import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../../common/css/orderList.css'
import { Button,Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Deliver from '../../myPage/orders/Deliver';
import SlideToggle from "react-slide-toggle";
import ReactPaginate from 'react-paginate';
import OrderCancel from '../../myPage/orders/OrderCancel';


export default class orders extends Component {

  

  state ={
    value : 'all',
    page : 0,
    list : [],
    name : '',
    invoice : ''
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      this.orderList(this.state.value,this.state.page,this.state.name)
      
    })
  }

  async pickUpConfirm(groupId){
    const params = new URLSearchParams();
    params.append("groupId", groupId)
    await Axios({
      method : "post",
      data : params,
      url : "/pickUpConfirm"
    }).then((res)=>{
      this.orderList(this.state.value,this.state.page,this.state.name)
      
    })
  }

  handleChangeInput2(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  async orderList(code,page,name){
    const params = new URLSearchParams();
    params.append("code", code)
    params.append("name", name)
    await Axios({
      method : "post",
      data : params,
      url : "/orderList?page="+page
    }).then((res)=>{
      console.log(this.state.value)
      console.log(res.data)
      console.log(page)
      console.log(this.state.page)
      this.setState({
        list : res.data.content,
        totalPages: res.data.totalPages
      })
      // if(page === res.data.totalPages-1 || page === res.data.totalPages){
      //   document.getElementById("next").setAttribute('disabled','true');
      // }else{
      //   document.getElementById("next").removeAttribute('disabled')

      // }
      
      // if(page === 0){
      //   document.getElementById("prev").setAttribute('disabled','true');
      // }else{
      //   document.getElementById("prev").removeAttribute('disabled')

      // }
    })
  }

  



  handleChangeInput(e) {
    this.setState({
      name : e.target.value
    })
    // this.orderList(this.state.value, 0, e.target.value);
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

  render() {
    const {list} = this.state
    const detail = "/product/"
    const detailOrder = "/admin/orders/orderDetail/"
    const userinfo = "/userinfo/"
    const result = list.map((data,index) =>(
    <tr>
      <td>
        <div className="infoDiv"><Link to={detail+data.productId}><img width="90px" height="106px" src={"https://storage.googleapis.com/bit-jaehoon/"+data.productThumbnailName}></img></Link>
          <ul style={{overflow : 'hidden'}} className="nameColor">
            <li><Link className="info1" to={detail+data.productId}>{data.productName}</Link></li>
            <li>컬러 : {data.orderColor} 사이즈 : {data.orderSize}</li>
          </ul>
        </div>
    </td>
  
    
    <td><Link to={"/admin/userList/"+data.userId}>{data.userName}</Link></td>

    <td>{data.orderDate}</td>

    <td><Link to={detailOrder+data.groupId+"?orderId="+data.orderId}>{data.groupId}</Link></td>

    <td>{this.numberWithCommas(data.orderPrice)}원

      <br></br>

    <span>{data.orderQuantity}개</span>
    </td>

    <td>{data.codeContent}

    <br></br>

    {data.codeContent === "배송준비중" ?  

    <SlideToggle collapsed="true" render={({toggle, setCollapsibleElement})=>(
      <div className="my-collapsible">
        <Button variant="outline-dark" className="jaehoon" onClick={toggle}>
        송장번호등록
        </Button>
        <div className="my-collapsible__content" ref={setCollapsibleElement}>
          <div className="my-collapsible__content-inner">
          <div>
        <input type="text" onChange={this.handleChangeInput2.bind(this)} name="invoice" value={this.state.invoice}></input>
              <Button className="jaehoon" variant="outline-dark" onClick={()=>this.updateInvoice.bind(this)(this.state.invoice, data.groupId, data.orderId)}>등록</Button>
      </div>
          </div>
        </div>
    </div>
    )}></SlideToggle>
    : ""}

    {data.codeContent === "배송중" ? <Deliver></Deliver> : ""}
    {data.codeContent === "환불대기중" ? <OrderCancel order={data}></OrderCancel> : ""}
    {data.codeContent === "픽업예정" ? <Button className="jaehoon" variant="outline-dark" onClick={()=>this.pickUpConfirm.bind(this)(data.groupId)}>픽업완료</Button> : ""}
    </td>
  </tr>))


    
    return (
      <div>
      <div className="orderTable"> 
        <h2>주문 내역</h2>
              <hr style={{width : '70%', borderTop: '1px solid black'}}></hr>
        <div className="orderMain">
          <Col sm="3">
       주문상태별 조회 -> <Form.Control as="select" value={this.state.value} onChange={this.handleChange.bind(this)}>
          <option value="all">전체</option>
          <option value="0000">배송준비중</option>
          <option value="0001">배송중</option>
          <option value="0002">배송완료</option>
          <option value="0003">픽업예정</option>
          <option value="0004">픽업완료</option>
          <option value="0005">환불대기중</option>
          <option value="0006">환불완료</option>
          <option value="0007">구매확정</option>
          <option value="0008">후기작성완료</option>
        
        </Form.Control> 
        </Col>
        <br></br>
      회원이름으로 검색 -> <input type="text" name="name" value={this.state.name} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleChangeInput.bind(this)}></input>
      <button onClick={()=> this.orderList.bind(this)(this.state.value, 0, this.state.name)}>검색</button>


      {/* <button id="prev" className="prev"  onClick={()=>this.orderList.bind(this)(this.state.value,this.state.page-1,this.state.name)}>이전페이지</button> */}

      <div>
         <table className="n-table">
          <colgroup>
            <col style={{width: + 40+'%'}}></col>
            <col style={{width: + 9+'%'}}></col>
            <col style={{width: + 12+'%'}}></col>
            <col style={{width: + 9+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 23+'%'}}></col>
          </colgroup>
          <tr >
              <th>상품정보</th>
              <th>회원정보</th>
              <th>주문일자</th>
              <th>주문번호</th>
              <th>주문금액(수량)</th>
              <th>주문상태</th>
          </tr>
          <tbody>
        {result}
        </tbody>
        </table>
            </div>

      {/* <button id="next" className="next" disabled={false} onClick={()=>this.orderList.bind(this)(this.state.value,this.state.page+1,this.state.name)}>다음페이지</button> */}
      </div>
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
