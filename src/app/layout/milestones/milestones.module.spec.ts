import { MilestonesModule } from './milestones.module';

describe('MilestonesModule', () => {
    let milestonesModule: MilestonesModule;

    beforeEach(() => {
        milestonesModule = new MilestonesModule();
    });

    it('should create an instance', () => {
        expect(milestonesModule).toBeTruthy();
    });
});
