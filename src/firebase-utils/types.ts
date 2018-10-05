export type GetChildrenIds = () => any;

const firebase = require("firebase");

export interface FirebaseQuery {
  firebase?: typeof firebase;
  path: string;
  orderByChild?: null | string;
  orderByKey?: null | any;
  orderByValue?: null | any;
  limitToFirst?: null | number;
  limitToLast?: null | number;
  startAt?: null | number;
  endAt?: null | number;
  equalTo?: null | any;
  keysOnly?: boolean;
  once?: boolean;
  isList?: boolean;
}

export interface InitializeAppArgs {
  authDomain?: string;
  apiKey?: string;
  databaseURL?: string;
  firebase: any;
  projectId?: string;
  messagingSenderId?: string;
  storageBucket?: string;
  createContext?: () => any;
}

export type FirebaseDatabaseNodeValue = {} | number | boolean | string | null;
