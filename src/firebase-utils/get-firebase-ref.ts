import { FirebaseQuery } from "./types";

export const getFirebaseRef = ({
  firebase = null,
  path,
  orderByChild = null,
  orderByKey = null,
  orderByValue = null,
  limitToFirst = null,
  limitToLast = null,
  startAt = null,
  endAt = null,
  equalTo = null
}: FirebaseQuery) => {
  if (firebase === null) {
    throw new Error("Need to supply firebase argument to getFirebaseRef");
  }
  if (path === null || typeof path === "undefined") {
    throw new Error("Need to supply path argument to getFirebaseRef");
  }
  let result = firebase.database().ref(path);
  if (orderByChild !== null) {
    result = result.orderByChild(orderByChild);
  }
  if (orderByKey !== null) {
    result = result.orderByKey();
  }
  if (orderByValue !== null) {
    result = result.orderByValue();
  }
  if (limitToFirst !== null) {
    result = result.limitToFirst(limitToFirst);
  }
  if (limitToLast !== null) {
    result = result.limitToLast(limitToLast);
  }
  if (startAt !== null) {
    result = result.startAt(startAt);
  }
  if (endAt !== null) {
    result = result.endAt(endAt);
  }
  if (equalTo !== null) {
    result = result.equalTo(equalTo);
  }
  return result;
};
