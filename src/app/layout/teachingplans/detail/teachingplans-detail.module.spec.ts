import { TeachingPlansDetailModule } from './teachingPlans-detail.module';

describe('TeachingPlansDetailModule', () => {
    let teachingPlansDetailModule: TeachingPlansDetailModule;

    beforeEach(() => {
        teachingPlansDetailModule = new TeachingPlansDetailModule();
    });

    it('should create an instance', () => {
        expect(teachingPlansDetailModule).toBeTruthy();
    });
});
