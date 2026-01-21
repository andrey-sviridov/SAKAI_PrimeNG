import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSideBar } from './app-side-bar';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CustomSideBar', () => {
  let component: AppSideBar;
  let fixture: ComponentFixture<AppSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSideBar],
        providers: [
            provideAnimationsAsync(), // Это уберет ошибку @children
            provideRouter([])         // Это предотвратит ошибки с routerLink
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSideBar);
    component = fixture.componentInstance; // Это доступ к переменным в .ts файле
    fixture.detectChanges(); // Это команда Angular: "отрисуй HTML прямо сейчас"
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Проверяем, что компонент вообще создался и не упал в ошибку
  });
});
