import { Test, TestingModule } from '@nestjs/testing';
import { RaceService } from './race.service';
import { RaceModule } from './race.module';
import { defaultRace } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';

describe('RaceService', () => {
    async function setupTestEnvironment() {
        const module: TestingModule = await Test.createTestingModule({
            imports: [RaceModule],
        }).compile();

        return {
            service: module.get(RaceService),
        };
    }

    it('should get all Races', async () => {
        const { service } = await setupTestEnvironment();

        expect(await service.getAll()).toHaveLength(1);
        expect(await service.getAll()).toEqual(expect.arrayContaining([expect.objectContaining(defaultRace)]));
    });

    describe('get by id', () => {
        it('should get Race by ID', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.getById(1)).toEqual(defaultRace);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.getById(2)).rejects.toThrowError(
                new NotFoundException(`Race with ID: '2' is not found.`)
            );
        });
    });

    describe('get by name', () => {
        it('should get Race by name', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.getByName('Test Race')).toEqual(defaultRace);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.getByName('Race Test')).rejects.toThrowError(
                new NotFoundException(`Race with name: 'Race Test' is not found.`)
            );
        });
    });
});
