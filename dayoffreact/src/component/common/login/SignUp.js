import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import SignUpForm from './SignUpForm';

class SignUp extends Component {

    state = {
        users: null,
        signUp: false,
        error: null
    }


    componentDidMount() {

        this.signUp();
    }

    signUp = async () => {
        const response = await axios({
            method: 'get',
            url: '/signUp'
        }).then(success => {

            let users = success.data;

            users = {
                socialId: users.socialId,
                name: users.name,
                phone: users.phone,
                birth: users.birth,
                sex: !users.sex ? 'f' : users.sex,
                height: users.height,
                weight: users.weight,
                accessToken: users.accessToken,
                refreshToken: users.refreshToken
            }
            for (let u of Object.keys(users)) {
                users[u] = users[u] ? users[u] : '';
            }
            this.setState({
                users: users
            });

        });

    }

    handleChange = (e) => {
        this.setState({
            users: {
                ...this.state.users,
                [e.target.name]: e.target.value
            }
        })
    }

    handleClick = async () => {
        let flag = true;
        const users = this.state.users;
        for (let key of Object.keys(users)) {
            if (!(key === 'height' || key === 'weight' || key === 'refreshToken') && (users[key].length === 0)) {
                console.log(key)
                flag = false;
                break;
            }
        }
        if (flag) {

            const { users } = this.state;
            users.phone = users.phone.replace(/-/gi, "");
            const params = new URLSearchParams();
            for (let u of Object.keys(users)) {
                params.append(u, users[u] ? users[u] : null);
            }
            await axios.post('/signUpProcess', users)
                .then(success => {
                    this.setState({
                        users: null,
                        signUp: true
                    });
                    sessionStorage.setItem("userId", users.id);
                });

        } else {
            this.setState({
                error: '모든 항목을 입력해주세요.'
            });
        }
    }

    handleExit = (e) => {
        // const socialId=this.state.users.socialId;
        // sessionStorage.setItem("userId", socialId.subString(socialId.indexOf("_")+1));
        // sessionStorage.setItem("userRole", "");
        //this.props.history.push(sessionStorage.getItem("currentUrl"));
        this.props.history.push("/loginSuccess");
    }


    render() {
        const { users, signUp, error } = this.state;
        const { handleChange, handleClick, handleExit } = this;
        const message = signUp ? (<div><div>가입을 환영합니다!</div>회원가입 기념 5% 할인 쿠폰이 쿠폰함으로 지급되었습니다. 쿠폰함을 확인하세요!<button onClick={handleExit}>확인</button></div>) : undefined;

        if (!users) {
            return (
                <div>
                    {message}
                </div>
            );
        } else {

            return (
                <SignUpForm users={users} onChange={handleChange} onClick={handleClick} error={error}></SignUpForm>
            );
        }
    }
}

export default SignUp;

