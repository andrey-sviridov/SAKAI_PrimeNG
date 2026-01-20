import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSideBar } from './custom-side-bar';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CustomSideBar', () => {
  let component: CustomSideBar;
  let fixture: ComponentFixture<CustomSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSideBar],
        providers: [
            provideAnimationsAsync(), // Это уберет ошибку @children
            provideRouter([])         // Это предотвратит ошибки с routerLink
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSideBar);
    component = fixture.componentInstance; // Это доступ к переменным в .ts файле
    fixture.detectChanges(); // Это команда Angular: "отрисуй HTML прямо сейчас"
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Проверяем, что компонент вообще создался и не упал в ошибку
  });
});
