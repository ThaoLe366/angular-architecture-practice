import {Dictionaries} from "@app/store/dictionaries/dictionaries.models";
import * as fromAction from "./dictionaries.actions";
import {Action, createReducer, on} from "@ngrx/store";

export interface DictionariesState {
  entities: Dictionaries;
  loading: boolean;
  error: string;
}

const initialState: DictionariesState = {
  entities: {
    countries: {
      items: [],
      controlItems: []
    },
    qualifications:  {
      items: [],
      controlItems: []
    },
    roles:  {
      items: [],
      controlItems: []
    },
    skills:  {
      items: [],
      controlItems: []
    },
    specializations:  {
      items: [],
      controlItems: []
    },
  },
  loading: false,
  error: '',
}

// @ts-ignore
export const dictionariesReducer = createReducer(initialState,
  on(fromAction.readState, state => ({...state, loading : true, error : ''})),
  on(fromAction.readSuccessState, (state, {dictionaries}) => ({...state,entities: dictionaries, loading: false})),
  on(fromAction.readErrorState, (state, { message }) => ({...state, entities: initialState.entities, loading: false, error: message})));
//
// {
//   switch (action.type) {
//     case fromAction.Types.READ: {
//       return { ...state, loading : true, error : ''}
//     }
//     case fromAction.Types.READ_SUCCESS: {
//       // @ts-ignore
//       return { ...state,entities: action.dictionaries, loading: false }
//     }
//     case fromAction.Types.READ_ERROR: {
//       return { ...state, entities: initialState.entities, loading: false, error: action.error}
//     }
//     default: {
//       return state;
//     }
//   }
// }
