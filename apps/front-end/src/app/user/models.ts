import { RoleModel } from '@dnd-mapp/data';

export interface UserResponse {
    id: number;
    username: string;
    roles: RoleModel[];
}
