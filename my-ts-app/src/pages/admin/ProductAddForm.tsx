import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import IProduct from '../../interfaces/product';
import ICategory from '../../interfaces/category';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

interface IProps {
    onAdd: (obj: IProduct) => void,
    categories: ICategory[]
}

const AddProduct = ({ onAdd, categories }: IProps) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState<string>("")
    const nav = useNavigate()
    const onFinish = (values: IProduct) => {
        try {
            if (image !== "") {
                onAdd({ ...values, image });
                nav("/admin/products")
                return
            }
            message.error("Please upload an image!")
        } catch (error) {
            alert(error?.response?.data?.message)
        }

    };
    const uploadImg = async () => {
        const imageInput = document.querySelector("#image")
        const imageToUpload = imageInput?.files[0]
        const presetName = "uploadImg"
        const folderName = "TypeScript"
        const API = `https://api.cloudinary.com/v1_1/dkjbawb9s/image/upload`
        const formData = new FormData()

        formData.append("upload_preset", presetName)
        formData.append("folder", folderName)
        formData.append("file", imageToUpload)
        const response = await axios.post(API, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        setImage(response?.data?.secure_url)
    }
    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input product\'s name!' },
                { type: "string", min: 6, message: "Name must be at least 6 chacracters long!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input product\'s price!' },
                { type: "number", min: 0, message: 'Please input a positive number!' }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item> <input type="file" id="image" onChange={uploadImg} /></Form.Item>
            {/* <Form.Item
                label="Ảnh sản phẩm"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={onFileChange}
                rules={[{ required: true, message: 'Vui lòng chọn ảnh sản phẩm!' }]}
            >
                <Upload>
                    <Button>Chọn ảnh</Button>
                </Upload>
            </Form.Item> */}

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
                <Select  >
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

export default AddProduct;
