import React, {useState} from "react";
import Modal from "@/components/molecules/Modal";
import Input from "../Input";
import {createTypeSeat, getAllTypeSeat} from "@/services/manager/seat";
import Button from "../Button";

interface CreateSeatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSeatCreated?: () => void;
    roomId: string;
    getTypeSeats: () => void;
}

const CreateSeatModal: React.FC<CreateSeatModalProps> = ({
    isOpen,
    onClose,
    getTypeSeats
}) => {
    const [name, setName] = useState("");

    const handleCreateSeat = async () => {
        const res = await createTypeSeat(name);
        if (res.code === 1000) {
            onClose();
            getTypeSeats();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-4 space-y-4">
                <Input
                    label="Type Seat"
                    require
                    value={name}
                    placeholder="Type chair"
                    handleOnChange={(
                        e: React.ChangeEvent<HTMLInputElement> | any
                    ) => {
                        setName(e.target.value);
                    }}
                />
                <div className="flex justify-end gap-2">
                    <Button
                        className="px-4 py-2 bg-gray-200 rounded"
                        onClick={handleCreateSeat}>
                        Create
                    </Button>
                    <Button
                        variant="upload"
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateSeatModal;
