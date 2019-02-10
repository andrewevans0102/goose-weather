import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeeklyForecastComponent } from './weekly-forecast.component';

describe('WeeklyForecastComponent', () => {
  let component: WeeklyForecastComponent;
  let fixture: ComponentFixture<WeeklyForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
