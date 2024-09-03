import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypeLoginComponent } from './select-type-login.component';

describe('SelectTypeLoginComponent', () => {
  let component: SelectTypeLoginComponent;
  let fixture: ComponentFixture<SelectTypeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTypeLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectTypeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
