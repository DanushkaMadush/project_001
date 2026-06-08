import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectCard } from './suspect-card';

describe('SuspectCard', () => {
  let component: SuspectCard;
  let fixture: ComponentFixture<SuspectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuspectCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SuspectCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
