import React, {useState} from "react";
import Drawer from "../Drawer";
interface Props {}
export default function Standard(props: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
        setIsOpen(false);
        setValueSelect("");
    };
    const [valueSelect, setValueSelect] = useState("");
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValueSelect(e.target.value);
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Click me</button>
            <Drawer
                // customClassName="max-h-[1000px]"
                name="Tiến trình đơn hàng"
                subName={
                    <div className="flex gap-4">
                        <p>TickitID: 76565</p>
                        <p className="text-green">ServiceTime</p>
                    </div>
                }
                positionContent="Top"
                isOpen={isOpen}
                onClose={handleClose}></Drawer>
        </>
    );
}
