import React, { useState } from 'react';
import { Input, Modal } from 'semantic-ui-react';
import './login.scss';

const Login = ({modalValue, toggleLoginModal, toggleRegisterModal}) => {
    return (
        <Modal size="mini" open={modalValue} onClose={() => toggleLoginModal(false)} className="login-modal" closeIcon>
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
                <section className="login-input">
                    <div>E-mail Address</div>
                    <Input />
                </section>
                <section className="login-input">
                    <div>Password</div>
                    <Input type="password" />
                </section>
                <button className="login-button">Login</button>
            </Modal.Content>
            <Modal.Actions>
                <p>If you do not have any account please <span className="sign-up-text" onClick={() => {toggleLoginModal(false); toggleRegisterModal(true)}}>sign up!</span></p>
            </Modal.Actions>
        </Modal>
    )
}

export default Login;