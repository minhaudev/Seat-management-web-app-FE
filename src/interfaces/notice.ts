export interface Notice {
    id: string;
    content: string;
    timestamp: string;
    idRoom: string;
    type?: string;
    read?: boolean;
}
