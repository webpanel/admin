import { RouteComponentProps } from 'react-router';
import { Entity } from './model/Entity';
export declare type Thunk<T> = T | ((entity?: Entity<any>, route?: RouteComponentProps) => T);
export declare function getThunkValue<T>(thunk: Thunk<T>): T;
