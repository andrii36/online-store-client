import React from 'react';
import { Avatar, Card, Col, Tabs } from 'antd';
import { useModal } from '../../../hocs/ModalProvider';
const { Meta } = Card;

const TeamPage = ({ users, error }) => {
    const { showModal } = useModal()

    const handleShowModal = (user) => {
        showModal({
            title: (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Avatar size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                    <span>{`${user?.userName}'s profile`}</span>
                </div>
            ),
            content: <Tabs items={items} />,
        });
    }

    const items = [
        {
            label: `Overview`,
            key: '1',
            children: 'Content',
        },
        {
            label: `Settings`,
            key: '2',
            children: 'Content',
        },
    ]

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
            {users.map(user => {
                return (
                    <Col span={8} key={user.email}>
                        <Card
                            hoverable
                            title={user.email}
                            onClick={() => handleShowModal(user)}
                            style={{ margin: 25 }}
                        >
                            <Meta
                                avatar={<Avatar src={user.image} />}
                                title={user.userName}
                                description={user.position}
                            />
                        </Card>
                    </Col>
                )
            })}
        </div>
    );
};

export default TeamPage;