import React, { useState, useContext, useEffect } from 'react';
import { Input, Modal } from 'semantic-ui-react';
import firebase from '../../firebase.config';
import {Store} from '../../store';
import {NotificationManager} from "react-notifications";
import {SET_USERS, LOGGED_USER} from '../../constants/actions';
import axios from 'axios';
import './login.scss';

const Login = ({modalValue, toggleLoginModal, toggleRegisterModal}) => {
    const {state, dispatch} = useContext(Store);
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
    },[]);

    function getMailAddress(e){
        setMailAddress(e.target.value);
    }

    function getPassword(e) {
        setPassword(e.target.value);
    }

    function loginUser(){
        /*let newUser = {
            mailAddress,
            password
        }*/
        
        axios.post('https://api-appnytimes.herokuapp.com/user/login', {
            email: mailAddress,
            password: password
        })
            .then(response => {
                if(response.data.status) {
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

        toggleLoginModal(false);      

        /*
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
        <Modal size="mini" open={modalValue} onClose={() => toggleLoginModal(false)} className="login-modal" closeIcon>
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
                <section className="login-input">
                    <div>E-mail Address</div>
                    <Input value={mailAddress} autoFocus onChange={(e) => getMailAddress(e)} placeholder="Email address" />
                </section>
                <section className="login-input">
                    <div>Password</div>
                    <Input type="password" placeholder="Password" value={password} onChange={e => getPassword(e)}/>
                </section>
                <button className="login-button" onClick={() => loginUser()}>Login</button>
            </Modal.Content>
            <Modal.Actions>
                <p>If you do not have any account please <span className="sign-up-text" onClick={() => {toggleLoginModal(false); toggleRegisterModal(true)}}>sign up!</span></p>
            </Modal.Actions>
        </Modal>
    )
}

export default Login;