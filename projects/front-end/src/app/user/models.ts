import { Role } from '@dnd-mapp/data';

export interface UserResponse {
    id: number;
    username: string;
    roles: Role[];
}
