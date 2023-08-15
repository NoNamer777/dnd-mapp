import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SkillService } from './skill.service';
import { skillRepositoryProvider } from '../../../../testing';
import { defaultAbility, defaultSkill, mockSkillDB } from '@dnd-mapp/data/testing';
import { CreateSkillData, Skill } from '@dnd-mapp/data';

describe('SkillService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [SkillService, skillRepositoryProvider],
        }).compile();

        return {
            service: module.get(SkillService),
        };
    }

    describe('get by name', () => {
        it('should get Skill by name', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findByName('Test Skill')).toEqual(defaultSkill);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findByName('Skill Test')).rejects.toThrowError(
                new NotFoundException(`Skill with name: 'Skill Test' is not found.`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTestEnvironment();
            const newSkillData: Skill = { id: 1, name: 'Skill Test Test', ability: defaultAbility };

            expect(await service.update(newSkillData)).toEqual(newSkillData);
            expect(mockSkillDB.findOneBy({ id: 1 })).toEqual(expect.objectContaining(newSkillData));
        });

        it('should throw 404 when using ID of non existing Skill', async () => {
            const { service } = await setupTestEnvironment();
            const newSkillData: Skill = { id: 2, name: 'Skill Test Test', ability: defaultAbility };

            await expect(service.update(newSkillData)).rejects.toThrowError(
                new NotFoundException(`Cannot update Skill with ID: '2' because it does not exist.`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockSkillDB.insert({ name: 'Skill Test Test', ability: defaultAbility } as CreateSkillData);

            const { service } = await setupTestEnvironment();
            const newSkillData: Skill = { id: 1, name: 'Skill Test Test', ability: defaultAbility };

            await expect(service.update(newSkillData)).rejects.toThrowError(
                new NotFoundException(
                    `Cannot update Skill with ID: '1' because the name: 'Skill Test Test' is already in use by another Skill (ID: '2').`
                )
            );
            expect(mockSkillDB.findOneBy({ id: 1 })).toEqual(expect.not.objectContaining(newSkillData));
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTestEnvironment();
            const newSkillData: CreateSkillData = { name: 'New Skill Test', ability: defaultAbility };

            expect((await service.create(newSkillData)).id).toBeDefined();
            expect(mockSkillDB.findOneBy({ name: 'New Skill Test' })).toEqual(expect.objectContaining(newSkillData));
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTestEnvironment();
            const newSkillData: CreateSkillData = { name: 'Test Skill', ability: defaultAbility };

            await expect(service.create(newSkillData)).rejects.toThrowError(
                new NotFoundException(
                    `Cannot create Skill because the name: 'Test Skill' is already in use by another Skill (ID: '1').`
                )
            );
        });
    });
});
