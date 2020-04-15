import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecedutiguaritiComponent } from './decedutiGuariti.component';

describe('DecedutiguaritiComponent', () => {
  let component: DecedutiguaritiComponent;
  let fixture: ComponentFixture<DecedutiguaritiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecedutiguaritiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecedutiguaritiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
