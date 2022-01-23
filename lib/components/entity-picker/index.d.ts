/// <reference types="react" />
import { ResourceCollectionConfig } from "webpanel-data/lib/ResourceCollection";
import { SelectProps } from "antd/lib/select";
import { EntityWithFields } from "../../model/EntityWithFields";
export interface EntitySelectConfig extends SelectProps<any> {
    key?: string;
    resource?: Partial<ResourceCollectionConfig<any>>;
}
export interface EntitySelectProps extends EntitySelectConfig {
    entity: EntityWithFields;
}
export declare const EntitySelect: (props: EntitySelectProps) => JSX.Element;
