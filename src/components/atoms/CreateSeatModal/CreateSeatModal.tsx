"use client";
import React, {useState} from "react";
// import Modal from "../Modal";
import Input from "@/components/atoms/Input";
import Checkbox from "@/components/atoms/Checkbox";
import {useUser} from "@/context/SeatContext";

import {createSeat} from "@/services/manager/seat";
import Modal from "@/components/molecules/Modal";

interface CreateSeatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSeatCreated: () => void;
    roomId: string;
}

const CreateSeatModal: React.FC<CreateSeatModalProps> = ({
    isOpen,
    onClose,
    onSeatCreated,
    roomId
}) => {
    const {userList, refreshUsers} = useUser();
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        typeSeat: "",
        assign: ""
    });

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateSeat = async () => {
        try {
            const response = await createSeat(
                formData.assign,
                formData.name,
                formData.typeSeat,
                roomId,
                formData.description
            );
            if (response?.code === 1000) {
                console.log("response create seat", response.data);

                refreshUsers();
                onClose();
                onSeatCreated();
                setFormData({
                    name: "",
                    description: "",
                    typeSeat: "",
                    assign: ""
                });
            }
        } catch (error) {
            console.error("Error creating seat:", error);
        }
    };

    const userOptions = userList.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName} (${user.email})`
    }));

    return (
        <Modal
            isOpen={isOpen}
            name="CREATE SEAT"
            nameBtn="CREATE"
            onClick={handleCreateSeat}
            onClose={onClose}>
            <Input
                handleOnChange={handleInputChange}
                require
                label="Name Seat"
                name="name"
                placeholder="name seat"
            />
            <Input
                handleOnChange={handleInputChange}
                label="Description"
                name="description"
                placeholder="description"
            />
            <Input
                handleSelectChange={handleInputChange}
                require
                label="Type Seat"
                variant="select"
                name="typeSeat"
                optionSelect={[
                    {value: "TEMPORARY", label: "Temporary"},
                    {value: "PERMANENT", label: "Permanent"}
                ]}
                placeholder="type seat"
            />
            {isChecked && (
                <Input
                    handleSelectChange={handleInputChange}
                    label="Assign seat"
                    variant="select"
                    name="assign"
                    optionSelect={userOptions}
                    placeholder="Assign"
                />
            )}
            <Checkbox
                id="checkassign"
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
                description="Assign User?"
            />
        </Modal>
    );
};

export default CreateSeatModal;
