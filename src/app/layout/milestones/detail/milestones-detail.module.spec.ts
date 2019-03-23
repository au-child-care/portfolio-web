import { MilestonesDetailModule } from './milestones-detail.module';

describe('MilestonesDetailModule', () => {
    let milestonesDetailModule: MilestonesDetailModule;

    beforeEach(() => {
        milestonesDetailModule = new MilestonesDetailModule();
    });

    it('should create an instance', () => {
        expect(milestonesDetailModule).toBeTruthy();
    });
});
