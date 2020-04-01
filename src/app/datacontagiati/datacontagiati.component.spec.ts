import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacontagiatiComponent } from './datacontagiati.component';

describe('DatacontagiatiComponent', () => {
  let component: DatacontagiatiComponent;
  let fixture: ComponentFixture<DatacontagiatiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacontagiatiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacontagiatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
