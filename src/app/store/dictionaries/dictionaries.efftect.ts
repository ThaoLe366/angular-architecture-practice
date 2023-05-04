

import * as fromActions from "./dictionaries.actions";
// @ts-ignore
import * as jsonCountries from "@src/assets/countries.json";
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/compat/firestore";
import {ControlItem, Item} from "@app/models/frontend";
import {Dictionaries, Dictionary} from "@app/store/dictionaries/dictionaries.models";
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, Observable, of, switchMap, take, zip} from "rxjs";

type Action = fromActions.All;
type CountryType = {
  name: string;
  code: string
}
const documentToItem = (x: DocumentChangeAction<any>) : Item => {
  const data = x.payload.doc.data();
  return {
    id: x.payload.doc.id,
    ...data,
  }
}

const itemToControlItem = (x: Item): ControlItem => ({
  value: x.id,
  label: x.name,
  icon: x.icon,
})
const addDictionary = (items: Item[]): Dictionary => ({
  items,
  controlItems: [...items].map(x => itemToControlItem(x))
})

@Injectable()
export class DictionariesEffects {
  constructor(private action$: Actions,private afs: AngularFirestore) {
  }

  read$ = createEffect(() => this.action$.pipe(
    ofType(fromActions.Types.READ),
    switchMap(() => {
      // @ts-ignore
      return zip(
        this.afs.collection('roles').snapshotChanges().pipe(
          take(1),
          map(items => items.map(x => documentToItem(x)))
        ),
        this.afs.collection('specializations').snapshotChanges().pipe(
          take(1),
          map(items => items.map(x => documentToItem(x)))
        ),
        this.afs.collection('qualifications').snapshotChanges().pipe(
          take(1),
          map(items => items.map(x => documentToItem(x)))
        ),
        this.afs.collection('skills').snapshotChanges().pipe(
          take(1),
          map(items => items.map(x => documentToItem(x)))
        ),
        of((jsonCountries ).default.map((country: { code: string; name: any; }) => ({
          id: country.code.toUpperCase(),
          name: country.name,
          icon: {
            src: '',
            cssClass: 'fflag fflags-' + country.code.toUpperCase()
          }
        })))
      ).pipe(map(([roles, specializations, qualifications, skills, countries ]) => {
        const dictionaries: Dictionaries = {
          roles: addDictionary(roles),
          specializations: addDictionary(specializations),
          qualifications: addDictionary(qualifications),
          skills: addDictionary(skills),
          countries: addDictionary(countries),
        };
        console.log(roles);
        console.log(addDictionary(roles));
        console.log(qualifications);
        console.log(skills);
        console.log("78 from dictionaries store ")
        return fromActions.readSuccessState({dictionaries: dictionaries});
      }),
        catchError(err => of(new fromActions.ReadError(err.message))))

    })
  ))
}
