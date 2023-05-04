import {createSelector} from "@ngrx/store";
import {getProfileState, ProfileState} from "@app/pages/profile/store";
import {FormState} from "@app/pages/profile/store/form/form.reducer";

export const getFormState = createSelector(
  getProfileState,
  (state: ProfileState) => state.form
)
export const getPersonalForm = createSelector(
  getFormState,
  (state: FormState) => !!state.personal && state.personal
)

export const getProfessionalForm = createSelector(
  getFormState,
  (state: FormState) => !!state.professional && state.professional
)
