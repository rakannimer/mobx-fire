# Mobx Fire

Map your Firebase state to MobX Observables.

[![CircleCI][circleci-badge]][circleci-href]
[![NPM][npm-version-badge]][npm-href]
[![BundlePhobia][bundlephobia-badge]][bundlephobia-href]

## Peer Dependencies

This library relies on having firebase (web, admin or react-native) and mobx installed and initialized. If you haven't installed them previously :

```sh
  yarn add mobx firebase
  # or yarn add mobx firebase-admin
  # or yarn add mobx react-native-firebase
  # Or npm i mobx firebase
```

## Install

```sh
  yarn add mobx-fire
  # Or npm i mobx-fire
```

## Realtime Database

Map your Firebase database to [mobx](https://github.com/developit/unistore#usage) observables.

This module exports 3 methods :

- toBox
- toMap
- toArray

```typescript
import { toBox, toMap, toArray } from "mobx-fire";

const ref = firebase.database().ref("path/to/data");
const box = toBox(ref, { initial: "" }); // returns an observable.box() with the value of the firebase node
const map = toMap(ref); // returns an observable.map() with the value of the firebase node
const array = toArray(ref, initial: [{value:"A", key:"a"}]); // returns an ordered observable.array() with the value of the firebase node
```

### API

#### Input

All methods take in 2 arguments, the first is required and the second optional :

- ref : Any firebase ref, with or without sorting and/or limiting.
- options : depends on the method

##### toBox

```typescript
type ToBoxOptions<V> = {
  map?: (m: V) => any;
  filter?: (m: V) => boolean;
  initial?: V | null;
};
```

##### toMap

```typescript
type ToMapOptions<K, V> = {
  mapKey?: (m: K) => any;
  mapValue?: (m: V) => any;
  filter?: (prevValue: V, currentValue: V) => boolean;
  initial?: ObservableMap<K, V>;
};
```

##### toArray

```typescript
type ToArrayOptions<K, V> = {
  map?: (k: K, v: V) => any;
  filter?: (k: K, v: V) => boolean;
  initial?: Array<V>;
};
```

#### Output

A mobx observable (box, map, or array) that always has the latest value of the ref inside it.

##### toBox

```typescript
const box = toBox(ref, { initial: "something" });
// IObservableValue<string>
const box2 = toBox(ref, { initial: 4 });
// IObservableValue<number>
```

##### toMap

```typescript
const map = toMap(ref);
// IObservableMap<string, any>
```

##### toArray

```typescript
const map = toMap(ref);
// IObservableMap<string, any>
```

Check [the tests](__tests__) for more examples !

[circleci-href]: https://circleci.com/gh/rakannimer/mobx-fire
[circleci-badge]: https://img.shields.io/circleci/project/github/rakannimer/mobx-fire.svg
[npm-href]: https://www.npmjs.com/package/mobx-fire
[npm-version-badge]: https://img.shields.io/npm/v/mobx-fire.svg
[npm-license-badge]: https://img.shields.io/github/license/rakannimer/mobx-fire.svg
[bundlephobia-badge]: https://img.shields.io/bundlephobia/minzip/mobx-fire.svg
[bundlephobia-href]: https://bundlephobia.com/result?p=mobx-fire
