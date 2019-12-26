import React, { Component } from 'react';

class SocialLogin extends Component {
    onClick = (e) => {
        const name = e.target.getAttribute("name");
        console.log(name);
        sessionStorage.setItem("currentUrl",this.props.currentUrl)
        switch (name) {
            case "google":
                window.location.href = 'https://localhost:8443/oauth2/authorization/google'
                break;
            case "facebook":
                window.location.href = 'https://localhost:8443/oauth2/authorization/facebook'
                break;
            case "kakao":
                window.location.href = 'https://localhost:8443/oauth2/authorization/kakao'
                break;
        }
    }


    render() {
        const { onClick } = this;
        const style = {
            display: 'block'
        }
        return (
            <div className="social-login">
                <div style={style} className="btn btn-block social-btn google" onClick={onClick}>
                    <img src="/images/google.jpg" name="google"></img>Log in with Google</div>
                <div style={style} className="btn btn-block social-btn facebook" onClick={onClick}>
                    <img src="/images/facebook.png" name="facebook"></img>Log in with Facebook</div>
                <div className="btn btn-block social-btn kakao" onClick={onClick}>
                    <img src="/images/kakao_account_login_btn_medium_wide.png" name="kakao" />
                </div>
            </div>
        );
    }

}

export default SocialLogin;