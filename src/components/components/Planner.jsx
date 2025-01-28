import React, { useState } from "react";
import {
    List,
    Button,
    Input,
    Modal,
    Tag,
    Typography,
    DatePicker,
    Select,
    Form,
    Space,
    message,
    Collapse,
} from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;
const { Panel } = Collapse;

const priorities = {
    low: "green",
    medium: "orange",
    high: "red",
};

const Planner = ({ tasks, updateTask }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [form] = Form.useForm();

    const categories = {
        before: "Before",
        today: "Today",
        tomorrow: "Tomorrow",
        later: "Later",
    };

    const getTasksByCategory = (key) =>
        tasks.filter((task) =>
            key === "before"
                ? dayjs(task.date).isBefore(dayjs().format("YYYY-MM-DD")) && !task.done
                : key === "today"
                    ? task.date === dayjs().format("YYYY-MM-DD")
                    : key === "tomorrow"
                        ? task.date === dayjs().add(1, "day").format("YYYY-MM-DD")
                        : dayjs(task.date).isAfter(dayjs().add(1, "day"))
        );

    const handleModalOpen = (task = null) => {
        setEditingTask(task);
        if (task) {
            form.setFieldsValue({
                text: task.text,
                date: dayjs(task.date),
                priority: task.priority,
            });
        } else {
            form.resetFields();
            form.setFieldsValue({ priority: "low" });
        }
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        form
            .validateFields()
            .then((values) => {
                const updatedTasks = editingTask
                    ? tasks.map((task) =>
                        task.id === editingTask.id ? { ...task, ...values, date: values.date.format("YYYY-MM-DD") } : task
                    )
                    : [
                        ...tasks,
                        {
                            id: Date.now(),
                            ...values,
                            date: values.date.format("YYYY-MM-DD"),
                            done: false,
                        },
                    ];
                updateTask(updatedTasks);
                setIsModalOpen(false);
                setEditingTask(null);
                message.success(editingTask ? "Task updated" : "Task created");
            })
            .catch((err) => {
                console.error("Validation failed:", err);
            });
    };

    const handleDelete = (id) => {
        updateTask(tasks.filter((task) => task.id !== id));
        message.success("Task deleted");
    };

    const markAsDone = (id) => {
        updateTask(
            tasks.map((task) =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        );
        message.success("Task status updated");
    };

    return (
        <div
            style={{
                flex: "1.5 0 30%",
                margin: 20,
                maxHeight: '100vh',
                overflowY: "auto",
                padding: 20,
                border: "1px solid #ddd",
                borderRadius: 8,
            }}
        >
            <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
                <Title level={4} style={{ margin: 0 }}>
                    Planner
                </Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleModalOpen()}>
                    Create New
                </Button>
            </Space>

            <Collapse defaultActiveKey={['today']}>
                {Object.entries(categories).map(([key, label]) => {
                    const categoryTasks = getTasksByCategory(key);
                    return (
                        <Panel
                            showArrow={false}
                            key={key}
                            header={
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span>{label}</span>
                                    <Tag color="blue">{`${categoryTasks.length} task${categoryTasks.length === 1 ? '' : 's'}`}</Tag>
                                </div>
                            }
                        >
                            <List
                                bordered
                                dataSource={categoryTasks}
                                renderItem={(task) => (
                                    <List.Item style={{ display: 'inherit' }}>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>
                                                    <Tag color={task.done ? "green" : "blue"}>{task.done ? "Done" : "Pending"}</Tag>
                                                    <Tag color={priorities[task.priority]}>{task.priority.toUpperCase()}</Tag>
                                                </div>
                                                <div>
                                                    <Button type="text" icon={<CheckOutlined />} onClick={() => markAsDone(task.id)} />
                                                    <Button type="text" icon={<EditOutlined />} onClick={() => handleModalOpen(task)} />
                                                    <Button type="text" icon={<DeleteOutlined />} danger onClick={() => handleDelete(task.id)} />
                                                </div>
                                            </div>
                                            <div>
                                                <span style={{ color: '#888' }}>{dayjs(task.date).format('MMM D')}</span>
                                                <div>{task.text}</div>
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                                locale={{ emptyText: "No tasks here!" }}
                            />
                        </Panel>
                    );
                })}
            </Collapse>

            <Modal
                title={editingTask ? "Edit Task" : "Create Task"}
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="text"
                        label="Task Text"
                        rules={[{ required: true, message: "Please input the task text!" }]}
                    >
                        <Input placeholder="Enter task description" />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[{ required: true, message: "Please select the task date!" }]}
                    >
                        <DatePicker style={{ width: "100%" }} disabledDate={(current) => current.isBefore(dayjs().format("YYYY-MM-DD"))} />
                    </Form.Item>
                    <Form.Item
                        name="priority"
                        label="Priority"
                        rules={[{ required: true, message: "Please select a priority!" }]}
                    >
                        <Select>
                            <Select.Option value="low">Low</Select.Option>
                            <Select.Option value="medium">Medium</Select.Option>
                            <Select.Option value="high">High</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Planner;