import { Roles, UserModel } from '@dnd-mapp/data';
import { defaultUser } from '../../../testing';

describe('UserModel', () => {
    it('should verify that a User has a role', () => {
        const { id, username, emailAddress, password } = defaultUser;
        const user = new UserModel(username, password, emailAddress, id, [{ id: 1, name: Roles.PLAYER }]);

        expect(user.hasRole(Roles.DUNGEON_MASTER)).toEqual(false);
        expect(user.hasRole(Roles.ADMIN)).toEqual(false);
        expect(user.hasRole(Roles.PLAYER)).toEqual(true);
    });
});
