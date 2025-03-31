import Modal from "@/components/molecules/Modal";

import React, {useState} from "react";
import Input from "@/components/atoms/Input";
import {useSeat} from "@/context/SeatContext";
interface CreateObjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: (data: {
        name: string;
        ox: number;
        oy: number;
        width: number;
        height: number;
        color: string;
    }) => void;
}

export const CreateObjectModal: React.FC<CreateObjectModalProps> = ({
    isOpen,
    onClose
}) => {
    const [formData, setFormData] = useState({
        name: "",
        ox: 0,
        oy: 0,
        width: 0,
        height: 0,
        color: "#000000"
    });
    const {addObject} = useSeat();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "name" || name === "color" ? value : Number(value)
        }));
    };

    const handleCreateObject = () => {
        addObject({
            name: formData.name,
            ox: formData.ox,
            oy: formData.oy,
            width: formData.width,
            height: formData.height,
            color: formData.color
        });
    };

    return (
        <Modal
            onClick={handleCreateObject}
            nameBtn="Create"
            isOpen={isOpen}
            onClose={onClose}
            name="Create Object">
            <div className="p-4 space-y-2">
                <Input
                    label="Name: "
                    require
                    name="name"
                    value={formData.name}
                    handleOnChange={handleChange}
                    placeholder="Name"
                />
                <Input
                    type="number"
                    label="OX:"
                    require
                    name="ox"
                    value={formData.ox}
                    handleOnChange={handleChange}
                    placeholder="OX"
                />
                <Input
                    label="OY:"
                    require
                    name="oy"
                    type="number"
                    value={formData.oy}
                    handleOnChange={handleChange}
                    placeholder="OY"
                />
                <Input
                    label="Width: "
                    name="width"
                    type="number"
                    value={formData.width}
                    handleOnChange={handleChange}
                    placeholder="Width"
                />
                <Input
                    label="Height: "
                    name="height"
                    type="number"
                    value={formData.height}
                    handleOnChange={handleChange}
                    placeholder="Height"
                />
                <Input
                    label="Color: "
                    name="color"
                    type="color"
                    value={formData.color}
                    handleOnChange={handleChange}
                />
            </div>
        </Modal>
    );
};
