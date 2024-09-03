import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFormLoginComponent } from './select-form-login.component';

describe('SelectFormLoginComponent', () => {
  let component: SelectFormLoginComponent;
  let fixture: ComponentFixture<SelectFormLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFormLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectFormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
