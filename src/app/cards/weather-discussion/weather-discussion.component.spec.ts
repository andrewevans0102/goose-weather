import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherDiscussionComponent } from './weather-discussion.component';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';

describe('WeatherDiscussionComponent', () => {
  let component: WeatherDiscussionComponent;
  let fixture: ComponentFixture<WeatherDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherDiscussionComponent
      ],
      imports: [
        AngularMaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
