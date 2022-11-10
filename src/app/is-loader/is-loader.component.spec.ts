import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsLoaderComponent } from './is-loader.component';

describe('IsLoaderComponent', () => {
  let component: IsLoaderComponent;
  let fixture: ComponentFixture<IsLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
