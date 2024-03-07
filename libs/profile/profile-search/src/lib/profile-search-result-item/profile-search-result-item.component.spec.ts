import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileSearchResultItemComponent } from './profile-search-result-item.component';

describe('ProfileSearchResultItemComponent', () => {
  let component: ProfileSearchResultItemComponent;
  let fixture: ComponentFixture<ProfileSearchResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSearchResultItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSearchResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
