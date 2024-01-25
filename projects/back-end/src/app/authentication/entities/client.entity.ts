import { ClientModel } from '@dnd-mapp/data';
import { EntitySchema } from 'typeorm';

export const ClientEntity = new EntitySchema<ClientModel>({
    name: 'Client',
    target: ClientModel,
    tableName: 'Client',
    columns: {
        id: {
            name: 'id',
            type: String,
            width: 32,
            primary: true,
            primaryKeyConstraintName: 'pk_client',
        },
        codeChallenge: {
            name: 'code_challenge',
            type: String,
            width: 255,
            nullable: true,
            unique: true,
        },
        authorizationCode: {
            name: 'authorization_code',
            type: String,
            width: 255,
            nullable: true,
            unique: true,
        },
        codeGeneratedAt: {
            name: 'authorization_code_generated_at',
            type: Date,
            nullable: true,
        },
    },
});
