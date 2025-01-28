import {
    Button,
    Collapse,
    Form,
    Input,
    InputNumber,
    List,
    Modal,
    Typography,
} from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateVehicleServiceHistoryThunk } from '../../actions/fleet-actions';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

const VehicleServiceForm = ({ vehicle }) => {
    const [form] = Form.useForm()
    const [services, setServices] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentService, setCurrentService] = useState('')
    const dispatch = useDispatch()

    const handleSubmitButton = (formData) => {
        const serviceHistory = [
            ...vehicle.serviceHistory,
            {
                date: Date.now(),
                mileage: formData.mileage,
                status: 'Waiting',
                description: services
            }
        ]
        dispatch(updateVehicleServiceHistoryThunk(serviceHistory, vehicle._id))
        setServices([])
        form.setFieldValue('mileage', '')
    }

    const handleAddService = () => {
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        if (currentService.trim()) {
            setServices([...services, currentService.trim()]);
            setCurrentService('');
        }
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setCurrentService('');
        setIsModalOpen(false);
    };

    return (
        <Collapse>
            <Collapse.Panel header="New service request" key="1">
                <Form
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 15,
                    }}
                    layout="horizontal"
                    initialValues={{
                        make: vehicle.make,
                        model: vehicle.model,
                    }}
                    size='small'
                    style={{
                        maxWidth: 600,
                        padding: 30,
                    }}
                    form={form}
                    onFinish={handleSubmitButton}

                >
                    <Form.Item name='make' label="Make">
                        <Input disabled={vehicle} />
                    </Form.Item>
                    <Form.Item name='model' label="Model">
                        <Input disabled={vehicle} />
                    </Form.Item>
                    <Form.Item
                        name='mileage'
                        label="Mileage"
                        required
                        rules={[{ required: true }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item style={{ marginTop: 20 }}>
                        <Button type="dashed" onClick={handleAddService} style={{ marginBottom: 20 }}>
                            Add Service
                        </Button>
                        <List
                            bordered
                            dataSource={services}
                            renderItem={(service, index) => (
                                <List.Item key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography>{service}</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Button
                                            type="text"
                                            shape="circle"
                                        >
                                            <EditOutlined />
                                        </Button>
                                        <Button
                                            type="text"
                                            shape="circle"
                                            onClick={
                                                () => setServices(services.filter((_, i) => i !== index))
                                            }
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </List.Item>
                            )}
                            locale={{ emptyText: 'No services added yet' }}
                        />
                    </Form.Item>
                    <Modal
                        title="Add Service"
                        open={isModalOpen}
                        onOk={handleModalOk}
                        onCancel={handleModalCancel}
                    >
                        <Input
                            placeholder="Enter service description"
                            value={currentService}
                            onChange={(e) => setCurrentService(e.target.value)}
                        />
                    </Modal>
                    <Form.Item style={{ marginTop: 20 }}>
                        <Button type='primary' htmlType='submit' disabled={!services.length}>Submit</Button>
                    </Form.Item>
                </Form>
            </Collapse.Panel>
        </Collapse>
    )
}

export default VehicleServiceForm;