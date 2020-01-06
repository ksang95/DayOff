import React, { Component } from 'react';
import axios from 'axios';
import Review from './/Review';
import './Reviews.css';

class Reviews extends Component {
    state = {
        reviews:[]
    };
   
    showReview(productId){
      const params = new URLSearchParams();
      params.append("productId",productId);
     axios({
      method: "post",
      url: "/review",
      data: params
    }).then(res => {
      console.log(res);
      this.setState({
        reviews: res.data
      });
    });
    }
  
      componentDidMount () {
        console.log(this.props.productId);
        this.showReview(this.props.productId);
      }

      render() {

        console.log(this.props.productId);
        const reviews = this.state.reviews.map((review,index) => {
          return(
          <Review 
          key={review.id} 
          id={index+1}
          title={review.title} 
          user = {review.users.name}
          content = {review.content}
          rating ={review.rating}
          date={review.reviewDate}
          height={review.users.height}
          weight={review.users.weight}
          />
          )
          
           } ).reverse();
        return (
          <div className="reviewboard">
            <h1>후기게시판</h1>
            
           
     <table className="n-table">
     <colgroup>
       <col style={{ width: +5 + "%" }}></col>
       <col style={{ width: +10 + "%" }}></col>
       <col style={{ width: +10 + "%" }}></col>
       <col style={{ width: +10 + "%" }}></col>
       <col style={{ width: +10 + "%" }}></col>
     </colgroup>
     <thead>
     <tr>
       
       <th>글번호</th>
       <th>제목</th>
       <th>작성자</th>
       <th>작성일</th>
       <th>별점</th>
     </tr>
     </thead>
     <tbody>{reviews}</tbody>
   </table>
   </div>
        );
        
      } 
    }

export default Reviews;