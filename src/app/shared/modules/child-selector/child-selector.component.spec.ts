import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ChildSelectorComponent } from './child-selector.component';
import { ChildSelectorModule } from './child-selector.module';

describe('ChildSelectorComponent', () => {
  let component: ChildSelectorComponent;
  let fixture: ComponentFixture<ChildSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChildSelectorModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
