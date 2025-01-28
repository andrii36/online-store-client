import {
    CarOutlined,
    DashboardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import ProfileMenu from '../../components/ProfileMenu';

const DefaultLayout = ({ children }) => {
    const { Header, Sider, Content } = Layout;
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();
    const user = useSelector(state => state.user.currentUser)

    if(!user){
        navigate('/login')
        return <></>
    }

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dasboard',
            onClick: () => navigate('/dashboard'),
        },
        {
            key: 'fleet',
            icon: <CarOutlined />,
            label: 'Fleet',
            onClick: () => navigate('/fleet'),
        },
        {
            key: 'team',
            icon: <TeamOutlined />,
            label: 'Team',
            onClick: () => navigate('/team'),
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
            onClick: () => navigate('/settings')
        },
    ]

    return (
        <Layout style={{ overflow: 'auto' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: '100vh' }}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname.substring(1)]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header style={{
                    alignItems: 'center',
                    padding: '0 16px',
                    background: colorBgContainer,
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <ProfileMenu user={user} />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default DefaultLayout