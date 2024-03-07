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
  withComputed(({ searchParams, profiles }) => ({
    totalPages: computed(() =>
      Array.from(
        new Array(Math.ceil(profiles().total_count / (searchParams().per_page ?? 1))),
        (_, index) => index + 1,
      ),
    ),
  })),
  withMethods(
    (store, profilesService = inject(ProfilesService)) => ({
      getProfiles: rxMethod<SearchQueryParams>(
        pipe(
          tap((searchParams) => {
            patchState(store, { searchParams })
            setLoading('getProfiles');
          }),
          concatMap(() =>
            profilesService.query(store.searchParams()).pipe(
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
      ),
      addProfiles: rxMethod<SearchQueryParams>(
        pipe(
          tap((searchParams) => {
            patchState(store, { searchParams });
            setLoading('getProfiles');
          }),
          concatMap(() =>
            profilesService.query(store.searchParams()).pipe(
              tapResponse({
                next: ({ items }) => {
                  patchState(store, {
                    profiles: { ...store.profiles(), items: [...store.profiles().items, ...items] },
                    ...setLoaded('getProfiles'),
                  })

                },
                error: () => {
                  patchState(store, { ...profileSearchInitialstate, ...setLoaded('getProfiles') });
                }
              }))
          )
        )
      ),
      setSearchParams: (searchParams: SearchQueryParams) => {
        patchState(store, { searchParams });
      },
      setListPage: (page: number) => {
        console.log('searchParams1', store.searchParams())
        // const filters = {
        //   ...store.searchParams.filters(),
        //   offset: (store.listConfig().filters.limit ?? 10) * (page - 1),
        // };
        const searchParams: SearchQueryParams = {
          ...store.searchParams(),
          page: page,
        };
        patchState(store, { searchParams });
        console.log('searchParams2', searchParams)
      },
    })
  ),
  withCallState({ collection: 'getProfiles' }),
)
