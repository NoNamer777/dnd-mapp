import { Module } from '@nestjs/common';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';

@Module({
    controllers: [EntityController],
    providers: [EntityService],
    exports: [EntityService],
})
export class EntityModule {}
