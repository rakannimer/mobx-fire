import { observe, IObservableValue, ObservableMap, IMapDidChange } from "mobx";

export function waitUntilBox<T>(
  obs: IObservableValue<T>,
  shouldResolve: ((
    { oldValue, newValue }: { oldValue?: T; newValue: T }
  ) => boolean)
) {
  return new Promise(resolve => {
    observe(
      obs,
      ({ oldValue, newValue }) => {
        if (shouldResolve({ oldValue, newValue })) {
          resolve(newValue);
        }
      },
      true
    );
  });
}

export function waitUntilMap<K, V>(
  obs: ObservableMap<K, V>,
  shouldResolve: ((mapChange: IMapDidChange<K, V>) => boolean)
) {
  return new Promise(resolve => {
    observe(obs, mapChange => {
      if (shouldResolve(mapChange)) {
        resolve(obs);
      }
    });
  });
}
