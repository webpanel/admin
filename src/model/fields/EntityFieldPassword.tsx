import { EntityField } from '../EntityField';

export class EntityFieldPasssword<T, C> extends EntityField<T, C> {
  public get fetchField(): string | null {
    return null;
  }
}
