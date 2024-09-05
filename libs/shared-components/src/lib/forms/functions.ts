export function isInvalid(classes: string) {
    return classes.includes('ng-invalid') && classes.includes('ng-touched');
}
