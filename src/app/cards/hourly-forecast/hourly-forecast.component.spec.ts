import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HourlyForecastComponent } from './hourly-forecast.component';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/reducers';

describe('HourlyForecastComponent', () => {
  let component: HourlyForecastComponent;
  let fixture: ComponentFixture<HourlyForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HourlyForecastComponent
      ],
      imports: [
        AngularMaterialModule,
        StoreModule.forRoot(reducers, { metaReducers })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
