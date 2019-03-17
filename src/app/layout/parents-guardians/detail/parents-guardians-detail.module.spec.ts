import { ParentsGuardiansDetailModule } from './parents-guardians-detail.module';

describe('ParentsGuardiansDetailModule', () => {
    let parentsGuardiansDetailModule: ParentsGuardiansDetailModule;

    beforeEach(() => {
        parentsGuardiansDetailModule = new ParentsGuardiansDetailModule();
    });

    it('should create an instance', () => {
        expect(parentsGuardiansDetailModule).toBeTruthy();
    });
});
