import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfigProvider: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: [],
    autoLoadEntities: true,
    logging: 'all',
    synchronize: true,
};
