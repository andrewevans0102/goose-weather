import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherHourlyComponent } from './weather-hourly.component';

describe('WeatherHourlyComponent', () => {
  let component: WeatherHourlyComponent;
  let fixture: ComponentFixture<WeatherHourlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherHourlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherHourlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
