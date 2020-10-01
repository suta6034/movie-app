import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import {Form, Input, Button,} from 'antd';
import {withRouter} from "react-router";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function RegisterPage(props) {
    const dispatch = useDispatch();
    return (

        <Formik
            initialValues={{
                email: '',
                lastName: '',
                name: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('Name is required'),
                lastName: Yup.string()
                    .required('Last Name is required'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirm Password is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {

                    let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        lastName: values.lastName,
                        image: ''
                    };
                    alert('you are successfully registered!');
                    dispatch(registerUser(dataToSubmit)).then(response => {
                        if (response.payload.success) {
                            props.history.push("/login");
                        } else {
                            alert(response.err)
                        }
                    });

                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                } = props;
                return (
                    <div className="app">
                        <h2>Sign up</h2>
                        <Form style={{ minWidth: '375px' }} {...formItemLayout}
                            // @ts-ignore
                              onSubmit={handleSubmit} >

                            <Form.Item required label="Name" hasFeedback validateStatus={errors.name && touched.name ? "error" : 'success'} >
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.name && touched.name ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.name && touched.name && (
                                    <div className="input-feedback" style={{marginTop:'-2px'}}>{errors.name}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Last Name" hasFeedback validateStatus={errors.lastName && touched.lastName ? "error" : 'success'}>
                                <Input
                                    id="lastName"
                                    placeholder="Enter your Last Name"
                                    type="text"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.lastName && touched.lastName && (
                                    <div className="input-feedback" style={{marginTop:'-2px'}}>{errors.lastName}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                                <Input
                                    id="email"
                                    placeholder="Enter your Email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback" style={{marginTop:'-2px'}}>{errors.email}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                                <Input
                                    autoComplete="false"
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback" style={{marginTop:'-2px'}}>{errors.password}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Confirm"  hasFeedback validateStatus={errors.confirmPassword && touched.confirmPassword ? "error" : 'success'}>
                                <Input
                                    autoComplete="false"
                                    id="confirmPassword"
                                    placeholder="Enter your confirmPassword"
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="input-feedback" style={{marginTop:'-2px'}}>{errors.confirmPassword}</div>
                                )}
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button
                                    // @ts-ignore
                                    onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};


export default withRouter(RegisterPage)