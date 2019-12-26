import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordAuthenticationComponent } from './password-authentication.component';

describe('PasswordAuthenticationComponent', () => {
  let component: PasswordAuthenticationComponent;
  let fixture: ComponentFixture<PasswordAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
