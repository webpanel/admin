import { EntityField } from '../EntityField';

export class EntityFieldPasssword<T, C> extends EntityField<T, C> {
  public fetchField(): string | null {
    return null;
  }
}
