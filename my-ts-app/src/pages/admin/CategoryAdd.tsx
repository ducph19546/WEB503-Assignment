import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button } from 'antd';
import IProduct from '../../interfaces/product';
import ICategory from '../../interfaces/category';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

interface IProps {
    onAdd: (obj: ICategory) => void,
}

const CategoryAdd = ({ onAdd }: IProps) => {
    const [form] = Form.useForm();
    const nav = useNavigate()
    const onFinish = (values: ICategory) => {
        onAdd(values);
        nav("/admin/categories")

    };
    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input category\'s name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    SAVE
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CategoryAdd;
