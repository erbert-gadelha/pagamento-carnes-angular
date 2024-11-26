import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssertConectionComponent } from './assert-conection.component';

describe('AssertConectionComponent', () => {
  let component: AssertConectionComponent;
  let fixture: ComponentFixture<AssertConectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssertConectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssertConectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
