import * as firebase from "firebase";
import { toBox } from "../src";
import {
  initializeFirebaseApp,
  getFirebaseRef
} from "../src/firebase-utils/index";
import { config } from "../test-config";
import { waitUntilBox } from "../src/test-utils";

describe("toBox", () => {
  const testPath = `mobx-fire/tests/${Date.now()}/`;
  const firstValue = {
    val_1: {
      i_am_an: "object"
    }
  };
  const firstKey = `1`;
  const TIMEOUT = 20000;

  initializeFirebaseApp({ firebase, ...config.client });
  afterAll(async () => {
    const ref = getFirebaseRef({ firebase, path: `${testPath}` });
    await ref.set(null);
  });
  test("exists", () => {
    expect(toBox).toBeTruthy();
  });
  test(
    "works with object",
    async () => {
      let ref = getFirebaseRef({ firebase, path: `${testPath}/${firstKey}` });
      const box = toBox(ref);
      await Promise.all([
        ref.update(firstValue),
        waitUntilBox(box, ({ oldValue, newValue }) => {
          return oldValue !== newValue;
        })
      ]);
      expect(box.get()).toEqual(firstValue);
    },
    TIMEOUT
  );
  test(
    "works with string",
    async () => {
      const STRING_VALUE = "string";
      let ref = getFirebaseRef({ firebase, path: `${testPath}/str` });
      const box = toBox(ref);
      if (box.get() !== null) {
        expect(box.get()).toEqual(STRING_VALUE);
      }
      await Promise.all([
        ref.set(STRING_VALUE),
        waitUntilBox(box, ({ oldValue, newValue }) => {
          // throw newValue;
          return oldValue !== newValue;
        })
      ]);
      expect(box.get()).toEqual(STRING_VALUE);
    },
    TIMEOUT
  );
  test(
    "works with custom map",
    async () => {
      let ref = getFirebaseRef({ firebase, path: `${testPath}/asd` });
      const box = toBox<{ a: any }>(ref, {
        map: value => {
          if (!value) return value;
          return value.a.toUpperCase();
        }
      });
      if (box.get() !== null) {
        expect(box.get()).toEqual({ a: "firstValue" });
        return;
      }
      await Promise.all([
        ref.update({ a: "firstValue" }),
        waitUntilBox(box, ({ oldValue, newValue }) => {
          return oldValue !== newValue;
        })
      ]);
      expect(box.get()).toEqual("FIRSTVALUE");
    },
    TIMEOUT
  );
});
