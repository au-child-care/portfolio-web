import { DashboardEducatorModule } from './dashboard-educator.module';

describe('DashboardEducatorModule', () => {
  let dashboardEducatorModule: DashboardEducatorModule;

  beforeEach(() => {
    dashboardEducatorModule = new DashboardEducatorModule();
  });

  it('should create an instance', () => {
    expect(dashboardEducatorModule).toBeTruthy();
  });
});
