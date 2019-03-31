import { DashboardParentGuardianModule } from './dashboard-parent-guardian.module';

describe('DashboardParentGuardianModule', () => {
  let dashboardParentGuardianModule: DashboardParentGuardianModule;

  beforeEach(() => {
    dashboardParentGuardianModule = new DashboardParentGuardianModule();
  });

  it('should create an instance', () => {
    expect(dashboardParentGuardianModule).toBeTruthy();
  });
});
