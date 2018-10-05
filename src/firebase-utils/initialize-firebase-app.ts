import { InitializeAppArgs } from "./types";

export const initializeFirebaseApp = ({
  firebase,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  apiKey,
  ...restMaybe
}: InitializeAppArgs) => {
  try {
    firebase.initializeApp({
      apiKey,
      authDomain,
      databaseURL,
      projectId,
      storageBucket,
      messagingSenderId,
      ...restMaybe
    });
  } catch (err) {
    if (err.code !== "app/duplicate-app") {
      throw err;
    }
  }
};
