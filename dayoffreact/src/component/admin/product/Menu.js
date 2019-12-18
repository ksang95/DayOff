import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import Login from '../../common/login/Login';
import LoginProcess from '../../common/login/LoginProcess';

class Menu extends Component {
    state={
        login:false
    }

    componentDidMount(){
        if(sessionStorage.getItem("userId"))
       this.setState({
           login:true
       })
    }
    shouldComponentUpdate(prevProps, prevState) {
       
        return true;
    }

    handleLogin = (e) => {
        switch (e.target.innerHTML) {
            case '로그아웃':
                this.logout();
                break;
            case '로그인':
                document.getElementById("loginFrame").style.visibility = "visible";
                break;
        }
    }

    logout = async () => {
        const params = new URLSearchParams();
        params.append("userId", sessionStorage.getItem("userId"));
        const response = await axios({
            method: 'post',
            url: '/logout',
            data: params
        }).then(success=>{
            sessionStorage.removeItem("userId");
            this.setState({
                login:false
            })
        });
    }

    render() {
        const login=sessionStorage.getItem("userId")?'로그아웃':'로그인';

        return (
            <div>

                <ul>
                    <li><div onClick={this.handleLogin}>{login}</div></li>
                    <li><Link to="/admin/addProduct">상품 등록</Link></li>
                    <li><Link to="/admin/deleteProduct">상품 삭제</Link></li>
                    <li><Link to="/admin/updateInvoice">송장번호 등록</Link></li>
                    <li><Link to="/admin/userList">유저리스트</Link></li>
                    <li><Link to="/withdraw">탈퇴하기</Link></li>

                </ul>
                <div className="loginFrame" id="loginFrame" style={{ visibility: "hidden" }}>
                    <Login></Login>
                </div>

            </div>

        );
    }
}

export default Menu;