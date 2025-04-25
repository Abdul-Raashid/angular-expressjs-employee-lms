import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerInvoicesComponent } from './trainer-invoices.component';

describe('TrainerInvoicesComponent', () => {
  let component: TrainerInvoicesComponent;
  let fixture: ComponentFixture<TrainerInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerInvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
