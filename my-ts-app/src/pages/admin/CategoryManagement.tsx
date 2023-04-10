import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import IProduct from '../../interfaces/product'
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ICategory from '../../interfaces/category';

interface IProps {
    categories: ICategory[],
    onRemove: (id: string | undefined) => void
}

const CategoryManagement = ({ categories, onRemove }: IProps) => {
    const [data, setData] = useState<ICategory[]>([])

    useEffect(() => {
        setData(categories)
    }, [categories])
    const columns: ColumnsType<ICategory> = [
        { title: "Name", dataIndex: "name", key: "name" },
        {
            title: "Number of products", dataIndex: "products", key: "products", render: (_, record) => (<p style={{ textAlign: 'center' }}>{record?.products?.length}</p>)
        },
        {
            title: "Action", dataIndex: "action", key: "action", render: (_, record) => (
                < Space size="middle" >
                    <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => onRemove(record?._id)}> Remove</Button >
                    <Button style={{ backgroundColor: 'blue', color: 'white' }}><Link to={'/admin/categories/' + record?._id + '/update'}>Update</Link></Button>
                </Space >
            )
        }
    ]
    return (
        <div>
            <div className="" style={{ display: 'flex', justifyContent: 'end' }}>
                <Button type="primary" style={{ background: 'green', color: 'white', marginBottom: '0.5rem' }} htmlType="submit">
                    <Link to="/admin/categories/add"> ADD NEW CATEGORY</Link>
                </Button>
            </div>
            <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} rowKey="_id">
            </Table>
        </div>
    )
}

export default CategoryManagement