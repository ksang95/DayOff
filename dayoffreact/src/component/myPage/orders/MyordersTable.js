import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OrderCancle from './orderCancle';
import Deliver from './deliver';
import OrderConfirm from './orderConfirm';

class MyordersTable extends Component {
    render() {
        const {list} = this.props
      const detail = "/detail/"
      const detailOrder = "/orderDetail/"
      const userinfo = "/userinfo/"
      const refund = "/mypage/refundRequest/"
      const review = "/reviewInsert/"
      
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

      <td>{data.orderDate}</td>

      <td><Link to={detailOrder+data.groupId+"?orderId="+data.orderId}>{data.groupId}</Link></td>

      <td>{data.orderPrice}원

        <br></br>

      <span>{data.orderQuantity}개</span>
      </td>

      <td>{data.codeContent}

      <br></br>
      {data.codeContent === "배송준비중" ? <OrderCancle orderId={data.orderId}></OrderCancle> : ""}
      {data.codeContent === "배송중" ?<Deliver invoice={data.invoice}></Deliver> : ""}
      {data.codeContent === "구매확정" ? <Link to={review+data.productId}>후기 작성</Link> : ""}
      {data.codeContent === "배송완료" ? <OrderConfirm groupId={data.groupId}></OrderConfirm>  : ""}
      <br></br>
      {data.codeContent === "배송완료" ? <Link to={{
                        pathname:"/mypage/refundRequest",
                        state:{
                            orderView:data
                        }
                      }}>환불 신청</Link>  : ""}
      </td>
    </tr>))

        return (
            <div>
            <h1>주문내역</h1>
            <hr width="97%"></hr>
           <table className="n-table">
          <colgroup>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
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
            </div>
        );
    }
}

export default MyordersTable;