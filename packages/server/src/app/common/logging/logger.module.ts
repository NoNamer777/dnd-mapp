import { Module } from '@nestjs/common';
import { DndMappLoggerService } from './dnd-mapp-logger.service';

@Module({
    providers: [DndMappLoggerService],
    exports: [DndMappLoggerService],
})
export class LoggerModule {}
