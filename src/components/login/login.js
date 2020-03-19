import React, { useState, useContext, useEffect } from 'react';
import { Input, Modal, Spin } from 'antd';
import firebase from '../../firebase.config';
import { Store } from '../../store';
import { NotificationManager } from "react-notifications";
import { SET_USERS, LOGGED_USER } from '../../constants/actions';
import axios from 'axios';
import './login.scss';

const Login = ({ modalValue, toggleLoginModal, toggleRegisterModal }) => {
    const { state, dispatch } = useContext(Store);
    const [mailAddress, setMailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [spin, setSpin] = useState(false);

    const db = firebase.firestore();
    const ref = db.collection('nytimes');
    // const auth = firebase.auth();

    useEffect(() => {
        ref.get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                let user = doc.data();
                dispatch({
                    type: SET_USERS,
                    payload: user
                })
            })
        })
    }, []);

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
            })
            .catch(err => {
                console.log(err);
            })
        // toggleLoginModal(false);
        setSpin(false);
        /*
        let newUser = {
            mailAddress,
            password
        }
        const existUser = state.users.some(user => {
            return user.mailAddress === newUser.mailAddress;
        })
        if (existUser) {    
            auth.signInWithEmailAndPassword(mailAddress, password).then(cred => {
                dispatch({
                    type: LOGGED_USER,
                    payload: cred.user
                });
                NotificationManager.success(`You logged in successfully`, 'Success');
            })                
            .catch(err => {
                NotificationManager.error(`${err.message}`, 'Error');
            })
        } else {
            NotificationManager.error('Error', `Mail address not found`);
        }  */
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