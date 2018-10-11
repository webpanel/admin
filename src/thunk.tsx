import { RouteComponentProps } from 'react-router';
import { Entity } from './model/Entity';

export type Thunk<T> = T | (
  (
    entity?: Entity<any>,
    route?: RouteComponentProps
  ) => T
);

export function getThunkValue<T>(thunk: Thunk<T>): T {
  if (typeof thunk === 'function') {
    return thunk();
  }
  return thunk;
}
