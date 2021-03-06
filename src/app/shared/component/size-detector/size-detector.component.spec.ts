/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SizeDetectorComponent } from './size-detector.component';

describe('SizeDetectorComponent', () => {
  let component: SizeDetectorComponent;
  let fixture: ComponentFixture<SizeDetectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeDetectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
