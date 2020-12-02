import React, { useState, useContext } from 'react';
import { Input, Modal, Spin } from 'antd';
import { Store } from '../../store';
import { NotificationManager } from "react-notifications";
import { LOGGED_USER } from '../../constants/actions';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './style.scss';

const Login = ({ modalValue, toggleLoginModal, toggleRegisterModal }) => {
    const { state, dispatch } = useContext(Store);
    const [spin, setSpin] = useState(false);

    return (
        <Modal
            title="Login"
            className="login-modal"
            visible={modalValue}
            onCancel={() => toggleLoginModal(false)}
            footer={<p>If you do not have any account please <span className="sign-up-text" onClick={() => { toggleLoginModal(false); toggleRegisterModal(true) }}>sign up!</span></p>}
        >
            <Spin spinning={spin}>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string()
                                .email('*invalid email address')
                                .required('*required'),
                            password: Yup.string()
                                .min(6, '*must be 6 characters or more')
                                .required('*required'),
                        })
                    }
                    onSubmit={
                        values => {
                            const {email, password} = values;
                            setSpin(true);

                            axios.post('https://api-appnytimes.herokuapp.com/user/login', {
                                email: email,
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
                    }
                >
                    {
                        props => {
                            const {
                                values,
                                errors,
                                handleChange,
                                dirty,
                                isSubmitting,
                                handleSubmit
                            } = props;
                            return (
                                <form onSubmit={handleSubmit} className="login-form">
                                    <section className="login-input">
                                        <label>E-mail Address</label>
                                        <Input
                                            autoFocus
                                            name="email"
                                            onChange={handleChange}
                                            placeholder="Email address"
                                            value={values.email}
                                        />
                                        {errors.email ? (
                                            <div className="invalid">{errors.email}</div>
                                        ) : null}
                                    </section>
                                    <section className="login-input">
                                        <label>Password</label>
                                        <Input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password ? (
                                            <div className="invalid">{errors.password}</div>
                                        ) : null}
                                    </section>
                                    <button disabled={!dirty || isSubmitting} className="login-button" type="submit">Login</button>
                                </form>
                            )
                        }
                    }
                </Formik>
            </Spin>
        </Modal>

    )
}

export default Login;