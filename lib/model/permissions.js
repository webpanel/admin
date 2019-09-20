import { hasAccess as _hasAccess } from 'webpanel-auth';
// const hasAccess = (res: string): boolean => {
//   const result = _hasAccess(res);
//   global.console.log(`permissions: ${res} => ${result}`);
//   return result;
// };
var hasAccess = _hasAccess;
var isAutopermissionConfig = function (c) {
    return typeof c === 'object';
};
var _config = undefined;
export var configurePermissions = function (config) {
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
export var componentPermission = function (resourceName) {
    if (_config) {
        return hasAccess(_config.resourcePrefix + ":" + resourceName);
    }
    return true;
};
//# sourceMappingURL=permissions.js.map