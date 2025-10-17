import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeSelection } from './user-type-selection';

describe('UserTypeSelection', () => {
  let component: UserTypeSelection;
  let fixture: ComponentFixture<UserTypeSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTypeSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
