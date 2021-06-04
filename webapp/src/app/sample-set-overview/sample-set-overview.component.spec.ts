import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSetOverviewComponent } from './sample-set-overview.component';

describe('SampleSetOverviewComponent', () => {
  let component: SampleSetOverviewComponent;
  let fixture: ComponentFixture<SampleSetOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleSetOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleSetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
