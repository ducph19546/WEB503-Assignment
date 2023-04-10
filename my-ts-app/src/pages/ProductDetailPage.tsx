import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { getOneProduct } from '../API/product';
import IProduct from '../interfaces/product';
import { Col, Row, Typography } from 'antd';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { Title, Paragraph } = Typography
    const [product, setProduct] = useState<IProduct>()
    useEffect(() => {
        (async () => {
            const { data } = await getOneProduct(id)
            setProduct(data)
        })()
    }, [])
    return (
        <Row gutter={16} style={{ padding: '2rem' }}>
            <Col xs={24} md={12}>
                {/* <img src={product.imageUrl} alt={product.title} style={{ width: '100%' }} /> */}
                {<img style={{ width: '100%', borderRadius: "5%" }} src={product?.image} />}
            </Col>
            <Col xs={24} md={12}>
                <Title style={{ textAlign: 'center' }} level={2}>{product?.name}</Title>
                <Paragraph strong>${product?.price}</Paragraph>
                <span style={{ fontWeight: "500" }}>Description</span>
                <Paragraph>{product?.desc}</Paragraph>
            </Col>
        </Row>

    )
}

export default ProductDetailPage
