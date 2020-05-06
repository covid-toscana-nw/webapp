import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacontagiatizoneComponent } from './datacontagiatizone.component';

describe('DatacontagiatizoneComponent', () => {
  let component: DatacontagiatizoneComponent;
  let fixture: ComponentFixture<DatacontagiatizoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacontagiatizoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacontagiatizoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
