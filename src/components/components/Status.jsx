import { Badge, Select } from "antd";

const Status = ({ currentStatus, index, onStatusUpdate, items }) => {

    const handleStatusChange = (status) => {
        onStatusUpdate(status, index)
    }

    return (
        <div>
            <Select
                value={currentStatus}
                onChange={handleStatusChange}
                onClick={(e) => e.stopPropagation()}
            >
                {Object.keys(items).map(val => <Select.Option
                    key={val}
                    value={val.charAt(0).toUpperCase() + val.split("_").join(" ").toLowerCase().slice(1)}
                >
                    <Badge
                        status={items[val]}
                        text={val.charAt(0).toUpperCase() + val.split("_").join(" ").toLowerCase().slice(1)}
                    />
                </Select.Option>)}
            </Select>
        </div>
    )
}

export default Status;