import { Roles, UserBuilder } from '@dnd-mapp/data';
import { defaultRole } from '@dnd-mapp/data/testing';

describe('UserModel', () => {
    it('should verify that a User has a role', () => {
        const user = new UserBuilder().withRoles([defaultRole]).build();

        expect(user.hasRole(Roles.DUNGEON_MASTER)).toEqual(false);
        expect(user.hasRole(Roles.ADMIN)).toEqual(false);
        expect(user.hasRole(Roles.PLAYER)).toEqual(true);
    });
});
