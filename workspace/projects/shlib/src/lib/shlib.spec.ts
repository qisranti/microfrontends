import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shlib } from './shlib';

describe('Shlib', () => {
  let component: Shlib;
  let fixture: ComponentFixture<Shlib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shlib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shlib);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
