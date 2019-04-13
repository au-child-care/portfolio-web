import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CentreComponent } from './centre.component';
import { CentreModule } from './centre.module';

describe('FormComponent', () => {
  let component: CentreComponent;
  let fixture: ComponentFixture<CentreComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          CentreModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
