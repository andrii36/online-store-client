import React from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import * as Yup from "yup";
import { yupToFormErrors } from "formik"; // To transform Yup validation for Ant Design
import Logo from "../Common/Logo";
import s from "./SignupPage.module.css";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const SignupPage = ({ onFormSubmit, message }) => {
    const [form] = Form.useForm();

    const validationSchema = Yup.object({
        email: Yup.string()
            .matches(/^[A-Za-z0-9.@]+$/, "Only English letters")
            .min(3, "Minimum length is 3 symbols")
            .required("Required"),
        password: Yup.string().required("Required"),
        userName: Yup.string().required("Required"),
    });

    const handleSubmit = async (values) => {
        try {
            await validationSchema.validate(values, { abortEarly: false });
            onFormSubmit(values);
        } catch (errors) {
            form.setFields(
                Object.entries(yupToFormErrors(errors)).map(([name, errors]) => ({
                    name,
                    errors: [errors],
                }))
            );
        }
    };

    return (
        <div className={s.signupContainer}>
            <div className={s.formWrapper}>
                <Logo />
                <Title level={3} style={{ textAlign: "center" }}>
                    Sign Up
                </Title>
                {message && (
                    <Alert
                        message={message}
                        type="error"
                        showIcon
                        style={{ marginBottom: 20 }}
                    />
                )}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{ maxWidth: 400, margin: "0 auto" }}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { pattern: /^[A-Za-z0-9.@]+$/, message: "Only English letters" },
                            { min: 3, message: "Minimum length is 3 symbols" },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="userName"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input placeholder="Enter your username" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                        >
                            Create Account
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Text>Already have an account?</Text>{" "}
                    <Link to="/login">
                        <Button type="link">Log In</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;