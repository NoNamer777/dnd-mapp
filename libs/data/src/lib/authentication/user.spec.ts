import { nanoid } from 'nanoid';
import { AccountStatuses, defaultUsers, generateDefaultUsers, resetNumberOfUsers, Roles, UserBuilder } from './user';

describe('User', () => {
    beforeEach(() => {
        resetNumberOfUsers();
    });

    it('should generate a list of default Users', () => {
        generateDefaultUsers();

        expect(defaultUsers).toHaveLength(11);
    });

    describe('UserBuilder', () => {
        it('should set the ID', () => {
            const id = nanoid();
            const user = new UserBuilder().withId(id).build();

            expect(user.id).toEqual(id);
        });

        it('should set the password', () => {
            const password = 'custom_secret_password1234!';
            const user = new UserBuilder().withPassword(password).build();

            expect(user.password).toEqual(password);
        });

        it('should set the email', () => {
            const email = 'custom_user_email@dndmapp.nl.eu.org';
            const user = new UserBuilder().withEmail(email).build();

            expect(user.email).toEqual(email);
        });

        it('should set the username', () => {
            const username = 'Bob';
            const user = new UserBuilder().withUsername(username).build();

            expect(user.username).toEqual(username);
        });

        it(`should set the roles`, () => {
            const roles = [Roles.ADMIN, Roles.DUNGEON_MASTER];
            const user = new UserBuilder().withRoles(roles).build();

            expect(user.roles).toEqual(roles);
        });

        it(`should set the status`, () => {
            const status = AccountStatuses.PENDING;
            const user = new UserBuilder().withStatus(status).build();

            expect(user.status).toEqual(status);
        });

        it('should set default values if none are provided', () => {
            const user = new UserBuilder().build();

            expect(user).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    username: 'Player 1',
                    email: 'player_1@dndmapp.nl.eu.org',
                    password: 'secure_password',
                    roles: [Roles.PLAYER],
                    status: AccountStatuses.ACTIVE,
                })
            );
        });
    });
});
