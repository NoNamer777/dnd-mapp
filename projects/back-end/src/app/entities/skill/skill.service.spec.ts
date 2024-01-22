import { CreateSkillData, SkillModel, Skills } from '@dnd-mapp/data';
import { defaultAbility, defaultSkill, mockSkillDB } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mockLoggingServiceProvider, mockSkillModuleProviders } from '../../../../testing';
import { EntityService } from '../entity.service';
import { skillServiceProvider } from './providers';
import { SkillService } from './skill.service';

describe('SkillService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [mockLoggingServiceProvider, ...mockSkillModuleProviders, skillServiceProvider, EntityService],
        }).compile();

        await module.init();

        return {
            service: module.get(SkillService),
        };
    }

    it('should get all Skills', async () => {
        const { service } = await setupTestEnvironment();

        expect(await service.findAll()).toHaveLength(1);
    });

    describe('get by ability', () => {
        it('should get all Skills by Ability', async () => {
            defaultSkill.ability = defaultAbility;
            mockSkillDB.insert({ name: Skills.ACROBATICS, ability: defaultAbility });

            const { service } = await setupTestEnvironment();

            expect(await service.findAllOfAbility(1)).toHaveLength(2);
        });

        it('should get no skills by Ability', async () => {
            mockSkillDB.insert({ name: Skills.ATHLETICS, ability: defaultAbility });

            const { service } = await setupTestEnvironment();

            expect(await service.findAllOfAbility(2)).toHaveLength(0);
        });
    });

    describe('get by id', () => {
        it('should get Skill by ID', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findById(1)).toEqual(defaultSkill);
        });

        it('should throw an Error when not finding a skill by ID', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findById(2)).rejects.toThrow(new NotFoundException(`Skill with ID: '2' is not found`));
        });
    });

    describe('get by name', () => {
        it('should get Skill by name', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findByName(Skills.ACROBATICS)).toEqual(defaultSkill);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findByName(Skills.ATHLETICS)).rejects.toThrow(
                new NotFoundException(`Skill with name: 'Athletics' is not found`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTestEnvironment();
            const newSkillData: SkillModel = { id: 1, name: Skills.ATHLETICS, ability: defaultAbility };

            expect(await service.update(newSkillData)).toEqual(newSkillData);
            expect(mockSkillDB.findOneById(1)).toEqual(expect.objectContaining(newSkillData));
        });

        it('should throw 404 when using ID of non existing Skill', async () => {
            const { service } = await setupTestEnvironment();
            const newSkillData: SkillModel = { id: 2, name: Skills.ACROBATICS, ability: defaultAbility };

            await expect(service.update(newSkillData)).rejects.toThrow(
                new NotFoundException(`Cannot update Skill with ID: '2' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockSkillDB.insert({ name: Skills.ATHLETICS, ability: defaultAbility } as CreateSkillData);

            const { service } = await setupTestEnvironment();
            const newSkillData: SkillModel = { id: 1, name: Skills.ATHLETICS, ability: defaultAbility };

            await expect(service.update(newSkillData)).rejects.toThrow(
                new NotFoundException(`Cannot update Skill because the name 'Athletics' is already used`)
            );
            expect(mockSkillDB.findOneById(1)).toEqual(expect.not.objectContaining(newSkillData));
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTestEnvironment();
            const newSkillData: CreateSkillData = { name: Skills.ATHLETICS, ability: defaultAbility };

            expect((await service.create(newSkillData)).id).toBeDefined();
            expect(mockSkillDB.findOneByName(Skills.ATHLETICS)).toEqual(expect.objectContaining(newSkillData));
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTestEnvironment();
            const newSkillData: CreateSkillData = { name: Skills.ACROBATICS, ability: defaultAbility };

            await expect(service.create(newSkillData)).rejects.toThrow(
                new NotFoundException(`Cannot create Skill because the name 'Acrobatics' is already used`)
            );
        });
    });

    describe('remove', () => {
        it('should remove a Skill by ID', async () => {
            const { service } = await setupTestEnvironment();

            await service.remove(1);
            expect(mockSkillDB.findOneById(1)).toBeNull();
        });

        it('should throw an error when trying to remove a Skill by ID which does not exist', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.remove(2)).rejects.toThrow(
                `Could not remove Skill with ID: '2' because it does not exist`
            );
        });
    });
});
