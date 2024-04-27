import { statusTextForCode } from '@dnd-mapp/data';

describe('HttpResponseCodes', () => {
    describe('statusTextForCode', () => {
        it('should find status text for code', () => {
            expect(statusTextForCode(200)).toEqual('OK');
            expect(statusTextForCode(400)).toEqual('Bad Request');
            expect(statusTextForCode(500)).toEqual('Internal Server Error');
        });
    });
});
