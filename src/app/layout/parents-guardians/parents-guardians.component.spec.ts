import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsGuardiansComponent } from './parents-guardians.component';
import { ParentsGuardiansModule } from './parents-guardians.module';

describe('ParentsGuardiansComponent', () => {
  let component: ParentsGuardiansComponent;
  let fixture: ComponentFixture<ParentsGuardiansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentsGuardiansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsGuardiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
