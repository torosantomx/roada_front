import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmeniSidebarItemComponent } from './submeni-sidebar-item.component';

describe('SubmeniSidebarItemComponent', () => {
  let component: SubmeniSidebarItemComponent;
  let fixture: ComponentFixture<SubmeniSidebarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmeniSidebarItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmeniSidebarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
