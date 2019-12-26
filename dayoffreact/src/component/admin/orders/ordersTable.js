import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SlideToggle from "react-slide-toggle";
import UpdateInvoice from './updateInvoice';
import Deliver from '../../myPage/orders/deliver';


class ordersTable extends Component {

  
    render() {
      const {list} = this.props
      const detail = "/detail/"
      const detailOrder = "/orderDetail/"
      const userinfo = "/userinfo/"
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
    
      
      <td><Link to={userinfo+data.userId}>{data.userName}</Link></td>

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
              <UpdateInvoice groupId={data.groupId} orderId={data.orderId}></UpdateInvoice>
            </div>
          </div>
      </div>
      )}></SlideToggle>
      : ""}

      {data.codeContent === "배송중" ? <Deliver></Deliver> : ""}

      </td>
    </tr>))

        return (
            <div>
         <table className="n-table">
          <colgroup>
            <col style={{width: + 18+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 14+'%'}}></col>
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
        );
    }
}

export default ordersTable;