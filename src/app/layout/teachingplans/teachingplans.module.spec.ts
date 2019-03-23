import { TeachingPlansModule } from './teachingPlans.module';

describe('TeachingPlansModule', () => {
    let teachingPlansModule: TeachingPlansModule;

    beforeEach(() => {
        teachingPlansModule = new TeachingPlansModule();
    });

    it('should create an instance', () => {
        expect(teachingPlansModule).toBeTruthy();
    });
});
