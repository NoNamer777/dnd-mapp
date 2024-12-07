import { nanoid } from 'nanoid';

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    roles: Role[];
    status: AccountStatus;
}

const Roles = {
    PLAYER: 'Player',
    DUNGEON_MASTER: 'Dungeon Master',
    ADMIN: 'Administrator',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

const AccountStatuses = {
    ACTIVE: 'Active',
    PENDING: 'Pending',
    SUSPENDED: 'Suspended',
    DEACTIVATED: 'Deactivated',
    DELETED: 'Deleted',
} as const;

type AccountStatus = (typeof AccountStatuses)[keyof typeof AccountStatuses];

export let defaultUsers: User[] = [];

export function generateDefaultUsers() {
    defaultUsers = [];

    defaultUsers = [...defaultUsers, new UserBuilder().withId('mUaZQqsMMrOkP-wlbAiUR').build()];
    defaultUsers = [
        ...defaultUsers,
        new UserBuilder().withId('6C1brq3WrmiXxemlcYoj_').withRoles(['Player', 'Dungeon Master']).build(),
    ];

    defaultUsers = [
        ...defaultUsers,
        new UserBuilder()
            .withUsername('Admin 1')
            .withId('f0k8GlWm5DkePutrnwnjr')
            .withRoles(['Player', 'Dungeon Master', 'Administrator'])
            .build(),
    ];
    defaultUsers = [
        ...defaultUsers,
        new UserBuilder().withUsername('Admin 2').withId('GNT5nXtnCJf2INzDdSHm-').withRoles(['Administrator']).build(),
    ];

    defaultUsers = [...defaultUsers, new UserBuilder().withId('FWcfy4TC4_QvtWj3nB-lE').withStatus('Pending').build()];
    defaultUsers = [...defaultUsers, new UserBuilder().withId('u2AhHlBXf60UdvEk__13C').withStatus('Pending').build()];

    defaultUsers = [...defaultUsers, new UserBuilder().withId('rNlcUjl1KLtvrMxTluNgH').withStatus('Suspended').build()];
    defaultUsers = [
        ...defaultUsers,
        new UserBuilder().withId('FQ-6ndIzpA40NccHh_Mtj').withStatus('Deactivated').build(),
    ];

    defaultUsers = [...defaultUsers, new UserBuilder().withId('h7wUHgDxrPP1k3TzW_tMg').withStatus('Deleted').build()];
    defaultUsers = [...defaultUsers, new UserBuilder().withId('GDZSE5FFunRs7SyziS9V5').withStatus('Deleted').build()];
    defaultUsers = [...defaultUsers, new UserBuilder().withId('GVDcHSuAE4fbmyqhM363s').withStatus('Deleted').build()];
}

export class UserBuilder {
    private readonly user: Partial<User> = {};

    public build() {
        if (!this.user.id) {
            this.user.id = nanoid();
        }
        if (!this.user.username) {
            this.user.username = `Player ${defaultUsers.length + 1}`;
        }
        if (!this.user.email) {
            this.user.email = `${this.user.username.toLowerCase().replaceAll(' ', '-')}@dndmapp.nl.eu.org`;
        }
        if (!this.user.password) {
            this.user.password = 'secure_password';
        }
        if (!this.user.roles) {
            this.user.roles = ['Player'];
        }
        if (!this.user.status) {
            this.user.status = 'Active';
        }
        return this.user as User;
    }

    public withId(id: string) {
        this.user.id = id;
        return this;
    }

    public withUsername(username: string) {
        this.user.username = username;
        return this;
    }

    public withPassword(password: string) {
        this.user.password = password;
        return this;
    }

    public withEmail(email: string) {
        this.user.email = email;
        return this;
    }

    public withRoles(roles: Role[]) {
        this.user.roles = [...roles];
        return this;
    }

    public withStatus(status: AccountStatus) {
        this.user.status = status;
        return this;
    }
}
