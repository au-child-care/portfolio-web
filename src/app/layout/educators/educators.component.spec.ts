import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorsComponent } from './educators.component';
import { EducatorsModule } from './educators.module';

describe('EducatorsComponent', () => {
  let component: EducatorsComponent;
  let fixture: ComponentFixture<EducatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
