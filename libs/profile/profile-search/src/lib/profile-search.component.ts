import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSearchStore, SearchQueryParams } from 'data-access';
import { ProfileSearchPanelComponent } from './profile-search-panel/profile-search-panel.component';
import { ProfileSearchResultItemComponent } from './profile-search-result-item/profile-search-result-item.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@Component({
  selector: 'lib-profile-search',
  standalone: true,
  imports: [
    CommonModule,
    ProfileSearchPanelComponent,
    ProfileSearchResultItemComponent,
    InfiniteScrollModule
  ],
  templateUrl: './profile-search.component.html',
  styleUrl: './profile-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSearchComponent {
  private readonly profileSearchStore = inject(ProfileSearchStore);

  $profiles = this.profileSearchStore.profiles.items;
  $isLoading = this.profileSearchStore.getProfilesLoading;
  $totalPages = this.profileSearchStore.totalPages;
  $searchParams = this.profileSearchStore.searchParams;

  params: SearchQueryParams = {
    name: 'ff',
    page: 1,
    per_page: 10,
    languages: [],
  }

  // readonly loadProfilesOnLogin = effect(() => {
  //   untracked(() => this.profileSearchStore.getProfiles(this.params));
  // });

  getProfiles() {
    this.profileSearchStore.setSearchParams(this.params);
  }

  onChangeSearchParams(event: any) {
    const newSearchParams = { ...this.$searchParams(), name: event.name, languages: event.languages }
    this.profileSearchStore.getProfiles(newSearchParams);
  }

  onScroll() {
    // const newPage = this.$searchParams().page + 1;
    // if(newPage)
    console.log('onScroll() ')
    const newSearchParams = { ...this.$searchParams(), page: this.$searchParams().page + 1 }
    this.profileSearchStore.addProfiles(newSearchParams);
  }

}
