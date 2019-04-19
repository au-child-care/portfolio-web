import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingPlansComponent } from './teachingplans.component';
import { TeachingPlansModule } from './teachingplans.module';

describe('TeachingPlansComponent', () => {
  let component: TeachingPlansComponent;
  let fixture: ComponentFixture<TeachingPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachingPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
