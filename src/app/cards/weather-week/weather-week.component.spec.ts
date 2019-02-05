import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWeekComponent } from './weather-week.component';

describe('WeatherWeekComponent', () => {
  let component: WeatherWeekComponent;
  let fixture: ComponentFixture<WeatherWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
