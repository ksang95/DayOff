import React from 'react';

const Login = () => {

    const login = () => {
        window.location.href = "https://kauth.kakao.com/oauth/authorize?client_id=6ba5e46b99c26e457c268cb8ea3bc5da&redirect_uri=http://localhost:3000/login/process/kakao&response_type=code";

    }

    return (
        <img src="/images/kakao_account_login_btn_medium_wide.png" name="kakao" onClick={login} />
    );

}

export default Login;

