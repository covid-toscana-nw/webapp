import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacontagiatisingolezoneComponent } from './datacontagiatisingolezone.component';

describe('DatacontagiatiComponent', () => {
  let component: DatacontagiatisingolezoneComponent;
  let fixture: ComponentFixture<DatacontagiatisingolezoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacontagiatisingolezoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacontagiatisingolezoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
