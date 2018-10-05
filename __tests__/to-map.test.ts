import * as firebase from "firebase";
import { toJS } from "mobx";
import { toMap } from "../src";
import {
  initializeFirebaseApp,
  getFirebaseRef
} from "../src/firebase-utils/index";
import { config } from "../test-config";
import { waitUntilMap } from "../src/test-utils";

describe("toMap", () => {
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
    expect(toMap).toBeTruthy();
  });
  test("works", async () => {
    const ref = getFirebaseRef({ firebase, path: testPath });
    const map = toMap(ref);
    await ref.set(listAsObject);
    expect(toJS(map)).toMatchInlineSnapshot(`
Object {
  "id_0": Object {
    "data": 0,
  },
  "id_1": Object {
    "data": 1,
  },
}
`);
    await ref.set({});
    expect(toJS(map)).toMatchInlineSnapshot(`Object {}`);
  });
  test("works with custom mapKey", async () => {
    const ref = getFirebaseRef({ firebase, path: testPath });
    const map = toMap(ref, {
      mapKey: key => {
        return `${key}`.toUpperCase();
      }
    });
    await ref.set(listAsObject);
    expect(toJS(map)).toMatchInlineSnapshot(`
Object {
  "ID_0": Object {
    "data": 0,
  },
  "ID_1": Object {
    "data": 1,
  },
}
`);
    await ref.set({});
    expect(toJS(map)).toMatchInlineSnapshot(`Object {}`);
  });

  test("works with custom mapValue", async () => {
    const ref = getFirebaseRef({ firebase, path: testPath });
    const map = toMap<string, { data: any }>(ref, {
      mapValue: v => {
        if (!v) return v;
        return v.data;
      }
    });
    await ref.set(listAsObject);
    expect(toJS(map)).toMatchInlineSnapshot(`
Object {
  "id_0": 0,
  "id_1": 1,
}
`);
    await ref.set({});
    expect(toJS(map)).toMatchInlineSnapshot(`Object {}`);
  });
});
