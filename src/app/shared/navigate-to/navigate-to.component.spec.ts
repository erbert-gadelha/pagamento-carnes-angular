import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateToComponent } from './navigate-to.component';

describe('NavigateToComponent', () => {
  let component: NavigateToComponent;
  let fixture: ComponentFixture<NavigateToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigateToComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigateToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
