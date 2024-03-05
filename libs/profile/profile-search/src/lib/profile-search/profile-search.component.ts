import { ChangeDetectionStrategy, Component, OnInit, effect, inject, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap, takeUntil, tap } from 'rxjs';
import { ProfileSearchStore, SearchQueryParams } from 'data-access';

@Component({
  selector: 'lib-profile-search',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './profile-search.component.html',
  styleUrl: './profile-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSearchComponent implements OnInit {
  private readonly profileSearchStore = inject(ProfileSearchStore);

  $profiles = this.profileSearchStore.profiles.items;

  params: SearchQueryParams = {
    value: 'ff',
    page: 1,
    per_page: 10,
    sort: 'interactions',
    order: 'asc'
  }

  readonly loadProfilesOnLogin = effect(() => {
    untracked(() => this.profileSearchStore.getProfiles(this.params));
  });


  public searchControl = new FormControl('');

  ngOnInit(): void {
    console.log(1)
    // this.searchControl.valueChanges.pipe(
    //   debounceTime(400),
    //   distinctUntilChanged(),
    //   tap(() => {
    //     // this.isListLoading = true;
    //     // this.searchResults = [];
    //     // this.currentPage$.next(1);
    //     // this.cdr.markForCheck();
    //   }),
    //   switchMap((text) => {
    //     if (!text || !text.length) {
    //       return of([]);
    //     }
    //     const cleanedText = text.trim();
    //     if (!cleanedText || cleanedText.length < 2) {
    //       return of([]);
    //     }
    //     // return this.queryResults(cleanedText);
    //   }),
    //   takeUntil(this.ngOnDestroy$)
    // ).subscribe(
    //   (res) => {
    //     this.searchResults = res;
    //     this.isListLoading = false;
    //     this.cdr.markForCheck();
    //   }

  }

}
