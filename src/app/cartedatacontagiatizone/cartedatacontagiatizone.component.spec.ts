import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacontagiatizoneComponent } from './cartedatacontagiatizone.component';

describe('DatacontagiatizoneComponent', () => {
  let component: CartedatacontagiatizoneComponent;
  let fixture: ComponentFixture<CartedatacontagiatizoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartedatacontagiatizoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartedatacontagiatizoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
