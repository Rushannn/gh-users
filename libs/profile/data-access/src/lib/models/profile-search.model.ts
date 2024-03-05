import { Profile } from "api-types"

export interface SearchQueryParams {
  value: string;
  page: number;
  per_page: number;
  sort: 'interactions' | 'followers' | 'repositories' | 'joined';
  order: 'asc' | 'desc';
}

export interface Profiles {
  total_count: number;
  // incomplete_results: boolean;
  items: Profile[]
}

export interface ProfileSearchState {
  profiles: Profiles
  searchParams: SearchQueryParams
}

export const profileSearchInitialstate: ProfileSearchState = {
  profiles: {
    total_count: 0,
    // incomplete_results: false,
    items: []
  },
  searchParams: {
    value: '',
    page: 1,
    per_page: 10,
    sort: 'interactions',
    order: 'asc'
  }
}
