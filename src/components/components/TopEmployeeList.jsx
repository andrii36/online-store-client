import React from 'react';
import { List, Avatar, Typography, Card, Divider } from 'antd';

const { Title } = Typography;

const mockData = {
  Drivers: [
    { id: 1, name: 'John Doe', bonus: 1200, avatar: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Jane Smith', bonus: 1100, avatar: 'https://via.placeholder.com/150' },
  ],
  Dispatchers: [
    { id: 1, name: 'Paul Jones', bonus: 900, avatar: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Emily Brown', bonus: 850, avatar: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Liam White', bonus: 800, avatar: 'https://via.placeholder.com/150' },
  ],
  Mechanics: [
    { id: 1, name: 'Chris Taylor', bonus: 1000, avatar: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Olivia Wilson', bonus: 950, avatar: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Sophia Moore', bonus: 900, avatar: 'https://via.placeholder.com/150' },
    { id: 4, name: 'James Lee', bonus: 850, avatar: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Isabella Harris', bonus: 800, avatar: 'https://via.placeholder.com/150' },
    { id: 6, name: 'William Davis', bonus: 750, avatar: 'https://via.placeholder.com/150' },
  ],
};

const TopEmployeeList = () => {
  return (
    <div
      style={{
        flex: '1 21%',
        margin: 20,
        padding: '16px',
        background: '#f0f2f5',
        border: '1px solid #d9d9d9',
        borderRadius: '8px',
        height: '70vh',
        overflowY: 'auto',
      }}
    >
      <Title level={4} style={{ textAlign: 'center', marginBottom: '16px' }}>
        Top Employees in May
      </Title>
      <Divider />
      {Object.entries(mockData).map(([sectionTitle, employees]) => (
        <Card
          key={sectionTitle}
          title={sectionTitle}
          style={{ marginBottom: '16px' }}
          bodyStyle={{ padding: '0 16px' }}
        >
          <List
            dataSource={employees.slice(0, 5)}
            renderItem={(employee) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={employee.avatar} />}
                  title={employee.name}
                  description={`Bonus: $${employee.bonus}`}
                />
              </List.Item>
            )}
          />
        </Card>
      ))}
    </div>
  );
};

export default TopEmployeeList;