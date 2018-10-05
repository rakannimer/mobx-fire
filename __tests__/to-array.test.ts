import * as firebase from "firebase";
import { toJS } from "mobx";
import { toArray } from "../src";
import {
  initializeFirebaseApp,
  getFirebaseRef
} from "../src/firebase-utils/index";
import { config } from "../test-config";

describe("toArray", () => {
  const testPath = `mobx-fire/tests/${Date.now()}/`;
  const ARRAY_LENGTH = 2;
  const listAsObject = Array.from({ length: ARRAY_LENGTH }, (v, i) => {
    return {
      data: i
    };
  }).reduce((acc, cur, i) => {
    // acc[`id_${i}`] = cur;
    return {
      ...acc,
      [`id_${i}`]: cur
    };
  }, {}) as any;
  const TIMEOUT = 20000;

  initializeFirebaseApp({ firebase, ...config.client });
  afterAll(async () => {
    const ref = getFirebaseRef({ firebase, path: `${testPath}` });
    await ref.set(null);
  });
  test("exists", () => {
    expect(toArray).toBeTruthy();
  });
  test("works", async () => {
    const ref = getFirebaseRef({ firebase, path: testPath });
    const array = toArray(ref);
    await ref.set(listAsObject);
    expect(toJS(array)).toMatchInlineSnapshot(`
Array [
  Object {
    "key": "id_0",
    "value": Object {
      "data": 0,
    },
  },
  Object {
    "key": "id_1",
    "value": Object {
      "data": 1,
    },
  },
]
`);
    await ref.set(null);
    expect(toJS(array)).toMatchInlineSnapshot(`Array []`);
  });
});
