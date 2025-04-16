"use client";
import React, {useEffect, useState} from "react";
import LayoutContainer from "../LayoutContainer";
import {getAllUser, updateUser, deleteUser} from "@/services/auth/auth";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import {UserInfo} from "@/interfaces/managerSeat";
import Paginator from "@/components/molecules/Pagination";
import {Pencil, Trash2} from "lucide-react";

const emptyUserInfo: UserInfo = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    roleUpdate: [],
    project: "",
    team: ""
};

function ManagementUser() {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editedUser, setEditedUser] = useState(emptyUserInfo);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(7);

    const buildUpdateUserPayload = (user: UserInfo) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        project: user.project,
        team: user.team,
        roles: user.roleUpdate
    });

    const handleGetAllUser = async () => {
        const res = await getAllUser();
        if (res) {
            setUsers(res.data);
        }
    };

    useEffect(() => {
        handleGetAllUser();
    }, []);

    const handleEdit = (user: UserInfo) => {
        setEditingUserId(user.id);
        setEditedUser(user);
    };

    const handleCancel = () => {
        setEditingUserId(null);
        setEditedUser(emptyUserInfo);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const {name, value} = e.target;
        setEditedUser((prev) => ({...prev, [name]: value}));
    };

    const handleSave = async () => {
        if (editingUserId !== null) {
            const res = await updateUser(
                editingUserId,
                buildUpdateUserPayload(editedUser)
            );
            if (res) {
                const updatedUsers = users.map((user) =>
                    user.id === editingUserId ? editedUser : user
                );
                setUsers(updatedUsers);
                setEditingUserId(null);
            }
        }
    };

    const handleDelete = async (id: string) => {
        const res = await deleteUser(id);
        if (res) {
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        if (name === "role") {
            setEditedUser((prev) => ({...prev, roleUpdate: [value]}));
        } else {
            setEditedUser((prev) => ({...prev, [name]: value}));
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastUser = currentPage * pageSize;
    const indexOfFirstUser = indexOfLastUser - pageSize;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const roleOptions = [
        {value: "USER", label: "User"},
        {value: "LANDLORD", label: "Landlord"},
        {value: "SUPERUSER", label: "Superuser"}
    ];

    return (
        <LayoutContainer isFooter={false} isNav={false}>
            <h2 className="text-xl font-bold">User Management</h2>
            <div className="p-2">
                <table className="min-w-full table-auto border border-gray">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">First Name</th>
                            <th className="p-2 border">Last Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Role</th>
                            <th className="p-2 border">Project</th>
                            <th className="p-2 border">Team</th>
                            <th className="p-2 border w-32">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id} className="text-center">
                                {editingUserId === user.id ?
                                    <>
                                        <td className="border p-2">
                                            <Input
                                                name="firstName"
                                                value={editedUser.firstName}
                                                handleOnChange={handleChange}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <Input
                                                name="lastName"
                                                value={editedUser.lastName}
                                                handleOnChange={handleChange}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <Input
                                                name="email"
                                                value={editedUser.email}
                                                handleOnChange={handleChange}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <Input
                                                variant="select"
                                                optionSelect={roleOptions}
                                                name="role"
                                                value={
                                                    editedUser
                                                        .roleUpdate?.[0] ||
                                                    roleOptions[0].value
                                                }
                                                handleSelectChange={
                                                    handleSelectChange
                                                }
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <Input
                                                name="project"
                                                value={editedUser.project}
                                                handleOnChange={handleChange}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <Input
                                                name="team"
                                                value={editedUser.team}
                                                handleOnChange={handleChange}
                                            />
                                        </td>
                                        <td className="border p-2 flex gap-2 justify-center">
                                            <Button
                                                variant="primary-dark"
                                                onClick={handleSave}>
                                                Save
                                            </Button>
                                            <Button
                                                onClick={handleCancel}
                                                variant="upload">
                                                Cancel
                                            </Button>
                                        </td>
                                    </>
                                :   <>
                                        <td className="border p-2">
                                            {user.firstName}
                                        </td>
                                        <td className="border p-2">
                                            {user.lastName}
                                        </td>
                                        <td className="border p-2">
                                            {user.email}
                                        </td>
                                        <td className="border p-2">
                                            {(
                                                user.roles &&
                                                user.roles.length > 0
                                            ) ?
                                                user.roles[0].name
                                            :   "USER"}
                                        </td>
                                        <td className="border p-2">
                                            {user.project}
                                        </td>
                                        <td className="border w-32 p-2">
                                            {user.team}
                                        </td>
                                        <td className="border p-2 flex gap-2 justify-center ">
                                            <Button
                                                onClick={() => handleEdit(user)}
                                                className="bg-blue text-white">
                                                <Pencil size={16} />
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                                className="bg-red text-white ">
                                                <Trash2 size={16} />
                                            </Button>
                                        </td>
                                    </>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-center">
                <Paginator
                    length={Math.ceil(users.length / pageSize)}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    buttonDouble
                />
            </div>
        </LayoutContainer>
    );
}

export default ManagementUser;
