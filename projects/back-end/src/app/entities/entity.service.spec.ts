import { defaultAbility } from '@dnd-mapp/data/testing';
import { Test } from '@nestjs/testing';
import { mockAbilityModuleProviders, mockLoggingServiceProvider } from '../../../testing';
import { abilityServiceProvider } from './ability';
import { EntityService } from './entity.service';

describe('EntityService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [
                abilityServiceProvider,
                ...mockAbilityModuleProviders,
                mockLoggingServiceProvider,
                EntityService,
            ],
        }).compile();

        await module.init();

        return {
            service: module.get(EntityService),
        };
    }

    it('should get all registered managed entities', async () => {
        const { service } = await setupTestEnvironment();

        const registeredManagedEntityTypes = await service.getAllTypes();

        expect(registeredManagedEntityTypes).toHaveLength(1);
        expect(registeredManagedEntityTypes).toContain('Ability');
    });

    it('should get all entities of a particular type', async () => {
        const { service } = await setupTestEnvironment();

        const entitiesOfType = await service.getAllOfType('Ability');

        expect(entitiesOfType).toHaveLength(1);
        expect(entitiesOfType).toContain(defaultAbility);
    });

    it('should get an entity by ID of a particular type', async () => {
        const { service } = await setupTestEnvironment();

        const entityOfType = await service.getOneOfTypeById('Ability', defaultAbility.id);

        expect(entityOfType).toEqual(defaultAbility);
    });
});
