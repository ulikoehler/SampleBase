import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSetComponent } from './sample-set.component';

describe('SampleSetComponent', () => {
  let component: SampleSetComponent;
  let fixture: ComponentFixture<SampleSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
