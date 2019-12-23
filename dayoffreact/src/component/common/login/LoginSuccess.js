import React, { Component } from 'react';
import axios from 'axios';

class LoginSuccess extends Component {

    getUser = async () => {
        const response = await axios.get("/getUser");
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("userRole", response.data.userRole);
        this.props.history.push(sessionStorage.getItem("currentUrl"));
    }


    componentDidMount() {
        this.getUser();
    }
    render() {
        return (
            <div></div >
        );

    }
}

export default LoginSuccess;