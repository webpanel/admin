/// <reference types="react" />
import { Entity } from "../../model/Entity";
import { ResourceCollectionLayerProps } from "webpanel-data/lib/components/ResourceCollectionLayer";
import { SelectProps } from "antd/lib/select";
export interface EntitySelectConfig extends SelectProps<any>, Partial<ResourceCollectionLayerProps> {
    key?: string;
}
export interface EntitySelectProps extends EntitySelectConfig {
    entity: Entity;
}
export declare const EntitySelect: (props: EntitySelectProps) => JSX.Element;
