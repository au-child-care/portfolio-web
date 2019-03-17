import { EducatorsDetailModule } from './educators-detail.module';

describe('EducatorsDetailModule', () => {
    let educatorsDetailModule: EducatorsDetailModule;

    beforeEach(() => {
        educatorsDetailModule = new EducatorsDetailModule();
    });

    it('should create an instance', () => {
        expect(educatorsDetailModule).toBeTruthy();
    });
});
