import { Profile } from "api-types"

export interface SearchQueryParams {
  name: string;
  page: number;
  per_page: number;
  languages?: (typeof LanguagesMap[keyof typeof LanguagesMap])[];
}

export const LanguagesMap: { [key: string]: string } = {
  javascipt: 'javascript',
  python: 'python',
  ruby: 'ruby',
  typescript: 'typescript',
};

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
    items: []
  },
  searchParams: {
    name: '',
    page: 1,
    per_page: 20,
    languages: [],
  }
}
