import { CentreModule } from './centre.module';

describe('CentreModule', () => {
    let centreModule: CentreModule;

    beforeEach(() => {
        centreModule = new CentreModule();
    });

    it('should create an instance', () => {
        expect(centreModule).toBeTruthy();
    });
});
