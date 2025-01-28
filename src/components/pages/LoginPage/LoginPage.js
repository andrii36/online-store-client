import React from 'react';
import { Button, Checkbox, Form, Input, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import s from './LoginPage.module.css';

const { Title, Text } = Typography;

const LoginPage = ({ onFormSubmit, message }) => {
    const onFinish = (values) => onFormSubmit(values);
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={s.loginContainer}>
            <div className={s.formWrapper}>
                <Title level={3} style={{ textAlign: 'center' }}>
                    Welcome Back!
                </Title>
                <Text style={{ textAlign: 'center', display: 'block', marginBottom: 20 }}>
                    Please login to your account
                </Text>
                {message && (
                    <Text type="danger" style={{ display: 'block', textAlign: 'center', marginBottom: 10 }}>
                        {message}
                    </Text>
                )}
                <Form
                    className={s.loginForm}
                    name="login"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    style={{
                        maxWidth: 400,
                        margin: '0 auto',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                                type: 'email',
                            },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 18 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button type="primary" htmlType="submit" block>
                                Log In
                            </Button>
                            <Button type="link" block>
                                Forgot Password?
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Text>Don't have an account?</Text>{' '}
                    <Link to="/signup">
                        <Button type="link">Create Account</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;