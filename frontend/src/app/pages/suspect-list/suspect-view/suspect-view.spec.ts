import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectView } from './suspect-view';

describe('SuspectView', () => {
  let component: SuspectView;
  let fixture: ComponentFixture<SuspectView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuspectView],
    }).compileComponents();

    fixture = TestBed.createComponent(SuspectView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
