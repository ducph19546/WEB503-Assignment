import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import ICategory from '../../interfaces/category';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategory } from '../../API/category';

type Props = {
    onUpdate: (obj: ICategory) => void,
    categories: ICategory[]
}
const CategoryUpdate = ({ onUpdate }: Props) => {
    const { id } = useParams()
    const [category, setCategory] = useState<ICategory>()
    const [form] = Form.useForm();
    const nav = useNavigate()

    useEffect(() => {
        (async () => {
            const { data } = await getCategory(id)
            setCategory(data)
        })()
    }, [])
    useEffect(() => {
        setField()
    }, [category])
    const setField = () => {
        form.setFieldsValue({
            name: category?.name,
            _id: category?._id
        })
    }
    const onFinish = (values: ICategory) => {
        const newCategory = { ...values, _id: id }
        onUpdate(newCategory);
        message.success("Updated successfully!")
        nav("/admin/categories")

    };
    return (<>
        <Form form={form} name='basic' initialValues={{ remember: true }} layout="vertical" onFinish={onFinish}>
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
    </>

    )
}



export default CategoryUpdate