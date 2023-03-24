import { Test, TestingModule } from '@nestjs/testing';
import { RaceService } from './race.service';
import { RaceModule } from './race.module';
import { defaultRace, mockRaceDb } from '@dnd-mapp/data/testing';
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

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTestEnvironment();
            const newRaceData = { id: 1, name: 'Race Test Test' };

            expect(await service.update(newRaceData)).toEqual(newRaceData);
            expect(mockRaceDb.findById(1)).toEqual(expect.objectContaining(newRaceData));
        });

        it('should throw 404 when using ID of non existing Race', async () => {
            const { service } = await setupTestEnvironment();
            const newRaceData = { id: 2, name: 'Race Test Test' };

            await expect(service.update(newRaceData)).rejects.toThrowError(
                new NotFoundException(`Cannot update Race with ID: '2' because it does not exist.`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockRaceDb.create({ name: 'Race Test Test' });

            const { service } = await setupTestEnvironment();
            const newRaceData = { id: 1, name: 'Race Test Test' };

            await expect(service.update(newRaceData)).rejects.toThrowError(
                new NotFoundException(
                    `Cannot update Race with ID: '1' because the name: 'Race Test Test' is already in use by another Race (ID: '2').`
                )
            );
            expect(mockRaceDb.findById(1)).toEqual(expect.not.objectContaining(newRaceData));
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTestEnvironment();
            const newRaceData = { name: 'New Race Test' };

            expect((await service.create(newRaceData)).id).toBeDefined();
            expect(mockRaceDb.findByName('New Race Test')).toEqual(expect.objectContaining(newRaceData));
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTestEnvironment();
            const newRaceData = { name: 'Test Race' };

            await expect(service.create(newRaceData)).rejects.toThrowError(
                new NotFoundException(
                    `Cannot create Race because the name: 'Test Race' is already in use by another Race (ID: '1').`
                )
            );
        });
    });

    describe('delete', () => {
        it('should delete', async () => {
            const { service } = await setupTestEnvironment();

            await service.deleteById(1);
            expect(mockRaceDb.findById(1)).toBeNull();
        });

        it('should throw 404 for deleting non existent Race', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.deleteById(2)).rejects.toThrowError(
                new NotFoundException(`Could not remove Race with ID: '2' because it does not exist.`)
            );
        });
    });
});
