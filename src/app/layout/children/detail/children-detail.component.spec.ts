import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChildrenDetailComponent } from './children-detail.component';
import { ChildrenDetailModule } from './children-detail.module';

describe('FormComponent', () => {
  let component: ChildrenDetailComponent;
  let fixture: ComponentFixture<ChildrenDetailComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ChildrenDetailModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
