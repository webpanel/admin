/// <reference types="react" />
import { Entity } from "../../model/Entity";
import { ResourceCollectionConfig } from "webpanel-data/lib/ResourceCollection";
import { SelectProps } from "antd/lib/select";
export interface EntitySelectConfig extends SelectProps<any> {
    key?: string;
    resource?: Partial<ResourceCollectionConfig<any>>;
}
export interface EntitySelectProps extends EntitySelectConfig {
    entity: Entity;
}
export declare const EntitySelect: (props: EntitySelectProps) => JSX.Element;
