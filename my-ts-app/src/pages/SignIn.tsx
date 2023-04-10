import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IUser } from '../interfaces/user'
import { signIn } from '../API/auth'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Checkbox, Form, Input, message } from 'antd';


const SignIn = () => {
    const nav = useNavigate()
    const onFinish = async (obj: IUser): Promise<void> => {
        try {
            const { data } = await signIn(obj)
            if (data) {
                const { accessToken, message: msg, user } = data
                const jwtExist = JSON.parse(localStorage.getItem("jwt"))
                if (jwtExist) {
                    localStorage.removeItem("jwt")
                }
                localStorage.setItem("jwt", JSON.stringify(accessToken))
                message.success(msg)
                if (user?.role !== "admin") {
                    nav("/")
                    return
                }
                nav("/admin/")
            }
        } catch (error) {
            const errors = error?.response?.data?.message
            message.error(errors)
        }

    }
    const onFinishFailed = () => { }
    return (
        <div>
            <h1>SignIn</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input >
                    </Input>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password >
                    </Input.Password>

                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default SignIn