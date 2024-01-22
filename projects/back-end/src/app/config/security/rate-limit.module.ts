import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }])],
    providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
    exports: [ThrottlerModule],
})
export class RateLimitModule {}
