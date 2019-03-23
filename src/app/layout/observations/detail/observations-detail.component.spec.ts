import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ObservationsDetailComponent } from './observations-detail.component';
import { ObservationsDetailModule } from './observations-detail.module';

describe('FormComponent', () => {
  let component: ObservationsDetailComponent;
  let fixture: ComponentFixture<ObservationsDetailComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ObservationsDetailModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
