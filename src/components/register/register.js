import React from 'react';
import { Input, Modal } from 'semantic-ui-react';
import './register.scss';

const Register = ({modalValue, toggleLoginModal, toggleRegisterModal}) => {
    return (
        <Modal size="mini" open={modalValue} onClose={() => toggleRegisterModal(false)} className="register-modal" closeIcon>
            <Modal.Header>Sign Up</Modal.Header>
            <Modal.Content>
                <section className="login-input">
                    <div>E-mail Address</div>
                    <Input />
                </section>
                <section className="login-input">
                    <div>Password</div>
                    <Input type="password" />
                </section>
                <button className="login-button">Sign Up</button>
            </Modal.Content>
            <Modal.Actions>
                <p>If you have any account <span className="login-text" onClick={() => {toggleRegisterModal(false); toggleLoginModal(true)}}>log-in!</span></p>
            </Modal.Actions>
        </Modal>
    )
}

export default Register;