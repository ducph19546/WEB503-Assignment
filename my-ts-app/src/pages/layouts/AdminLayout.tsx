import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { GoldOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Sider, Footer } = Layout

const AdminLayout = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider
                collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                style={{ background: colorBgContainer }} width={200}>
                <Menu>
                    <Menu.Item icon={<UserOutlined />} ><Link to="/admin">Dashboard</Link> </Menu.Item>
                    <Menu.Item icon={<ShoppingOutlined />} ><Link to="/admin/products">Products</Link> </Menu.Item>
                    <Menu.Item icon={<GoldOutlined />} ><Link to="/admin/categories">Categories</Link> </Menu.Item>
                </Menu>
            </Sider>
            <Content style={{ padding: '2rem', height: '100vh' }}>
                <Outlet />
            </Content>

        </Layout>

    )
}

export default AdminLayout