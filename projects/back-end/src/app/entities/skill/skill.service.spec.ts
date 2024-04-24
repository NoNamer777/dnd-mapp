import { mockLoggingServiceProvider, mockSkillModuleProviders } from '@dnd-mapp/back-end/testing';
import { SkillBuilder } from '@dnd-mapp/data';
import { defaultAbility, defaultSkill, mockAbilityDB, mockSkillDB } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createId } from '@paralleldrive/cuid2';
import { EntityService } from '../entity.service';
import { skillServiceProvider } from './providers';
import { SkillService } from './skill.service';

describe('SkillService', () => {
    async function setupTest() {
        const module = await Test.createTestingModule({
            providers: [mockLoggingServiceProvider, ...mockSkillModuleProviders, skillServiceProvider, EntityService],
        }).compile();

        await module.init();

        return {
            service: module.get(SkillService),
        };
    }

    it('should get all Skills', async () => {
        const { service } = await setupTest();

        expect(await service.findAll()).toHaveLength(1);
    });

    describe('get by ability', () => {
        it('should get all Skills by Ability', async () => {
            mockSkillDB.create({ name: 'Sleight of Hand', ability: defaultAbility });

            const strengthAbility = mockAbilityDB.create({ name: 'Strength', skills: [] });
            mockSkillDB.create({ name: 'Athletics', ability: strengthAbility });

            const { service } = await setupTest();

            const skills = await service.findAllOfAbility(defaultAbility.id);
            expect(skills).toHaveLength(2);
            expect(skills).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ name: 'Sleight of Hand' }),
                    expect.objectContaining({ name: 'Acrobatics' }),
                ])
            );

            expect(skills).not.toEqual(expect.arrayContaining([expect.objectContaining({ name: 'Athletics' })]));
        });

        it('should get no skills by Ability', async () => {
            const { service } = await setupTest();

            expect(await service.findAllOfAbility(createId())).toHaveLength(0);
        });
    });

    describe('get by id', () => {
        it('should get Skill by ID', async () => {
            const { service } = await setupTest();

            expect(await service.findById(defaultSkill.id)).toEqual(defaultSkill);
        });

        it('should return null', async () => {
            const { service } = await setupTest();

            expect(await service.findById(createId(), false)).toBeNull();
        });

        it('should throw 404', async () => {
            const { service } = await setupTest();
            const id = createId();

            await expect(service.findById(id)).rejects.toThrow(
                new NotFoundException(`Skill with ID: '${id}' is not found`)
            );
        });
    });

    describe('get by name', () => {
        it('should get Skill by name', async () => {
            const { service } = await setupTest();

            expect(await service.findByName('Acrobatics')).toEqual(defaultSkill);
        });
        it('should return null', async () => {
            const { service } = await setupTest();

            expect(await service.findByName('Athletics', false)).toBeNull();
        });

        it('should throw 404', async () => {
            const { service } = await setupTest();

            await expect(service.findByName('Sleight of Hand')).rejects.toThrow(
                new NotFoundException(`Skill with name: 'Sleight of Hand' is not found`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTest();
            defaultSkill.name = 'Sleight of Hand';

            await service.update(defaultSkill);
            expect(mockSkillDB.findOneById(defaultSkill.id)).toEqual(defaultSkill);
        });

        it('should throw 404 when using ID of non existing Skill', async () => {
            const { service } = await setupTest();
            const updatedSkill = new SkillBuilder().withId().build();

            await expect(service.update(updatedSkill)).rejects.toThrow(
                new NotFoundException(`Cannot update Skill with ID: '${updatedSkill.id}' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockSkillDB.create({ name: 'Sleight of Hand', ability: defaultAbility });

            const { service } = await setupTest();
            const updatedSkill = new SkillBuilder().withName('Sleight of Hand').withId(defaultSkill.id).build();

            await expect(service.update(updatedSkill)).rejects.toThrow(
                new NotFoundException(`Cannot update Skill because the name 'Sleight of Hand' is already used`)
            );
            expect(mockSkillDB.findOneById(defaultSkill.id)).toEqual(defaultSkill);
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTest();
            const newSkillData = new SkillBuilder().withName('Sleight of Hand').fallsUnder(defaultAbility).build();

            await service.create(newSkillData);
            expect(mockSkillDB.findOneByName('Sleight of Hand')).toEqual(
                expect.objectContaining({ ...newSkillData, id: expect.any(String) })
            );
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTest();
            const newSkillData = new SkillBuilder().withName('Acrobatics').fallsUnder(defaultAbility).build();

            await expect(service.create(newSkillData)).rejects.toThrow(
                new NotFoundException(`Cannot create Skill because the name 'Acrobatics' is already used`)
            );
        });
    });

    describe('remove', () => {
        it('should remove a Skill by ID', async () => {
            const { service } = await setupTest();

            await service.remove(defaultSkill.id);
            expect(mockSkillDB.findOneById(defaultSkill.id)).toBeNull();
        });

        it('should throw an error when trying to remove a Skill by ID which does not exist', async () => {
            const { service } = await setupTest();
            const id = createId();

            await expect(service.remove(id)).rejects.toThrow(
                `Could not remove Skill with ID: '${id}' because it does not exist`
            );
        });
    });
});
