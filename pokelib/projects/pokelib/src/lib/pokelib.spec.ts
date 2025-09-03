import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pokelib } from './pokelib';

describe('Pokelib', () => {
  let component: Pokelib;
  let fixture: ComponentFixture<Pokelib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pokelib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pokelib);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
