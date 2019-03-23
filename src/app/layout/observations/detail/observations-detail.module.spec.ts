import { ObservationsDetailModule } from './observations-detail.module';

describe('ObservationsDetailModule', () => {
    let observationsDetailModule: ObservationsDetailModule;

    beforeEach(() => {
        observationsDetailModule = new ObservationsDetailModule();
    });

    it('should create an instance', () => {
        expect(observationsDetailModule).toBeTruthy();
    });
});
