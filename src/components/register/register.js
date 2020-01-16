import React, {useState, useEffect, useContext} from 'react';
import { Input, Modal } from 'semantic-ui-react';
import firebase from '../../firebase.config';
import {Store} from '../../store';
import {NotificationManager} from "react-notifications";
import './register.scss';

const Register = ({modalValue, toggleLoginModal, toggleRegisterModal}) => {

    const {state, dispatch} = useContext(Store);
    const [isMailAddressValid, setIsMailAddressValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [mailAddress, setMailAddress] = useState("");
    const [password, setPassword] = useState("");

    const db = firebase.firestore();
    const ref = db.collection('nytimes');

    useEffect(() => {
        ref.get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                let user = doc.data();
                dispatch({
                    type:'SET_USERS',
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

    function registerUser(){
        let newUser = {
            mailAddress,
            password
        }
        const existUser = state.users.some(user => {
            return user.mailAddress === newUser.mailAddress;
        })
        if (!existUser) {
            ref.add(newUser)
            .then(() => {
                dispatch({
                    type:'SET_USERS',
                    payload: newUser
                })
            })
            .catch(err => {
                console.log(err);
            })            
            NotificationManager.success('Register Success', `You signed in successfully`);
        } else {
            NotificationManager.error('Error', `Mail address already exist.`);
        }  
        toggleRegisterModal(false);              
    }

    return (
        <Modal size="mini" open={modalValue} onClose={() => toggleRegisterModal(false)} className="register-modal" closeIcon>
            <Modal.Header>Sign Up</Modal.Header>
            <Modal.Content>
                <section className="login-input">
                    <div>E-mail Address</div>
                    <Input value={mailAddress} onChange={(e) => getMailAddress(e)}/>
                </section>
                <section className="login-input">
                    <div>Password</div>
                    <Input type="password" value={password} onChange={e => getPassword(e)}/>
                </section>
                <button className="login-button" onClick={() => registerUser()}>Sign Up</button>
            </Modal.Content>
            <Modal.Actions>
                <p>If you have any account <span className="login-text" onClick={() => {toggleRegisterModal(false); toggleLoginModal(true)}}>log-in!</span></p>
            </Modal.Actions>
        </Modal>
    )
}

export default Register;