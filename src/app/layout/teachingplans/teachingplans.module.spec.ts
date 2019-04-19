import { TeachingPlansModule } from './teachingplans.module';

describe('TeachingPlansModule', () => {
    let teachingPlansModule: TeachingPlansModule;

    beforeEach(() => {
        teachingPlansModule = new TeachingPlansModule();
    });

    it('should create an instance', () => {
        expect(teachingPlansModule).toBeTruthy();
    });
});
