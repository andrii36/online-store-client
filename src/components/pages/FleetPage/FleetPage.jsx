import { Badge, Button, Card, List, Pagination, Typography } from 'antd';
import React, { useState } from 'react';
import { useModal } from '../../../hocs/ModalProvider';
import VehicleInfoContainer from '../../components/VehicleInfoContainer';

const { Text, Title } = Typography;

const VEHICLE_STATUSES = {
    READY: 'green',
    OUT_OF_SERVICE: 'red',
    SERVICE_REQUIRED: 'volcano',
};

const FleetPage = ({ fleet, fleetMessage, vehicleTypes, vehicleTypesError }) => {
    const [pageSize, setPageSize] = useState(10);
    const { showModal } = useModal();

    const handlePageSizeChange = (current, pageSize) => {
        setPageSize(pageSize);
    };

    const handleShowModal = (vehicle) => {
        showModal({
            title: <span>{`${vehicle.make} ${vehicle.model}`}</span>,
            component: <VehicleInfoContainer vehicleId={vehicle._id} />,
        });
    };

    return (
        <div style={{ padding: '20px', background: '#f7f8fa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Company Vehicles
                </Title>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Button type="primary" size="large">
                        Add Vehicle
                    </Button>
                </div>
            </div>

            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={fleet}
                pagination={{
                    pageSize,
                    align: 'center',
                    showSizeChanger: true,
                    onShowSizeChange: handlePageSizeChange,
                    pageSizeOptions: [1, 5, 10],
                }}
                renderItem={(item) => {
                    const vehicleType = vehicleTypes?.list.find((el) => el.type === item.type) || {};
                    return (
                        <Badge.Ribbon
                            color={VEHICLE_STATUSES[item.status.split(' ').join('_').toUpperCase()]}
                            text={item.status}
                        >
                            <Card
                                hoverable
                                bordered={false}
                                style={{ marginBottom: '20px' }}
                                bodyStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                onClick={() => handleShowModal(item)}
                            >
                                <div style={{ textAlign: 'left', flex: 3 }}>
                                    <Title level={5}>{`${item.year} ${item.make} ${item.model}`}</Title>
                                    <Text>{item.licensePlate} - {item.state}</Text>
                                </div>
                                <div style={{ textAlign: 'left', flex: 2 }}>
                                    <Text type="secondary">{item.unitNumber && `Unit ${item.unitNumber}`}</Text>
                                    <div style={{ marginTop: '8px' }}>
                                        <img
                                            src={vehicleType.icon}
                                            alt={item.type}
                                            style={{ width: '40px', verticalAlign: 'middle', marginRight: '8px' }}
                                        />
                                        <Text>{item.type}</Text>
                                    </div>
                                    {item.subtype && <Text type="secondary">{item.subtype}</Text>}
                                </div>
                            </Card>
                        </Badge.Ribbon>
                    );
                }}
            />
        </div>
    );
};

export default FleetPage;