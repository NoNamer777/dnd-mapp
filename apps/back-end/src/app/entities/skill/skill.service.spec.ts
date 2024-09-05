import { CreateSkillData, SkillBuilder, Skills } from '@dnd-mapp/data';
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
            mockSkillDB.insert({ name: Skills.SLEIGHT_OF_HAND, ability: defaultAbility });

            const { service } = await setupTestEnvironment();

            expect(await service.findAllOfAbility(1)).toHaveLength(2);
        });

        it('should get no skills by Ability', async () => {
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

            await expect(service.findByName(Skills.SLEIGHT_OF_HAND)).rejects.toThrow(
                new NotFoundException(`Skill with name: 'Sleight of Hand' is not found`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTestEnvironment();
            defaultSkill.name = Skills.SLEIGHT_OF_HAND;

            await service.update(defaultSkill);

            expect(mockSkillDB.findOneById(defaultSkill.id)).toEqual(defaultSkill);
        });

        it('should throw 404 when using ID of non existing Skill', async () => {
            const { service } = await setupTestEnvironment();
            const newSkillData = new SkillBuilder().withId(2).build();

            await expect(service.update(newSkillData)).rejects.toThrow(
                new NotFoundException(`Cannot update Skill with ID: '2' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockSkillDB.insert({ name: Skills.SLEIGHT_OF_HAND, ability: defaultAbility } as CreateSkillData);

            const { service } = await setupTestEnvironment();
            const updatedSkill = new SkillBuilder()
                .withId(defaultSkill.id)
                .withName(Skills.SLEIGHT_OF_HAND)
                .fallsUnder(defaultAbility)
                .build();

            await expect(service.update(updatedSkill)).rejects.toThrow(
                new NotFoundException(`Cannot update Skill because the name 'Sleight of Hand' is already used`)
            );
            expect(mockSkillDB.findOneById(defaultSkill.id)).toEqual(defaultSkill);
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTestEnvironment();
            const newSkillData = new SkillBuilder().withName(Skills.SLEIGHT_OF_HAND).fallsUnder(defaultAbility).build();

            expect((await service.create(newSkillData)).id).toBeDefined();
            expect(mockSkillDB.findOneByName(Skills.SLEIGHT_OF_HAND)).toBeDefined();
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

            await service.remove(defaultSkill.id);
            expect(mockSkillDB.findOneById(defaultSkill.id)).toBeNull();
        });

        it('should throw an error when trying to remove a Skill by ID which does not exist', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.remove(2)).rejects.toThrow(
                `Could not remove Skill with ID: '2' because it does not exist`
            );
        });
    });
});
