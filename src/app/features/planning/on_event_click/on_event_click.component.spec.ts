/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { On_event_clickComponent } from './on_event_click.component';

describe('On_event_clickComponent', () => {
  let component: On_event_clickComponent;
  let fixture: ComponentFixture<On_event_clickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ On_event_clickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(On_event_clickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
