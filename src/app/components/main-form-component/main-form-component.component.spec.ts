import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFormComponent } from './main-form-component.component';

describe('MainFormComponentComponent', () => {
  let component: MainFormComponent;
  let fixture: ComponentFixture<MainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
