import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBiodataComponent } from './member-biodata.component';

describe('MemberBiodataComponent', () => {
  let component: MemberBiodataComponent;
  let fixture: ComponentFixture<MemberBiodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberBiodataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberBiodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
