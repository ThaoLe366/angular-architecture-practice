import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterComponent } from './recruiter.component';

describe('RecuiterComponent', () => {
  let component: RecruiterComponent;
  let fixture: ComponentFixture<RecruiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
