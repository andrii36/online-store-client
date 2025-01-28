import React from "react";
import PropTypes from "prop-types";
import { Badge, Button, Table, Tabs, Typography, Space, Divider } from "antd";
import VehicleServiceForm from "./VehicleServiceForm";
import Status from "./Status";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;
const { TabPane } = Tabs;

const SERVICE_STATUSES = {
    COMPLETED: "success",
    IN_PROGRESS: "processing",
    WAITING: "default",
};

const VEHICLE_STATUSES = {
    READY: "green",
    OUT_OF_SERVICE: "red",
    SERVICE_REQUIRED: "volcano",
};

const VehicleInfo = ({
    currentVehicle,
    handleStatusUpdate,
    dataIsLoading,
    handleDeleteItem,
    handleEditItem,
}) => {
    // Helper to render service descriptions
    const renderServiceDescription = (descriptions) => (
        <ol>
            {descriptions.map((desc, index) => (
                <li key={index}>{desc}</li>
            ))}
        </ol>
    );

    // Prepare service history data source
    const serviceHistoryData = currentVehicle?.serviceHistory?.map(
        (serviceItem, index) => ({
            key: index,
            date: new Date(serviceItem.date).toLocaleDateString(),
            mileage: `${serviceItem.mileage} mi`,
            status: (
                <Status
                    items={SERVICE_STATUSES}
                    currentStatus={serviceItem.status}
                    index={index}
                    onStatusUpdate={handleStatusUpdate}
                />
            ),
            description: renderServiceDescription(serviceItem.description),
        })
    );

    return (
        <div style={{ padding: "24px" }}>
            <Tabs defaultActiveKey="1">
                {/* Overview Tab */}
                <TabPane tab="Overview" key="1">
                    {dataIsLoading || !currentVehicle ? (
                        <div>Loading...</div>
                    ) : (
                        <Badge.Ribbon
                            color={
                                VEHICLE_STATUSES[
                                currentVehicle.status?.split(" ").join("_").toUpperCase()
                                ]
                            }
                            text={currentVehicle.status}
                            placement="start"
                        >
                            <Space
                                direction="vertical"
                                size="large"
                                style={{ width: "100%", textAlign: "center" }}
                            >
                                <img
                                    src={currentVehicle.image}
                                    alt="Vehicle"
                                    style={{ maxWidth: "200px", borderRadius: "8px" }}
                                />
                                <Divider />
                                <Space style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <Space direction="vertical">
                                        <Text strong>Type: </Text>
                                        <Text>{currentVehicle.type}</Text>
                                        <Text strong>Year: </Text>
                                        <Text>{currentVehicle.year}</Text>
                                        <Text strong>Unit Number: </Text>
                                        <Text>{currentVehicle.unitNumber}</Text>
                                    </Space>
                                    <Space direction="vertical">
                                        <Text strong>License Plate: </Text>
                                        <Text>{currentVehicle.licensePlate}</Text>
                                        <Text strong>State Registered: </Text>
                                        <Text>{currentVehicle.state}</Text>
                                        <Text strong>Mileage: </Text>
                                        <Text>{currentVehicle.mileage} mi</Text>
                                    </Space>
                                </Space>
                            </Space>
                        </Badge.Ribbon>
                    )}
                </TabPane>

                {/* Service History Tab */}
                <TabPane tab="Service History" key="2">
                    <Table
                        expandable={{
                            expandedRowRender: (record) => record.description,
                            expandRowByClick: true,
                        }}
                        dataSource={serviceHistoryData}
                        pagination={false}
                    >
                        <Table.Column title="Date" dataIndex="date" key="date" />
                        <Table.Column title="Mileage" dataIndex="mileage" key="mileage" />
                        <Table.Column title="Status" dataIndex="status" key="status" />
                        <Table.Column
                            title="Action"
                            key="action"
                            render={(_, record) => (
                                <Space size="small">
                                    <Button
                                        type="text"
                                        shape="circle"
                                        onClick={() => handleEditItem(record)}
                                        icon={<EditOutlined />}
                                    />
                                    <Button
                                        type="text"
                                        shape="circle"
                                        onClick={() => handleDeleteItem(record)}
                                        icon={<DeleteOutlined />}
                                    />
                                </Space>
                            )}
                        />
                    </Table>
                    <Divider />
                    <VehicleServiceForm
                        vehicle={currentVehicle}
                        onStatusUpdate={handleStatusUpdate}
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};

// PropTypes for validation
VehicleInfo.propTypes = {
    currentVehicle: PropTypes.object,
    handleStatusUpdate: PropTypes.func.isRequired,
    dataIsLoading: PropTypes.bool,
    handleDeleteItem: PropTypes.func.isRequired,
    handleEditItem: PropTypes.func.isRequired,
};

export default VehicleInfo;
