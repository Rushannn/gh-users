import { signalStore, withMethods, withState } from '@ngrx/signals';


export const ProfileStore = signalStore(
  { providedIn: 'root' },
  withState<ProfileState>(profileInitialState),
  withMethods(
    ()=>({})
  )
)
