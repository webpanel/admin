export declare type Thunk<T> = T | ((...args: any[]) => T);
export declare function getThunkValue<T>(thunk: Thunk<T>): T;
