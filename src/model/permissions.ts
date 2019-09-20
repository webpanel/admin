import { hasAccess as _hasAccess } from 'webpanel-auth';

// const hasAccess = (res: string): boolean => {
//   const result = _hasAccess(res);
//   global.console.log(`permissions: ${res} => ${result}`);
//   return result;
// };
const hasAccess = _hasAccess;

export interface IAutopermissionConfig {
  // prefix used for UI elements, defaults to "app"
  resourcePrefix?: string;
}
const isAutopermissionConfig = (c: any): c is IAutopermissionConfig => {
  return typeof c === 'object';
};

let _config: IAutopermissionConfig | undefined = undefined;
export const configurePermissions = (
  config?: IAutopermissionConfig | boolean
) => {
  if (isAutopermissionConfig(config)) {
    _config = config;
  }
  _config = config ? { resourcePrefix: 'app' } : undefined;
};

// export type EntityAction = 'list' | 'read' | 'create' | 'update' | 'delete';
// export const entityPermission = (
//   entity: Entity,
//   action: EntityAction
// ): boolean => {
//   if (_config) {
//     switch (action) {
//       case 'list':
//         return hasAccess(
//           `${inflection.camelize(inflection.pluralize(entity.name), true)}`
//         );
//       case 'read':
//         return hasAccess(`${inflection.camelize(entity.name, true)}`);
//       default:
//         return hasAccess(`${action}${entity.name}`);
//     }
//   }
//   return true;
// };

// export type FieldAction = 'read' | 'write';
// export const fieldPermission = (
//   field: EntityField<any, any>,
//   action: FieldAction
// ): boolean => {
//   if (_config) {
//     return hasAccess(`${action}:${field.entity.name}:${field.name}`);
//   }
//   return true;
// };

export const componentPermission = (resourceName: string): boolean => {
  if (_config) {
    return hasAccess(`${_config.resourcePrefix}:${resourceName}`);
  }
  return true;
};
