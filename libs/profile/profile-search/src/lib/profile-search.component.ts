import { ChangeDetectionStrategy, Component, OnInit, effect, inject, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSearchStore, SearchQueryParams } from 'data-access';
import { ProfileSearchPanelComponent } from './profile-search-panel/profile-search-panel.component';
import { ProfileSearchResultItemComponent } from './profile-search-result-item/profile-search-result-item.component';

@Component({
  selector: 'lib-profile-search',
  standalone: true,
  imports: [
    CommonModule,
    ProfileSearchPanelComponent,
    ProfileSearchResultItemComponent
  ],
  templateUrl: './profile-search.component.html',
  styleUrl: './profile-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSearchComponent {
  private readonly profileSearchStore = inject(ProfileSearchStore);

  $profiles = this.profileSearchStore.profiles.items;
  $isLoading = this.profileSearchStore.getProfilesLoading;

  params: SearchQueryParams = {
    name: 'ff',
    page: 1,
    per_page: 10,
    languages: [],
    order: 'asc'
  }

  // readonly loadProfilesOnLogin = effect(() => {
  //   untracked(() => this.profileSearchStore.getProfiles(this.params));
  // });

  getProfiles() {
    this.profileSearchStore.setSearchParams(this.params);
  }

  onChangeSearchParams(event: any) {
    console.log(event)
    this.profileSearchStore.getProfiles(event);
  }

}
