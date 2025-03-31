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
