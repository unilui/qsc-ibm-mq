import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualBrandComponent } from './visual-brand.component';

describe('VisualBrandComponent', () => {
  let component: VisualBrandComponent;
  let fixture: ComponentFixture<VisualBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
