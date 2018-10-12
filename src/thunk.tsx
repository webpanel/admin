export type Thunk<T> = T | ((...args: any[]) => T);

export function getThunkValue<T>(thunk: Thunk<T>): T {
  if (typeof thunk === 'function') {
    return thunk();
  }
  return thunk;
}
