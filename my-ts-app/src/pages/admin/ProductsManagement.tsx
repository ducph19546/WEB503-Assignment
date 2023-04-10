import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import IProduct from '../../interfaces/product'
import { Space, Table, Button, Image, Select, message, Form, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getCategory, getProductByCategoryId } from '../../API/category';
import ICategory from '../../interfaces/category'
import { getAllProduct, getOneProduct } from '../../API/product';
import searchProduct from '../../API/search';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

interface IProps {
    products: IProduct[],
    onRemove: (id: string | undefined) => void,
    categories: ICategory[],
}
const { Option } = Select

const ProductsManagement = ({ products, categories, onRemove }: IProps) => {
    const [data, setData] = useState<IProduct[]>([])

    useEffect(() => {
        setData(products)
    }, [products])
    // Lọc sản phẩm theo danh mục
    const handleSelectChange = async (value: string) => {
        if (value === "all") {
            setData(products)
            return
        }
        const { data: category } = await getProductByCategoryId(value)
        setData(category?.products)
    }
    // Sắp xếp sản phẩm
    const handleSortChange = async (value: string) => {
        const { data } = await getAllProduct(value)
        setData(data?.data)
    }
    // Tìm kiếm sản phẩm
    const onFinish = async (value: any) => {
        try {
            if (value.q === "" || null) {
                setData(products)
                return
            }
            const { data: searchResult } = await searchProduct(value.q)
            setData(searchResult)
        } catch (error) {
            message.error(error?.response?.data?.message)
        }

    }
    const onFinishFailed = () => {

    }
    const columns: ColumnsType<IProduct> = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Price", dataIndex: "price", key: "price" },
        {
            title: "Image", dataIndex: "image", key: "image", render: (_, record) => (
                <Image style={{ maxHeight: "50px" }} src={record?.image} />
            )
        },
        {
            title: "Action", dataIndex: "action", key: "action", render: (_, record) => (
                < Space size="middle" >
                    <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => onRemove(record?._id)}> Remove</Button >
                    <Button style={{ backgroundColor: 'blue', color: 'white' }}><Link to={'/admin/products/' + record?._id + '/update'}>Update</Link></Button>
                </Space >
            )
        }
    ]
    return (
        <div>
            <Button type="primary" style={{ background: 'green', color: 'white', marginBottom: '0.5rem' }} htmlType="submit">
                <Link to="/admin/products/add"> ADD NEW PRODUCT</Link>
            </Button>

            <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>

                <Select style={{ minWidth: '240px' }} placeholder="Filter by Category" onChange={handleSelectChange}>
                    <Option key="all" value="all">All</Option>
                    {categories.map(option => (
                        <Option key={option?._id} value={option?._id}>
                            {option?.name}
                        </Option>
                    ))}
                </Select>
                <Select style={{ minWidth: '240px' }} placeholder="Sort by" onChange={handleSortChange}>
                    <Option key="1" value="_sort=name&_order=desc">Name descending</Option>
                    <Option key="2" value="_sort=name&_order=asc">Name ascending</Option>
                    <Option key="3" value="_sort=price&_order=desc">Price descending</Option>
                    <Option key="4" value="_sort=price&_order=asc">Price ascending</Option>
                </Select>
                <Form
                    name="search"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{
                        position: 'relative',
                        width: '240px'
                    }}
                >
                    <Form.Item style={{
                        width: '240px',
                        padding: '10px 40px 10px 10px',
                        boxSizing: 'border-box',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                        name="q"
                    >
                        <Input placeholder="Search product" />
                    </Form.Item>

                    <Form.Item style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',


                    }}>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Form>

            </div>
            <Table dataSource={data} columns={columns} pagination={{ pageSize: 10 }} rowKey="_id">
            </Table>
        </div>
    )
}

export default ProductsManagement