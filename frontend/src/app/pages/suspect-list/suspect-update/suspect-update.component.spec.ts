import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectUpdateComponent } from './suspect-update.component';

describe('SuspectUpdateComponent', () => {
  let component: SuspectUpdateComponent;
  let fixture: ComponentFixture<SuspectUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuspectUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspectUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
