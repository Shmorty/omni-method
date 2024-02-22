import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillDetailPage } from './skill-detail.page';

describe('SkillDetailPage', () => {
  let component: SkillDetailPage;
  let fixture: ComponentFixture<SkillDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SkillDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
