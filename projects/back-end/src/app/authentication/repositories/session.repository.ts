import { SessionModel, TokenTypes } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from '../../config';
import { Token } from '@angular/compiler';

@Injectable()
export class SessionRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async findOneById(id: string) {
        const result = await this.databaseService.session.findUnique({
            where: { id },
            include: {
                tokens: {
                    where: {
                        revoked: false,
                        sessionId: id,
                    }
                }
            }
        });

        return plainToInstance(SessionModel, {
            ...result,
            tokens: {
                access: result.tokens.find(token => token.type === TokenTypes.ACCESS),
                refresh: result.tokens.find(token => token.type === TokenTypes.REFRESH),
            }
        });
    }

    async update(session: SessionModel) {
        return plainToInstance(
            SessionModel,
            await this.databaseService.session.update({
                where: { id: session.id },
                data: {
                    ...session,
                    tokens: {}
                },
            })
        );
    }

    async create(session: SessionModel) {
        return plainToInstance(SessionModel, await this.databaseService.session.create({
            data: {
                ...session,
                tokens: {},
            },
        }));
    }

    async remove(id: string) {
        await this.databaseService.session.delete({ where: { id } });
    }
}
