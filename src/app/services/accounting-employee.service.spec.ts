import { TestBed } from '@angular/core/testing';

import { AccountingEmployeeService } from './accounting-employee.service';

describe('AccountingEmployeeService', () => {
  let service: AccountingEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
