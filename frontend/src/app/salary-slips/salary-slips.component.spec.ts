import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarySlipsComponent } from './salary-slips.component';

describe('SalarySlipsComponent', () => {
  let component: SalarySlipsComponent;
  let fixture: ComponentFixture<SalarySlipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalarySlipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalarySlipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
