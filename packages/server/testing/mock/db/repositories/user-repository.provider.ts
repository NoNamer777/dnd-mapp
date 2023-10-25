import { mockUserDB } from '@dnd-mapp/data/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../../../src/app/entities/user';

export const UserRepositoryProvider = {
    provide: getRepositoryToken(UserEntity),
    useValue: mockUserDB,
};
