import {Employee, Recruiter} from "@app/models/backend/user/roles";
import firebase from "firebase/compat/app";

export interface User {
  uid: string;
  name: string;
  photoURL: string;
  email: string;
  country: string;
  about?: string;
  roleId: string;
  role: Employee | Recruiter;
  created: firebase.firestore.FieldValue;
  updated?: firebase.firestore.FieldValue;
}
export * from './roles';
