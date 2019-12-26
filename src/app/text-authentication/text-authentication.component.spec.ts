import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAuthenticationComponent } from './text-authentication.component';

describe('TextAuthenticationComponent', () => {
  let component: TextAuthenticationComponent;
  let fixture: ComponentFixture<TextAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
