import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@dnd-mapp/data';
import { UsersService } from '../user/users.service';

@Injectable()
export class UsersOverviewStore {
    private readonly usersService = inject(UsersService);

    public readonly selectedUser = signal<User>(null);

    public readonly processing = signal(false);

    public readonly lockActions = computed(() => Boolean(this.selectedUser()) && this.processing());

    public delete() {
        return this.usersService.delete(this.selectedUser().id);
    }

    public edit() {
        this.usersService.edit(this.selectedUser().id);
    }
}
