import { EducatorsModule } from './educators.module';

describe('EducatorsModule', () => {
    let educatorsModule: EducatorsModule;

    beforeEach(() => {
        educatorsModule = new EducatorsModule();
    });

    it('should create an instance', () => {
        expect(educatorsModule).toBeTruthy();
    });
});
