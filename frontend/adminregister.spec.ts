import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminregister } from './adminregister';

describe('Adminregister', () => {
  let component: Adminregister;
  let fixture: ComponentFixture<Adminregister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminregister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminregister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
