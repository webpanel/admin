import { EntityDataType } from "./EntityBase";
import { EntityWithFields } from "./EntityWithFields";

export class Entity<
  T extends EntityDataType = any
> extends EntityWithFields<T> {}
