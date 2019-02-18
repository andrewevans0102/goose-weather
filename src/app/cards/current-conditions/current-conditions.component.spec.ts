import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentConditionsComponent } from './current-conditions.component';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';

describe('CurrentConditionsComponent', () => {
  let component: CurrentConditionsComponent;
  let fixture: ComponentFixture<CurrentConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          CurrentConditionsComponent
        ],
      imports: [
        AngularMaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
