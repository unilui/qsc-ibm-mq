import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBaseUiComponent } from './app-base-ui.component';

describe('AppBaseUiComponent', () => {
  let component: AppBaseUiComponent;
  let fixture: ComponentFixture<AppBaseUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppBaseUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBaseUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
