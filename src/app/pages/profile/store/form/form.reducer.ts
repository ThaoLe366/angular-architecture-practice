import {ProfileForm} from "@app/pages/profile/pages/form/form.component";
import {createReducer, on} from "@ngrx/store";
import * as fromActions from "./form.action";

export type FormState = ProfileForm;
const initialState: FormState = {
  personal: null,
  professional: null,
}

export const formProfileReducer = createReducer(initialState,
  on(fromActions.setState, (state, { form }) => ({
    ...state, ...form
  })),
  on(fromActions.updateState, (state, { changes}) => ({
    ...state, ...changes
  })),
  on(fromActions.clearState, (state) => ({ ...initialState,}))
  )
