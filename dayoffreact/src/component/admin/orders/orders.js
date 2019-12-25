import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../../common/css/orderList.css'
import SlideToggle from "react-slide-toggle";

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
      console.log("222222222222222222222222222222222222222222222222222")
      this.orderList(this.state.value, this.state.page, this.state.name);
    })
  }



  handleChangeInput2(e) {
    this.setState({
      [e.target.name] : e.target.value
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

  openPopup(url){
    window.open(url,"name","width=700px, height=500px, left=500px ,top=200px")
  }


  render() {
    console.log(this.state.name)
    const {list} = this.state
      const detail = "/detail/"
      const detailOrder = "/orderDetail/"
      const userinfo = "/userinfo/"
      const delivery = "https://tracker.delivery/#/kr.epost/"
      const result = list.map((data,index) =>(
      <tr>
        <td>
          <div className="infoDiv"><Link to={detail+data.productId}><img width="90px" height="106px" src={data.productThumbnailName}></img></Link>
            <ul style={{overflow : 'hidden'}} className="nameColor">
              <li><Link className="info1" to={detail+data.productId}>{data.productName}</Link></li>
              <li>컬러 : {data.orderColor} 사이즈 : {data.orderSize}</li>
            </ul>
          </div>
      </td>
    
      
      <td><Link to={userinfo+data.userName}>{data.userName}</Link></td>

      <td>{data.orderDate}</td>

      <td><Link to={detailOrder+data.groupId+"?orderId="+data.orderId}>{data.groupId}</Link></td>

      <td>{data.orderPrice}원

        <br></br>

      <span>{data.orderQuantity}개</span>
      </td>

      <td>{data.codeContent}

      <br></br>

      {data.codeContent === "배송준비중" ?  

      <SlideToggle collapsed="true" render={({toggle, setCollapsibleElement})=>(
        <div className="my-collapsible">
          <button className="my-collapsible__toggle" onClick={toggle}>
          송장번호등록
          </button>
          <div className="my-collapsible__content" ref={setCollapsibleElement}>
            <div className="my-collapsible__content-inner">
              <input type="text" onChange={this.handleChangeInput2.bind(this)} name="invoice" value={this.state.invoice}></input>
              <button onClick={()=>this.updateInvoice.bind(this)(this.state.invoice, data.groupId, data.orderId)}>등록</button>
            </div>
          </div>
      </div>
      )}></SlideToggle>
      : ""}

      {data.codeContent === "배송중" ?<button onClick={()=>this.openPopup.bind(this)(delivery+data.invoice)} >배송조회</button> : ""}

      </td>
    </tr>))


    
    return (
      <div> 
        <h1>주문내역</h1>
        <hr width="97%"></hr>
       주문상태별 조회 -> <select value={this.state.value} onChange={this.handleChange.bind(this)}>
          <option value="all">전체</option>
          <option value="0000">배송전</option>
          <option value="0001">배송준비중</option>
          <option value="0002">배송완료</option>
          <option value="0003">구매확정</option>
        
        </select> 
        <br></br>
      회원이름으로 검색 -> <input type="text" name="name" value={this.state.name} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleChangeInput.bind(this)}></input>
      <button onClick={()=> this.orderList.bind(this)(this.state.value, 0, this.state.name)}>검색</button>
        <table className="n-table">
          <colgroup>
            <col style={{width: + '*'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
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


      <button id="prev"  onClick={()=>this.orderList.bind(this)(this.state.value,this.state.page-1,this.state.name)}>이전페이지</button>

      <button id="next" disabled={false} onClick={()=>this.orderList.bind(this)(this.state.value,this.state.page+1,this.state.name)}>다음페이지</button>
      </div>
    );
  }
}
