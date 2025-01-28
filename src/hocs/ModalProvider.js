import React, { createContext, useContext, useState } from "react";
import { Modal } from "antd";

// Create context
const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modalConfig, setModalConfig] = useState({
        visible: false,
        title: "",
        component: null,
        userData: null, // Store user-specific data
        onOk: null,
        onCancel: () => setModalConfig({ ...modalConfig, visible: false }),
        width: null
    });

    const showModal = ({ title, component, userData, onOk, onCancel, width }) => {

        setModalConfig({
            visible: true,
            title,
            component,
            userData,
            onOk,
            onCancel: onCancel || modalConfig.onCancel,
            width: width || 550
        })
    }


    return (
        <ModalContext.Provider value={{ showModal }}>
            {children}
            {modalConfig.visible && <Modal
                title={modalConfig.title}
                open={modalConfig.visible}
                onOk={modalConfig.onOk}
                onCancel={modalConfig.onCancel}
                footer={null}
                width={modalConfig.width}
            >
                {modalConfig.component}
            </Modal>}
        </ModalContext.Provider>
    );
};
