import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLayout } from './custom-layout';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CustomLayout', () => {
  let component: CustomLayout;
  let fixture: ComponentFixture<CustomLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomLayout],
        providers: [
            provideRouter([]),
            provideAnimationsAsync()
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
