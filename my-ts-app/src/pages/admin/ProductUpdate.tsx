import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import IProduct from '../../interfaces/product';
import ICategory from '../../interfaces/category';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneProduct } from '../../API/product';

const { Option } = Select;

interface IProps {
    onUpdate: (obj: IProduct) => void,
    categories: ICategory[]
}

const ProductUpdate = ({ onUpdate, categories }: IProps) => {
    const [product, setProduct] = useState<IProduct>()
    const { id } = useParams()
    const [form] = Form.useForm();
    const nav = useNavigate()
    useEffect(() => {
        (async () => {
            const { data } = await getOneProduct(id)
            setProduct(data)
        })()
    }, [])
    useEffect(() => {
        setFields()
    }, [product])
    // const [fileList, setFileList] = useState([]);
    const setFields = () => {
        form.setFieldsValue({
            _id: product?._id,
            name: product?.name,
            price: product?.price,
            desc: product?.desc,
            image: product?.image,
            categoryId: product?.categoryId?._id
        })
    }
    const onFinish = (values: IProduct) => {
        try {
            onUpdate({ ...values, _id: product?._id })
            message.success("Updated successfully!")
            nav("/admin/products")
        } catch (error) {
            message.error(error?.response?.data?.message)
        }

    };
    return (
        <Form form={form} name='basic' initialValues={product} layout="vertical" onFinish={onFinish}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input product\'s name!' }]}
            >
                <Input>
                </Input>
            </Form.Item>
            <Input type="hidden" name="_id" defaultValue={product?._id} />
            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input product\'s price!' }]}
            >
                <InputNumber />
            </Form.Item>



            <Form.Item
                label="Description"
                name="desc"
                rules={[{ required: true, message: 'Please input product\'s description!' }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Categories"
                name="categoryId"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm!' }]}
            >
                <Select>
                    {categories.map(option => (
                        <Option key={option._id} value={option._id}>
                            {option.name}
                        </Option>
                    ))}

                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    SAVE
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProductUpdate;
