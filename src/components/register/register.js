import React, { useState } from 'react';
import { Input, Modal, Spin } from 'antd';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import './register.scss';

const Register = ({ modalValue, toggleLoginModal, toggleRegisterModal }) => {
    const [mailAddress, setMailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [spin, setSpin] = useState(false);

    function getMailAddress(e) {
        setMailAddress(e.target.value);
    }

    function getPassword(e) {
        setPassword(e.target.value);
    }

    function registerUser() {
        setSpin(true);

        axios.post('https://api-appnytimes.herokuapp.com/user/signup', {
            email: mailAddress,
            password: password
        })
            .then(response => {
                if (response.data.status) {
                    NotificationManager.success(`You signed in successfully`, 'Success');
                } else {
                    NotificationManager.error(`${response.data.error.message}`, 'Error');
                }
                toggleRegisterModal(false);
                setSpin(false);
            })
            .catch(err => {
            })
    }

    return (
        <Modal
            title="Sign Up"
            className="register-modal"
            visible={modalValue}
            onOk={() => registerUser()}
            onCancel={() => toggleRegisterModal(false)}
            footer={<p>If you have any account <span className="login-text" onClick={() => { toggleRegisterModal(false); toggleLoginModal(true) }}>login!</span></p>}
        >
            <Spin spinning={spin}>
                <section className="login-input">
                    <div>E-mail Address</div>
                    <Input autoFocus value={mailAddress} onChange={(e) => getMailAddress(e)} placeholder="Email address" />
                </section>
                <section className="login-input">
                    <div>Password</div>
                    <Input type="password" placeholder="Password" value={password} onChange={e => getPassword(e)} />
                </section>
                <button className="login-button" onClick={() => registerUser()}>Sign Up</button>
            </Spin>
        </Modal>
    )
}

export default Register;