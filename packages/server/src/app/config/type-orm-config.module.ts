import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: [],
    autoLoadEntities: true,
    logging: 'all',
    synchronize: true,
};

@Module({
    imports: [TypeOrmModule.forRoot({ ...typeOrmConfig })],
    exports: [TypeOrmModule],
})
export class TypeOrmConfigModule {}
