import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ParentsGuardiansDetailComponent } from './parents-guardians-detail.component';
import { ParentsGuardiansDetailModule } from './parents-guardians-detail.module';

describe('FormComponent', () => {
  let component: ParentsGuardiansDetailComponent;
  let fixture: ComponentFixture<ParentsGuardiansDetailComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ParentsGuardiansDetailModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsGuardiansDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
