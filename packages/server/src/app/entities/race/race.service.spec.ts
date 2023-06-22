import { defaultRace, mockRaceDb } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { RaceRepositoryProvider } from '../../../../testing';
import { RaceService } from './race.service';

describe('RaceService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [RaceService, RaceRepositoryProvider],
        }).compile();

        return {
            service: module.get(RaceService),
        };
    }

    it('should get all Races', async () => {
        const { service } = await setupTestEnvironment();

        expect(await service.findAll()).toHaveLength(1);
        expect(await service.findAll()).toEqual(expect.arrayContaining([expect.objectContaining(defaultRace)]));
    });

    describe('get by id', () => {
        it('should get Race by ID', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findById(1)).toEqual(defaultRace);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findById(2)).rejects.toThrowError(
                new NotFoundException(`Race with ID: '2' is not found.`)
            );
        });
    });

    describe('get by name', () => {
        it('should get Race by name', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findByName('Test Race')).toEqual(defaultRace);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findByName('Race Test')).rejects.toThrowError(
                new NotFoundException(`Race with name: 'Race Test' is not found.`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTestEnvironment();
            const newRaceData = { id: 1, name: 'Race Test Test', traits: [] };

            expect(await service.update(newRaceData)).toEqual(newRaceData);
            expect(mockRaceDb.findOneBy({ id: 1 })).toEqual(expect.objectContaining(newRaceData));
        });

        it('should throw 404 when using ID of non existing Race', async () => {
            const { service } = await setupTestEnvironment();
            const newRaceData = { id: 2, name: 'Race Test Test', traits: [] };

            await expect(service.update(newRaceData)).rejects.toThrowError(
                new NotFoundException(`Cannot update Race with ID: '2' because it does not exist.`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockRaceDb.insert({ name: 'Race Test Test', traits: [] });

            const { service } = await setupTestEnvironment();
            const newRaceData = { id: 1, name: 'Race Test Test', traits: [] };

            await expect(service.update(newRaceData)).rejects.toThrowError(
                new NotFoundException(
                    `Cannot update Race with ID: '1' because the name: 'Race Test Test' is already in use by another Race (ID: '2').`
                )
            );
            expect(mockRaceDb.findOneBy({ id: 1 })).toEqual(expect.not.objectContaining(newRaceData));
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTestEnvironment();
            const newRaceData = { name: 'New Race Test', traits: [] };

            expect((await service.create(newRaceData)).id).toBeDefined();
            expect(mockRaceDb.findOneBy({ name: 'New Race Test' })).toEqual(expect.objectContaining(newRaceData));
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTestEnvironment();
            const newRaceData = { name: 'Test Race', traits: [] };

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
            expect(mockRaceDb.findOneBy({ id: 1 })).toBeNull();
        });

        it('should throw 404 for deleting non existent Race', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.deleteById(2)).rejects.toThrowError(
                new NotFoundException(`Could not remove Race with ID: '2' because it does not exist.`)
            );
        });
    });
});
