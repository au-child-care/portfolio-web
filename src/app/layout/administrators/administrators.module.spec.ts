import { AdministratorsModule } from './administrators.module';

describe('AdministratorsModule', () => {
    let administratorsModule: AdministratorsModule;

    beforeEach(() => {
        administratorsModule = new AdministratorsModule();
    });

    it('should create an instance', () => {
        expect(administratorsModule).toBeTruthy();
    });
});
