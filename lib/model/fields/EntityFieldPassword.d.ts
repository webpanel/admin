import { EntityField, IEntityFieldConfig } from "../EntityField";
export declare class EntityFieldPasssword<T, C extends IEntityFieldConfig<T>> extends EntityField<T, C> {
    fetchField(): string | null;
}
