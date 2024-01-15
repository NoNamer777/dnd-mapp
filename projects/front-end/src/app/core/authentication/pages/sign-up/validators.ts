import { shouldMatchValidator } from '../../../../shared';

export const emailValidator = shouldMatchValidator('email', 'emailConfirm');
export const passwordValidator = shouldMatchValidator('password', 'passwordConfirm');
