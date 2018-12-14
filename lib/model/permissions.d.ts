import { Entity } from './Entity';
import { EntityField } from './EntityField';
export interface IAutopermissionConfig {
    resourcePrefix?: string;
}
export declare const configurePermissions: (config?: boolean | IAutopermissionConfig | undefined) => void;
export declare type EntityAction = 'list' | 'read' | 'create' | 'update' | 'delete';
export declare const entityPermission: (entity: Entity<any>, action: EntityAction) => boolean;
export declare const fieldPermission: (field: EntityField<any, any>) => boolean;
export declare const componentPermission: (resourceName: string) => boolean;
