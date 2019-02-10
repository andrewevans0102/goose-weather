import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDesktopComponent } from './about-desktop.component';

describe('AboutDesktopComponent', () => {
  let component: AboutDesktopComponent;
  let fixture: ComponentFixture<AboutDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
