import React, { useState } from 'react';
import {
  List,
  Typography,
  Badge,
  Divider,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
  message,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const Announcements = ({
  announcements,
  updateAnnouncement,
  addAnnouncement,
  removeAnnouncement,
}) => {
  const today = dayjs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddNew = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    form.setFieldsValue({
      content: item.content,
      date: dayjs(item.date),
      departments: item.departments,
    });
    setIsModalOpen(true);
  };

  const handleEditAnnouncementsSection = () => {
    setIsEditMode(true);
    message.info('Click an item to select and edit.');
  }

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingItem) {
          updateAnnouncement({ ...values, _id: editingItem._id });
          message.success('Announcement updated!');
        } else {
          addAnnouncement(
            {
              ...values,
              date: values.date.format('YYYY-MM-DD h:mm A'),
            },
          );
          message.success('Announcement added!');
        }
        setIsModalOpen(false);
      })
      .catch(() => {
        message.error('Please fill out all fields.');
      });
  };

  const handleDelete = () => {
    removeAnnouncement(selectedItem._id);
    setSelectedItem(null);
    setIsDeleteModalOpen(false);
    message.success('Announcement deleted!');
  };

  const filteredAnnouncements = announcements?.filter((announcement) =>
    dayjs(announcement.date).isAfter(today.subtract(2, 'week'))).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div
      style={{
        flex: '1 0 21%',
        boxSizing: 'border-box',
        margin: 20,
        height: '70vh',
        overflowY: 'auto',
        padding: '16px',
        background: '#f0f2f5',
        border: '1px solid #d9d9d9',
        borderRadius: '8px',
      }}
    >
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Title level={4}>Announcements</Title>
        <Space>
          <Button
            type='text'
            icon={<PlusOutlined />}
            onClick={handleAddNew}
          />
          <Button
            type='text'
            icon={<EditOutlined />}
            onClick={handleEditAnnouncementsSection}
          />
          {isEditMode && <Button
            type='text'
            icon={<CheckOutlined />}
            onClick={() => {
              setSelectedItem(null);
              setIsEditMode(false);
            }}
          />}
        </Space>
      </Space>
      {isEditMode && <Typography.Text>Please select item to edit</Typography.Text>}
      <Divider />
      <List
        dataSource={filteredAnnouncements}
        renderItem={(item) => {
          const isToday = dayjs(item.date).isSame(today, 'day');
          const isSelected = selectedItem && selectedItem.id === item.id;

          return (
            <>
              <List.Item
                style={{
                  border: isSelected || isEditMode ? '1px solid #1890ff' : 'none',
                  borderRadius: '4px',
                  cursor: isEditMode ? 'pointer' : 'inherit',
                  padding: '8px',
                }}
                onClick={() => isEditMode && setSelectedItem(item)}
              >
                <List.Item.Meta
                  title={
                    <>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 12,
                          color: '#888',
                        }}>
                        <div>
                          {dayjs(item.date).format('h:mm A')}
                        </div>
                        <div>
                          {isToday ? (
                            <Badge
                              count="Today"
                              style={{ backgroundColor: '#52c41a' }}
                            />
                          ) : (
                            <span>
                              {dayjs(item.date).format('MMM D')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>{item.content}</div>
                    </>
                  }
                  description={`Departments: ${item.departments.join(', ')}`}
                />
                {isSelected && (
                  <Space>
                    <Button
                      type='text'
                      icon={<EditOutlined />}
                      onClick={() => handleEditItem(item)}
                    />
                    <Button
                      type='text'
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => setIsDeleteModalOpen(true)}
                    />
                  </Space>
                )}
              </List.Item>
              <Divider />
            </>
          );
        }}
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editingItem ? 'Edit Announcement' : 'Add Announcement'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="content"
            label="Announcement Content"
            rules={[{ required: true, message: 'Please enter the content!' }]}
          >
            <Input placeholder="Enter announcement content" />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select the date!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabled={!!editingItem}
              minDate={dayjs()}
              format='YYYY-MM-DD h:mm A'
            />
          </Form.Item>
          <Form.Item
            name="departments"
            label="Departments"
            rules={[{ required: true, message: 'Please select departments!' }]}
          >
            <Select mode="multiple" placeholder="Select departments">
              <Option value="HR">HR</Option>
              <Option value="Safety">Safety</Option>
              <Option value="Transportation">Transportation</Option>
              <Option value="Service">Service</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      >
        <p>Are you sure you want to delete this announcement?</p>
      </Modal>
    </div>
  );
};

export default Announcements;