import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTaskComponent } from './recent-task.component';

describe('RecentTaskComponent', () => {
  let component: RecentTaskComponent;
  let fixture: ComponentFixture<RecentTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
