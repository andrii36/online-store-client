import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space, Typography } from "antd";
import { logoutAC } from "../../actions/user-actions";
import { useDispatch } from "react-redux";

const ProfileMenu = ({user}) => {
    const dispatch = useDispatch()
    
    const menu = {
        items: [
            {
                key: 'profile',
                icon: <UserOutlined />,
                label: 'Profile'
            },
            {
                key: 'settings',
                icon: <SettingOutlined />,
                label: 'Settings'
            },
            {
                type: 'divider',
            },
            {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout',
                danger: true,
                onClick: () => {
                    localStorage.removeItem('authtoken')
                    dispatch(logoutAC())
                }
            }
        ]
    }

    return (
        <Space>
            <Dropdown menu={menu} trigger={['click']}>
                <Space
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => e.preventDefault()}
                >
                    <Avatar
                        src={user.image}
                        size="large"
                        icon={<UserOutlined />}
                        style={{ backgroundColor: '#87d068' }}
                    />
                    <Typography.Text>{`${user.firstName} ${user.lastName}`}</Typography.Text>
                </Space>
            </Dropdown>
        </Space>
    )
}

export default ProfileMenu;