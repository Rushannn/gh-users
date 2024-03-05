import { Profile } from '../../../../../core/api-types/src/index';

export type ProfileState = {
  data: Profile
};

export const profileInitialState: ProfileState = {
  data: {
    login: '',
    id: 0,
    node_id: '',
    avatar_url: '',
    gravatar_id: '',
    url: '',
    html_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    starred_url: '',
    subscriptions_url: '',
    organizations_url: '',
    repos_url: '',
    events_url: '',
    received_events_url: '',
    type: '',
    site_admin: false,
    score: 0
  }
}
