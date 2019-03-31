import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardParentGuardianComponent } from './dashboard-parent-guardian.component';
import { DashboardParentGuardianModule } from './dashboard-parent-guardian.module';

describe('DashboardParentGuardianComponent', () => {
  let component: DashboardParentGuardianComponent;
  let fixture: ComponentFixture<DashboardParentGuardianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardParentGuardianModule,
        RouterTestingModule,
        BrowserAnimationsModule,
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardParentGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
