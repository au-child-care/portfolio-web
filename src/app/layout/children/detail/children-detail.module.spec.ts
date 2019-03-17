import { ChildrenDetailModule } from './children-detail.module';

describe('ChildrenDetailModule', () => {
    let childrenDetailModule: ChildrenDetailModule;

    beforeEach(() => {
        childrenDetailModule = new ChildrenDetailModule();
    });

    it('should create an instance', () => {
        expect(childrenDetailModule).toBeTruthy();
    });
});
