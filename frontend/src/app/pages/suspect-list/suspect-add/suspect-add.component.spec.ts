import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectAddComponent } from './suspect-add.component';

describe('SuspectAddComponent', () => {
  let component: SuspectAddComponent;
  let fixture: ComponentFixture<SuspectAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuspectAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
