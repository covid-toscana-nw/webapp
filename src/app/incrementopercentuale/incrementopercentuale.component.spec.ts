import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementopercentualeComponent } from './incrementopercentuale.component';

describe('IncrementopercentualeComponent', () => {
  let component: IncrementopercentualeComponent;
  let fixture: ComponentFixture<IncrementopercentualeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncrementopercentualeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementopercentualeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
