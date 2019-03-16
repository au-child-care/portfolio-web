import { AdministratorsDetailModule } from './administrators-detail.module';

describe('AdministratorsDetailModule', () => {
    let administratorsDetailModule: AdministratorsDetailModule;

    beforeEach(() => {
        administratorsDetailModule = new AdministratorsDetailModule();
    });

    it('should create an instance', () => {
        expect(administratorsDetailModule).toBeTruthy();
    });
});
