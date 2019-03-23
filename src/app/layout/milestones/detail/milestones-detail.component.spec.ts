import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MilestonesDetailComponent } from './milestones-detail.component';
import { MilestonesDetailModule } from './milestones-detail.module';

describe('FormComponent', () => {
  let component: MilestonesDetailComponent;
  let fixture: ComponentFixture<MilestonesDetailComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MilestonesDetailModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestonesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
