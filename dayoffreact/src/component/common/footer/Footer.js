import React, { Component } from 'react'
import './footer.css';

export default class Footer extends Component {
  render() {

    return (
      <div className="footer">
        <div className='FooterItem1'>
        <div className='Footer_info'>
            <h4>CS CENTER</h4>
            <h2>1688-1360</h2>
            <a href> Week</a> &nbsp;&nbsp;&nbsp;
            <a href> 10:00~17:00</a> <br></br>
            <a href> 주말, 공휴일은 휴무입니다. <br></br>
            통화량 폭주로 전화연결이 안 될 경우, <br></br>
            게시판에 문의 남겨주시면 <br></br>
            빠른 처리 해드리겠습니다.
            </a>
        </div>
        </div>

        <div className='FooterItem2'>
        <div className='Footer_info'>
            <h4>ACCOUNT INFO</h4> <br></br>
            <a href> 농협 </a> &nbsp;&nbsp;&nbsp;
            <a href> 317-6677-6677-11</a> <br></br>
            <a href> 국민 </a> &nbsp;&nbsp;&nbsp;
            <a href> 96677-667751</a> <br></br>
            <a href> 우체국 </a> &nbsp;&nbsp;&nbsp;
            <a href> 400010-02-890732</a> <br></br>
            <a href> 우리 </a> &nbsp;&nbsp;&nbsp;
            <a href> 1005-593-667788</a> <br></br><br></br>
            <a href> 예금주 : (주)데이오프 </a><br></br>
            </div>
            </div>

            <div className='FooterItem3'>
            <div className='Footer_info'>
            <h4>RETURN</h4> <br></br>
            <a href> 교환/반품 정책 확인 </a><br></br>
            <a href> 경기도 남양주시 도농동<br></br>
            부영아파트 301동 2202호
            </a>
            </div>
            </div>

            <div className='FooterItem4'>
            <div className='Footer_info'>
            <h4>WITH US</h4> <br></br>
            <a href>COMPANY / </a> <a href>회사소개</a><br></br>
            <a href>AGREEMENT / </a> <a href>이용약관</a><br></br>
            <a href>PRIVACY POLICY /</a> <a href>개인정보처리방침</a><br></br>
            <a href>GUIDE /</a> <a href>이용안내</a><br></br>
            </div>
            </div>

            <div className='FooterItem5'>
            <div className='Footer_info'>
            <h4>COMPANY INFO</h4> <br></br>
            <a href>상호명: (주) 육육걸즈 | 대표 : 박예나 <br></br>
                주소 : 55075 전라북도 전주시 완산구 호동길 24<br></br>
                관리책임자 : 박예나 | 이메일: dpskek@hanmail.net<br></br>
                사업자등록번호 : 402-86-03809 [ 사업자정보확인]<br></br>
                통신판매업신고 : 2013-전주완산-0303<br></br><br></br>
                호스팅 : (주)심플렉스인터넷<br></br>
                Copyright © 육육걸즈 all rights reserved.</a>
                </div>
                </div>
                <div className='footerLast'> <br></br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href>대한민국 ©2019 DayOff.Inc. All Rights Reserved</a><a className='footerLast2' href>이용약관 / 개인정보처리방침</a></div>
      </div>
    )
  }
}
