import React, { useState, useContext } from 'react';
import { Input, Modal, Spin } from 'antd';
import { Store } from '../../store';
import { NotificationManager } from "react-notifications";
import { LOGGED_USER } from '../../constants/actions';
import axios from 'axios';
import './login.scss';

const Login = ({ modalValue, toggleLoginModal, toggleRegisterModal }) => {
    const { state, dispatch } = useContext(Store);
    const [mailAddress, setMailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [spin, setSpin] = useState(false);

    function getMailAddress(e) {
        setMailAddress(e.target.value);
    }

    function getPassword(e) {
        setPassword(e.target.value);
    }

    function loginUser() {
        setSpin(true);

        axios.post('https://api-appnytimes.herokuapp.com/user/login', {
            email: mailAddress,
            password: password
        })
            .then(response => {
                if (response.data.status) {
                    NotificationManager.success(`You logged in successfully`, 'Success');
                    dispatch({
                        type: LOGGED_USER,
                        payload: response.data.user
                    });
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('email', response.data.user.email);
                } else {
                    NotificationManager.error(`${response.data.error.message}`, 'Error');
                }
                setSpin(false);
                toggleLoginModal(false);                    
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Modal
            title="Login"
            className="login-modal"
            visible={modalValue}
            onOk={() => loginUser()}
            onCancel={() => toggleLoginModal(false)}
            footer={<p>If you do not have any account please <span className="sign-up-text" onClick={() => { toggleLoginModal(false); toggleRegisterModal(true) }}>sign up!</span></p>}
        >
            <Spin spinning={spin}>
                <section className="login-input">
                    <div>E-mail Address</div>
                    <Input value={mailAddress} autoFocus onChange={(e) => getMailAddress(e)} placeholder="Email address" />
                </section>
                <section className="login-input">
                    <div>Password</div>
                    <Input type="password" placeholder="Password" value={password} onChange={e => getPassword(e)} />
                </section>
                <button className="login-button" onClick={() => loginUser()}>Login</button>
            </Spin>
        </Modal>

    )
}

export default Login;