import {createSelector} from "@ngrx/store";
import {getProfileState, ProfileState} from "@app/pages/profile/store";
import {UserState} from "@app/store/user";


export const getUserState = createSelector(
  getProfileState,
  (state: ProfileState) => state.user,
)
export  const getUser = createSelector(
  getUserState,
  (state) => state.entity,
)

export const getLoading = createSelector(
  getUserState,
  (state) => state.loading,
)

export const getRole  = createSelector(
  getUserState,
  (state) => state.entity.role
)
