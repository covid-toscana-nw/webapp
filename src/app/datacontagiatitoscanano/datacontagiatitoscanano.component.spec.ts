import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacontagiatitoscananoComponent } from './datacontagiatitoscanano.component';

describe('DatacontagiatiComponent', () => {
  let component: DatacontagiatitoscananoComponent;
  let fixture: ComponentFixture<DatacontagiatitoscananoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacontagiatitoscananoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacontagiatitoscananoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
