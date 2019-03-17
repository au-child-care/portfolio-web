import { ParentsGuardiansModule } from './parents-guardians.module';

describe('ParentsGuardiansModule', () => {
    let parentsGuardiansModule: ParentsGuardiansModule;

    beforeEach(() => {
        parentsGuardiansModule = new ParentsGuardiansModule();
    });

    it('should create an instance', () => {
        expect(parentsGuardiansModule).toBeTruthy();
    });
});
