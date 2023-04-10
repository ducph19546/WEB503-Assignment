import React, { useEffect, useState } from 'react'
import IProduct from '../interfaces/product'
import { Card, Row, Col, Pagination, List } from 'antd';
import { Link } from 'react-router-dom';
interface IProductProps {
    products: IProduct[];
    onRemove: (id: string | undefined) => void
}

const ProductsPage = ({ products }: IProductProps) => {
    const [data, setData] = useState<IProduct[]>([])
    const [page, setPage] = useState(1)
    useEffect(() => {
        setData(products)
    }, [products])
    const { Meta } = Card
    return (
        <>
            <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 3, xl: 4 }}
                dataSource={data}
                pagination={{ pageSize: 8 }}
                renderItem={(item: IProduct) => (
                    <Link to={`/products/${item._id}`}>
                        <Card
                            hoverable
                            style={{ margin: "1.5rem" }}
                            cover={<img style={{ minHeight: "280px" }} alt="example" src={item?.image} />}
                        >
                            <Meta style={{ textAlign: "center" }} title={item?.name} description={item?.desc} />
                        </Card>
                    </Link>
                )}
            >

            </List >
        </>
    )
}

export default ProductsPage