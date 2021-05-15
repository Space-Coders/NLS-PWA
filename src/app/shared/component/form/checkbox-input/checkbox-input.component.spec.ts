/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CheckboxInputComponent } from './checkbox-input.component';

describe('CheckboxInputComponent', () => {
  let component: CheckboxInputComponent;
  let fixture: ComponentFixture<CheckboxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
