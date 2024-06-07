import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingEmployeesComponent } from './accounting-employees.component';

describe('AccountingEmployeesComponent', () => {
  let component: AccountingEmployeesComponent;
  let fixture: ComponentFixture<AccountingEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
