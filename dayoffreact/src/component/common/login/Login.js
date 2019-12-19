import React, {Component} from 'react';
import '../css/login.css';
import google from '../image/구글.jpg'
import facebook from '../image/페이스북.png'

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login to SpringSocial</h1>
                {/* <SocialLogin /> */}
               <SocialLogin></SocialLogin>
                <div className="or-separator">
                </div>
            </div>
        </div>
    );
}


class SocialLogin extends Component {
    render() {
        const login = () => {
            window.location.href = "https://kauth.kakao.com/oauth/authorize?client_id=6ba5e46b99c26e457c268cb8ea3bc5da&redirect_uri=http://localhost:3000/login/process/kakao&response_type=code";
        
        }
        const style = {
        display : 'block'
    }
    return (
        <div className="social-login">
            <a style={style} className="btn btn-block social-btn google" href='http://localhost:8080/oauth2/authorization/google'>
                 <img  src={google}></img>Log in with Google</a>
            <a style={style} className="btn btn-block social-btn facebook" href='http://localhost:8080/oauth2/authorization/facebook'>
               <img src={facebook}></img>Log in with Facebook</a>
<img src="/images/kakao_account_login_btn_medium_wide.png" name="kakao" onClick={login} />
        </div>
    );
}
    
}

export default Login;




