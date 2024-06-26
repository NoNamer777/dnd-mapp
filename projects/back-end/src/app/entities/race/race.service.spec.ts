import { Races } from '@dnd-mapp/data';
import { defaultRace, mockRaceDB } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mockLoggingServiceProvider, mockRaceModuleProviders } from '../../../../testing';
import { EntityService } from '../entity.service';
import { raceServiceProvider } from './providers';
import { RaceService } from './race.service';

describe('RaceService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [mockLoggingServiceProvider, ...mockRaceModuleProviders, raceServiceProvider, EntityService],
        }).compile();

        await module.init();

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

            await expect(service.findById(2)).rejects.toThrow(new NotFoundException(`Race with ID: '2' is not found`));
        });
    });

    describe('get by name', () => {
        it('should get Race by name', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findByName(Races.DWARF)).toEqual(defaultRace);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findByName(Races.ELF)).rejects.toThrow(
                new NotFoundException(`Race with name: 'Elf' is not found`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTestEnvironment();
            const newRaceData = { id: 1, name: Races.ELF };

            expect(await service.update(newRaceData)).toEqual(newRaceData);
            expect(mockRaceDB.findOneById(1)).toEqual(expect.objectContaining(newRaceData));
        });

        it('should throw 404 when using ID of non existing Race', async () => {
            const { service } = await setupTestEnvironment();
            const newRaceData = { id: 2, name: Races.ELF };

            await expect(service.update(newRaceData)).rejects.toThrow(
                new NotFoundException(`Cannot update Race with ID: '2' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockRaceDB.insert({ name: Races.ELF });

            const { service } = await setupTestEnvironment();
            const newRaceData = { id: 1, name: Races.ELF };

            await expect(service.update(newRaceData)).rejects.toThrow(
                new NotFoundException(`Cannot update Race because the name 'Elf' is already used`)
            );
            expect(mockRaceDB.findOneById(1)).toEqual(expect.not.objectContaining(newRaceData));
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTestEnvironment();
            const newRaceData = { name: Races.ELF };

            expect((await service.create(newRaceData)).id).toBeDefined();
            expect(mockRaceDB.findOneByName(Races.ELF)).toEqual(expect.objectContaining(newRaceData));
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTestEnvironment();
            const newRaceData = { name: Races.DWARF };

            await expect(service.create(newRaceData)).rejects.toThrow(
                new NotFoundException(`Cannot create Race because the name 'Dwarf' is already used`)
            );
        });
    });

    describe('delete', () => {
        it('should delete', async () => {
            const { service } = await setupTestEnvironment();

            await service.remove(1);
            expect(mockRaceDB.findOneById(1)).toBeNull();
        });

        it('should throw 404 for deleting non existent Race', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.remove(2)).rejects.toThrow(
                new NotFoundException(`Could not remove Race with ID: '2' because it does not exist`)
            );
        });
    });
});
