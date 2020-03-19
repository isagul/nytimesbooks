import React, { useState, useEffect, useContext } from 'react';
import { Input, Modal } from 'antd';
import firebase from '../../firebase.config';
import { Store } from '../../store';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { SET_USERS } from '../../constants/actions';
import './register.scss';

const Register = ({ modalValue, toggleLoginModal, toggleRegisterModal }) => {

    const { state, dispatch } = useContext(Store);
    const [mailAddress, setMailAddress] = useState("");
    const [password, setPassword] = useState("");

    const db = firebase.firestore();
    const ref = db.collection('nytimes');
    const auth = firebase.auth();

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

    function registerUser() {
        let newUser = {
            mailAddress,
            password
        }

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
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })

        /*const existUser = state.users.some(user => {
            return user.mailAddress === newUser.mailAddress;
        })*/
        /*auth.createUserWithEmailAndPassword(mailAddress, password).then(info => {
            newUser["uid"] = info.user.uid;
            ref.add(newUser)
            .then(() => {
                dispatch({
                    type: SET_USERS,
                    payload: newUser
                })
                NotificationManager.success(`You signed in successfully`, 'Success', );
            })            
        })    
        .catch(err => {
            NotificationManager.error(`${err.message}`, 'Error');
        })*/
        toggleRegisterModal(false);
    }

    return (
        <Modal
            title="Sign Up"
            className="register-modal"
            visible={modalValue}
            onOk={() => registerUser()}
            onCancel={() => toggleRegisterModal(false)}
            footer={<p>If you have any account <span className="login-text" onClick={() => {toggleRegisterModal(false); toggleLoginModal(true)}}>login!</span></p>}
        >
            <section className="login-input">
                <div>E-mail Address</div>
                <Input autoFocus value={mailAddress} onChange={(e) => getMailAddress(e)} placeholder="Email address" />
            </section>
            <section className="login-input">
                <div>Password</div>
                <Input type="password" placeholder="Password" value={password} onChange={e => getPassword(e)} />
            </section>
            <button className="login-button" onClick={() => registerUser()}>Sign Up</button>
        </Modal>
    )
}

export default Register;