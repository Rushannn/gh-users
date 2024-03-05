import { signalStore, withMethods, withState } from '@ngrx/signals';
import { ProfileState, profileInitialState } from './models/profile.model';


export const ProfileStore = signalStore(
  { providedIn: 'root' },
  withState<ProfileState>(profileInitialState),
  withMethods(
    () => ({})
  )
)
