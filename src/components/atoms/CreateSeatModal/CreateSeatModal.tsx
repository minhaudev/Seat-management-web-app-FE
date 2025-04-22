"use client";
import React, {useEffect, useState} from "react";
// import Modal from "../Modal";
import Input from "@/components/atoms/Input";
import Checkbox from "@/components/atoms/Checkbox";
import {useSeat, useUser} from "@/context/SeatContext";

import {createSeat} from "@/services/manager/seat";
import Modal from "@/components/molecules/Modal";
import {validateField} from "@/utils/validateForm";

interface CreateSeatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSeatCreated?: () => void;
    roomId: string;
}

const CreateSeatModal: React.FC<CreateSeatModalProps> = ({
    isOpen,
    onClose,
    onSeatCreated,
    roomId
}) => {
    const {userList, refreshUsers} = useUser();
    const {refreshSeats} = useSeat();
    const [errorServer, setErrorServer] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({
        nameSeat: "",
        description: "",
        typeSeat: "",
        assign: ""
    });
    const [errors, setErrors] = useState<{
        nameSeat: "";
        typeSeat: "";
    }>({
        nameSeat: "",
        typeSeat: ""
    });

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setErrors({
            ...errors,
            [name]: validateField(name, value)
        });
        if (errorServer) {
            setErrorServer("");
        }
    };
    useEffect(() => {
        if (isOpen) {
            setFormData({
                nameSeat: "",
                description: "",
                typeSeat: "TEMPORARY",
                assign: ""
            });
            setIsChecked(false);
        }
    }, [isOpen]);
    const handleCreateSeat = async () => {
        const payload: any = {
            nameSeat: formData.nameSeat,
            description: formData.description,
            typeSeat: formData.typeSeat,
            roomId
        };
        let userIdToSend = "";

        if (isChecked && formData.assign.trim() !== "") {
            userIdToSend = formData.assign;
        }

        try {
            const response = await createSeat(
                userIdToSend,
                payload.nameSeat,
                payload.typeSeat,
                payload.roomId,
                payload.description
            );
            if (response?.code === 1000) {
                refreshUsers();
                refreshSeats();
                onClose();
            } else {
                setErrorServer(response.message);
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
        <div>
            <Modal
                isDisabled={errorServer !== ""}
                isOpen={isOpen}
                name="CREATE SEAT"
                nameBtn="CREATE"
                onClick={handleCreateSeat}
                onClose={onClose}>
                <Input
                    isError={!!errors.nameSeat}
                    helperText={errors.nameSeat}
                    value={formData.nameSeat}
                    handleOnChange={handleInputChange}
                    require
                    label="Name Seat"
                    name="nameSeat"
                    placeholder="name seat"
                />

                <Input
                    handleSelectChange={handleInputChange}
                    require
                    label="Type Seat"
                    value={formData.typeSeat}
                    variant="select"
                    name="typeSeat"
                    optionSelect={[
                        {value: "TEMPORARY", label: "Temporary"},
                        {value: "PERMANENT", label: "Permanent"}
                    ]}
                />
                <Input
                    value={formData.description}
                    handleOnChange={handleInputChange}
                    label="Description"
                    name="description"
                    placeholder="description"
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
                <p className="text-red">{errorServer}</p>
            </Modal>
        </div>
    );
};

export default CreateSeatModal;
