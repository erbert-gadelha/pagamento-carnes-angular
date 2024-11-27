import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssertConnectionComponent } from './assert-connection.component';

describe('AssertConnectionComponent', () => {
  let component: AssertConnectionComponent;
  let fixture: ComponentFixture<AssertConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssertConnectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssertConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
