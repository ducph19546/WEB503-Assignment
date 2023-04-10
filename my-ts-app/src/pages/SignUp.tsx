import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { IUser } from '../interfaces/user'
import { register } from '../API/auth'
import { useNavigate } from 'react-router-dom'

type Props = {}

const SignUp = (props: Props) => {
    const nav = useNavigate()
    const onFinish = async (user: IUser) => {
        try {
            const { data } = await register(user)
            message.success(data.message)
            nav("/sign-in")
        } catch (error) {
            message.error(error?.response?.data?.message)
        }


    }
    return (

        <div>
            <h1 style={{ textAlign: "center" }}>SIGN UP</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, padding: "1rem", margin: "0 auto" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Confirm your password"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please input your confirmed password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SignUp