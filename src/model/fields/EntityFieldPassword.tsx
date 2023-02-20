import { EntityField, IEntityFieldConfig } from "../EntityField";

export class EntityFieldPasssword<
  T,
  C extends IEntityFieldConfig<T>
> extends EntityField<T, C> {
  public fetchField(): string | null {
    return null;
  }
}
