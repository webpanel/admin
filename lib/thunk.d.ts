export declare type Thunk<T> = T | (() => T);
export declare function getThunkValue<T>(thunk: Thunk<T>): T;
