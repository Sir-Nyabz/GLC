import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkMembersComponent } from './link-members.component';

describe('LinkMembersComponent', () => {
  let component: LinkMembersComponent;
  let fixture: ComponentFixture<LinkMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
