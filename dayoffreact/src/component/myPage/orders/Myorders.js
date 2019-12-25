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


  openPopup(url){
    window.open(url,"name","width=700px, height=500px, left=500px ,top=200px")
  }


  render() {
    console.log(sessionStorage.getItem("userId"))
    const {list} = this.state
      const detail = "/detail/"
      const detailOrder = "/orderDetail/"
      const userinfo = "/userinfo/"
      const refund = "/refundRequest/"
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
      {data.codeContent === "배송중" ?<button onClick={()=>this.openPopup.bind(this)(delivery+data.invoice)} >배송조회</button> : ""}
      {data.codeContent === "배송완료" ? <button>구매 확정</button>  : ""}
      {data.codeContent === "구매확정" ? <Link to={{
                        pathname:"/refundRequest",
                        state:{
                            //해당 order가 있는 orderGroup에 속한 order개수 넘겨주시오
                            orderView:{
                                userId:data.userId,
                                userName: data.userName,
                                groupId: data.groupId,
                                orderId: data.orderId,
                                orderColor: data.orderColor,
                                orderSize: data.orderSize,
                                orderQuantity: data.orderQuantity,
                                productId: data.productId,
                                productName: data.productName,
                                productThumbnailName: data.productThumbnailName,
                                orderDate: data.orderDate,
                                orderPrice: data.orderPrice,
                                gradeDiscount: data.gradeDiscount,
                                couponDiscount: data.couponDiscount,
                                pointUse: data.pointUse,
                                totalPay: data.totalPay,
                                invoice: data.invoice,
                                storesId: data.storesId,
                                deliverId: data.deliverId,
                                code: data.code,
                                codeContent: data.codeContent
                            }
                        }
                      }}>환불 신청</Link>  : ""}

      </td>
    </tr>))


    
    return (
      <div> 
        <h1>주문내역</h1>
        <hr width="97%"></hr>
     
        <br></br>
        <table className="n-table">
          <colgroup>
            <col style={{width: + '*'}}></col>
            <col style={{width: + 14.2+'%'}}></col>
            <col style={{width: + 14.2+'%'}}></col>
            <col style={{width: + 14.2+'%'}}></col>
            <col style={{width: + 10.2+'%'}}></col>
            <col style={{width: + 11+'%'}}></col>
          </colgroup>
          <tr >
              <th>상품정보</th>
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
