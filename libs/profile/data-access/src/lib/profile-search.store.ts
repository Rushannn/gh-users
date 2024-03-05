import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { ProfilesService } from './services/profiles.service'
import { computed, inject } from "@angular/core";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ProfileSearchState, SearchQueryParams, profileSearchInitialstate } from "./models/profile-search.model";
import { setLoading, setLoaded, withCallState } from "data-acces";
import { concatMap, pipe, tap } from "rxjs";
import { tapResponse } from '@ngrx/operators';


export const ProfileSearchStore = signalStore(
  { providedIn: 'root' },
  withState<ProfileSearchState>(profileSearchInitialstate),
  // withComputed(({ searchParams, profiles }) => ({
  //   totalPages: computed(() =>
  //     Array.from(
  //       new Array(Math.ceil(profiles().articlesCount / (listConfig()?.filters?.limit ?? 1))),
  //       (_, index) => index + 1,
  //     ),
  //   ),
  // })),
  withMethods(
    (store, profilesService = inject(ProfilesService)) => ({
      getProfiles: rxMethod<SearchQueryParams>(
        pipe(
          tap(() => setLoading('getProfiles')),
          concatMap((searchParams) =>
            profilesService.query(searchParams).pipe(
              tapResponse({
                next: ({ total_count, items }) => {
                  patchState(store, {
                    profiles: { total_count: total_count, items: items },
                    ...setLoaded('getProfiles'),
                  })
                },
                error: () => {
                  patchState(store, { ...profileSearchInitialstate, ...setLoaded('getProfiles') });
                }
              }))
          )
        )
      )
    })
  ),
  withCallState({ collection: 'getProfiles' }),
)
