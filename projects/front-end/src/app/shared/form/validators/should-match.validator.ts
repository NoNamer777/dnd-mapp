import { AbstractControl, ValidatorFn } from '@angular/forms';

function formatControlName(controlName: string) {
    const capitalLetter = controlName.match(/[A-Z]/);

    if (!capitalLetter) {
        return controlName.charAt(0).toUpperCase() + controlName.slice(1);
    }
    return controlName.charAt(0).toUpperCase() + controlName.slice(1).replace(/[A-Z]/, ' ' + capitalLetter[0]);
}

function removeErrorIfExist(control: AbstractControl, errorName: string) {
    const errors = control.errors;

    if (errors) {
        delete errors[errorName];
        control.setErrors(errors);
        control.updateValueAndValidity({ onlySelf: true });
    }
}

export function shouldMatchValidator(controlNameA: string, controlNameB: string): ValidatorFn {
    return (form: AbstractControl) => {
        const controlA = form.get(controlNameA)!;
        const controlB = form.get(controlNameB)!;
        const errorName = `shouldMatch`;

        let message = formatControlName(controlNameA);
        message += ' should match ';
        message += formatControlName(controlNameB);

        if (controlA.value !== controlB.value) {
            const validationError = { [errorName]: message };

            controlA.setErrors({ ...controlA.errors, ...validationError });
            controlB.setErrors({ ...controlB.errors, ...validationError });

            return validationError;
        }
        removeErrorIfExist(controlA, errorName);
        removeErrorIfExist(controlB, errorName);

        return null;
    };
}
