import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDataTable } from './app-data-table';

describe('AppDataTable', () => {
  let component: AppDataTable;
  let fixture: ComponentFixture<AppDataTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDataTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDataTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
