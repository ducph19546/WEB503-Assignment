import { Breadcrumb, Menu, Switch, theme } from 'antd';
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout'
import { Link, Outlet } from 'react-router-dom'

const WebsiteLayout = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (

        <Layout className='layout'>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                >
                    <Menu.Item key="/">
                        <Link to="/">Home page</Link>
                    </Menu.Item>
                    <Menu.Item key="/products">
                        <Link to="/products">Products</Link>
                    </Menu.Item>
                    <Menu.Item key="/sign-up">
                        <Link to="/sign-up">Sign up</Link>
                    </Menu.Item>
                    <Menu.Item key="/sign-in">
                        <Link to="/sign-in">Sign in</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px', }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <div className="site-layout-content" style={{ background: colorBgContainer, minHeight: '80vh' }}>
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    )
}

export default WebsiteLayout