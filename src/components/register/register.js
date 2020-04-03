import React, { useState } from 'react';
import { Input, Modal, Spin } from 'antd';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { Formik } from 'formik';
import * as Yup from 'yup';
import './register.scss';

const Register = ({ modalValue, toggleLoginModal, toggleRegisterModal }) => {
    const [spin, setSpin] = useState(false);

    return (
        <Modal
            title="Sign Up"
            className="register-modal"
            visible={modalValue}
            onCancel={() => toggleRegisterModal(false)}
            footer={<p>If you have any account <span className="login-text" onClick={() => { toggleRegisterModal(false); toggleLoginModal(true) }}>login!</span></p>}
        >
            <Spin spinning={spin}>
                <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        email: '',
                        password: '',
                    }}
                    validationSchema={
                        Yup.object({
                            firstname: Yup.string()
                                .required('*required')
                                .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/gi,
                                "*invalid firstname"),
                            lastname: Yup.string()
                                .required('*required')
                                .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/gi,
                                "*invalid lastname"),
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
                            const { email, password } = values;
                            setSpin(true);

                            axios.post('https://api-appnytimes.herokuapp.com/user/signup', {
                                email: email,
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
                                <form onSubmit={handleSubmit} className="register-form">
                                    <section className="register-input">
                                        <label>Firstname</label>
                                        <Input
                                            autoFocus
                                            value={values.firstname}
                                            onChange={handleChange}
                                            name="firstname"
                                            placeholder="Firstname" />
                                        {errors.firstname ? (
                                            <div className="invalid">{errors.firstname}</div>
                                        ) : null}
                                    </section>
                                    <section className="register-input">
                                        <label>Lastname</label>
                                        <Input
                                            value={values.lastname}
                                            onChange={handleChange}
                                            name="lastname"
                                            placeholder="Lastname" />
                                        {errors.lastname ? (
                                            <div className="invalid">{errors.lastname}</div>
                                        ) : null}
                                    </section>
                                    <section className="register-input">
                                        <label>E-mail Address</label>
                                        <Input
                                            value={values.email}
                                            onChange={handleChange}
                                            name="email"
                                            placeholder="Email address" />
                                        {errors.email ? (
                                            <div className="invalid">{errors.email}</div>
                                        ) : null}
                                    </section>
                                    <section className="register-input">
                                        <label>Password</label>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange} />
                                        {errors.password ? (
                                            <div className="invalid">{errors.password}</div>
                                        ) : null}
                                    </section>
                                    <button disabled={!dirty || isSubmitting} type="submit" className="register-button">Sign Up</button>
                                </form>
                            )
                        }
                    }
                </Formik>

            </Spin>
        </Modal>
    )
}

export default Register;