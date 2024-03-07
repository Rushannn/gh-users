import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileSearchPanelComponent } from './profile-search-panel.component';

describe('ProfileSearchPanelComponent', () => {
  let component: ProfileSearchPanelComponent;
  let fixture: ComponentFixture<ProfileSearchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSearchPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
