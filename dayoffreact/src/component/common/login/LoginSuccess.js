import React, { Component } from 'react';
import axios from 'axios';

class LoginSuccess extends Component {

    getUser = async () => {
        const response = await axios.get("/getUser");
        const users=response.data;
        sessionStorage.setItem("userId", users.id);
        sessionStorage.setItem("userRole", users.role);
        sessionStorage.setItem("userName", users.name);

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