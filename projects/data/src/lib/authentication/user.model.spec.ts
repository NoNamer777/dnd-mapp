import { User, UserRoles } from '@dnd-mapp/data';
import { defaultUser } from '../../../testing';

describe('User', () => {
    it('should verify that a User has a role', () => {
        const { id, username, emailAddress, password } = defaultUser;
        const user = new User(username, password, emailAddress, id, [{ id: 1, name: UserRoles.PLAYER }]);

        expect(user.hasRole(UserRoles.DUNGEON_MASTER)).toEqual(false);
        expect(user.hasRole(UserRoles.ADMIN)).toEqual(false);
        expect(user.hasRole(UserRoles.PLAYER)).toEqual(true);
    });
});
