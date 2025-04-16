export interface Seat {
    id: string;
    number: string;
    status: string;
    ox: number;
    oy: number;
    name?: string;
    roomId?: string;
    user?: User;
    description?: string;
    typeSeat?: string;
}
export interface SeatListResponse {
    seats: Seat[]; // Danh sách ghế
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}
export interface User {
    id: string;
    email: string;
    color?: string;
    firstName: string;
    lastName: string;
    project?: string;
    team?: string;
}
export interface DroppableItem {
    id: string;
    number?: string;
    status?: string;
    imageUrl?: string;
    user?: User;
    type?: string; // Phân loại (table, wall, seat)
    x: number;
    y: number;
}
export interface Supply {
    id: string;
    name: string;
    imageUrl: string;
}
export interface RoomObject {
    name: string;
    width: number;
    height: number;
    ox: number;
    oy: number;
    color: string;
}

export interface RoomValue {
    id: string;
    name: string;
    description: string;
    owner: string;
    nameOwner: string;
    image: string | null;
    object: RoomObject[];
    hallId: string;
    created: string;
}

export interface RoomObject {
    id?: string | any;
    name: string;
    width: number;
    height: number;
    ox: number;
    oy: number;
    color: string;
}
export interface ChangedData {
    id: string;
    name: string;
    width: number;
    height: number;
    ox: number;
    oy: number;
    color: string;
}
export interface Approve {
    roomId: string;
    roomName: string;
    changedBy: string;
    status: "Pending" | "Approve" | "Reject";
    changedData?: ChangedData[];
}
export interface NotificationItem {
    content: any;
    timestamp: string;
    type: any;
    read: boolean;
}

export interface Permission {
    name: string;
    description: string;
}

export interface Role {
    name: string;
    description: string;
    permissions: Permission[];
}

export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    roles?: Role[];
    roleUpdate?: string[];
    project?: string;
    team?: string;
    roomId?: string;
    color?: string;
    created?: string;
}

export interface UserInfoResponse {
    code: number;
    data: UserInfo;
    timestamp: string;
}
