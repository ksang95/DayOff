import React, { Component } from 'react';
import InputMask from 'react-input-mask';

class SignUpForm extends Component {


    render() {
        const { name, phone, birth, sex, height, weight } = this.props.users;
        const { error, onChange, onClick, button } = this.props;
        return (
            <div>
                <div>이름*<input name="name" value={name} onChange={onChange}></input></div>
                <div>연락처*<InputMask mask="999-9999-9999" maskChar={null} name="phone" value={phone} onChange={onChange} placeholder="010-0000-0000" /></div>
                <div>생일*<InputMask mask="9999-99-99" maskChar={null} name="birth" value={birth} onChange={onChange} placeholder="1990-01-01" /></div>
                <div>성별*<label><input type="radio" name="sex" value="f" defaultChecked={sex === 'f'} onChange={onChange}></input>여자</label>
                    <label><input type="radio" name="sex" value="m" defaultChecked={sex === 'm'} onChange={onChange}></input>남자</label></div>
                <div>키<input name="height" value={height} onChange={onChange} placeholder="cm"></input></div>
                <div>몸무게<input name="weight" value={weight} onChange={onChange} placeholder="kg"></input></div>
                <div>{error}</div>
                <button onClick={onClick}>{button}</button>
            </div>

        );
    }
}

export default SignUpForm;

