import { ChildSelectorModule } from './child-selector.module';

describe('ChildSelectorModule', () => {
  let childSelectorModule: ChildSelectorModule;

  beforeEach(() => {
    childSelectorModule = new ChildSelectorModule();
  });

  it('should create an instance', () => {
    expect(childSelectorModule).toBeTruthy();
  });
});
