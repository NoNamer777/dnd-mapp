export type ErrorMap = Record<string, (...args: unknown[]) => string>;

export const minUsernameLength = 2;

export const usernameErrorMap: ErrorMap = {
    required: () => 'A username must be provided.',
    minlength: () => `A username must have at least ${minUsernameLength} characters.`,
} as const;

export const minPasswordLength = 12;

export const passwordErrorMap: ErrorMap = {
    required: () => 'A password must be provided.',
    minlength: () => `A password must have at least ${minPasswordLength} characters.`,
} as const;

export const emailErrorMap: ErrorMap = {
    required: () => 'An email address must be provided.',
    email: () => `The provided email address is not valid.`,
} as const;

export const minUserRoles = 1;

export const roleErrorMap: ErrorMap = {
    minlength: () => `A User should have at least ${minUserRoles} Role.`,
} as const;
