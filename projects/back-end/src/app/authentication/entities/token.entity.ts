import { TokenModel } from '@dnd-mapp/data';
import { EntitySchema } from 'typeorm';

export const TokenEntity = new EntitySchema<TokenModel>({
    name: 'Token',
    target: TokenModel,
    tableName: 'Token',
    columns: {
        jti: {
            name: 'jti',
            type: String,
            width: 32,
            primary: true,
            primaryKeyConstraintName: 'pk_token',
        },
        type: {
            name: 'type',
            type: String,
            width: 16,
            nullable: false,
        },
        revoked: {
            name: 'revoked',
            type: Boolean,
            width: 1,
            nullable: false,
            default: 0,
        },
        notBefore: {
            name: 'not_before',
            type: Date,
            nullable: false,
        },
        issuedAt: {
            name: 'issued_at',
            type: Date,
            nullable: false,
        },
        expiresAt: {
            name: 'expires_at',
            type: Date,
            nullable: false,
        },
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: {
                name: 'subject',
                referencedColumnName: 'id',
                foreignKeyConstraintName: 'fk_user_token',
            },
            onDelete: 'CASCADE',
        },
        client: {
            type: 'many-to-one',
            target: 'Client',
            joinColumn: {
                name: 'client_id',
                referencedColumnName: 'id',
                foreignKeyConstraintName: 'fk_client_token',
            },
            onDelete: 'CASCADE',
        },
    },
});
