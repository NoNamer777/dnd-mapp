import { mockLoggingServiceProvider, mockRaceModuleProviders } from '@dnd-mapp/back-end/testing';
import { RaceBuilder } from '@dnd-mapp/data';
import { defaultRace, mockRaceDB } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createId } from '@paralleldrive/cuid2';
import { EntityService } from '../entity.service';
import { raceServiceProvider } from './providers';
import { RaceService } from './race.service';

describe('RaceService', () => {
    async function setupTest() {
        const module = await Test.createTestingModule({
            providers: [mockLoggingServiceProvider, ...mockRaceModuleProviders, raceServiceProvider, EntityService],
        }).compile();

        await module.init();

        return {
            service: module.get(RaceService),
        };
    }

    it('should get all Races', async () => {
        const { service } = await setupTest();

        const races = await service.findAll();

        expect(races).toHaveLength(1);
        expect(races).toEqual(expect.arrayContaining([expect.objectContaining(defaultRace)]));
    });

    describe('get by id', () => {
        it('should get Race by ID', async () => {
            const { service } = await setupTest();

            expect(await service.findById(defaultRace.id)).toEqual(defaultRace);
        });

        it('should throw 404', async () => {
            const { service } = await setupTest();
            const id = createId();

            await expect(service.findById(id)).rejects.toThrow(
                new NotFoundException(`Race with ID: '${id}' is not found`)
            );
        });

        it('should return null', async () => {
            const { service } = await setupTest();

            expect(await service.findById(createId(), false)).toBeNull();
        });
    });

    describe('get by name', () => {
        it('should get Race by name', async () => {
            const { service } = await setupTest();

            expect(await service.findByName(defaultRace.name)).toEqual(defaultRace);
        });

        it('should return null', async () => {
            const { service } = await setupTest();

            expect(await service.findByName('Elf', false)).toBeNull();
        });

        it('should throw 404', async () => {
            const { service } = await setupTest();

            await expect(service.findByName('Elf')).rejects.toThrow(
                new NotFoundException(`Race with name: 'Elf' is not found`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTest();
            defaultRace.name = 'Elf';

            await service.update(defaultRace);
            expect(mockRaceDB.findOneById(defaultRace.id)).toEqual(defaultRace);
        });

        it('should throw 404 when using ID of non existing Race', async () => {
            const { service } = await setupTest();
            const updatedRace = new RaceBuilder().withId().build();

            await expect(service.update(updatedRace)).rejects.toThrow(
                new NotFoundException(`Cannot update Race with ID: '${updatedRace.id}' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockRaceDB.create({ name: 'Elf' });

            const { service } = await setupTest();
            const updatedRace = new RaceBuilder().withName('Elf').withId(defaultRace.id).build();

            await expect(service.update(updatedRace)).rejects.toThrow(
                new NotFoundException(`Cannot update Race because the name 'Elf' is already used`)
            );
            expect(mockRaceDB.findOneById(defaultRace.id)).not.toEqual(updatedRace);
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTest();
            const newRaceData = new RaceBuilder().withName('Elf').build();

            await service.create(newRaceData);
            expect(mockRaceDB.findOneByName('Elf')).toEqual(
                expect.objectContaining({ ...newRaceData, id: expect.any(String) })
            );
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTest();
            const newRaceData = new RaceBuilder().withName('Dwarf').build();

            await expect(service.create(newRaceData)).rejects.toThrow(
                new NotFoundException(`Cannot create Race because the name '${newRaceData.name}' is already used`)
            );
        });
    });

    describe('delete', () => {
        it('should delete', async () => {
            const { service } = await setupTest();

            await service.remove(defaultRace.id);
            expect(mockRaceDB.findOneById(defaultRace.id)).toBeNull();
        });

        it('should throw 404 for deleting non existent Race', async () => {
            const { service } = await setupTest();
            const id = createId();

            await expect(service.remove(id)).rejects.toThrow(
                new NotFoundException(`Could not remove Race with ID: '${id}' because it does not exist`)
            );
        });
    });
});
