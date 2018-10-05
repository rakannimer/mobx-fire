# Mobx Fire

Map your Firebase database to MobX Observables.

This module exports 3 methods :

- toBox
- toMap
- toArray

## Usage

```typescript
import { toBox, toMap, toArray } from "mobx-fire";

const ref = firebase.database().ref("path/to/data");
const box = toBox(ref);
const map = toMap(ref);
const array = toArray(ref);
```

Check [the tests](__tests__) for more examples !
