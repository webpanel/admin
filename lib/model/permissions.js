import * as inflection from 'inflection';
import { hasAccess as _hasAccess } from 'webpanel-auth';
var hasAccess = function (res) {
    var result = _hasAccess(res);
    global.console.log("permissions: " + res + " => " + result);
    return result;
};
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
export var entityPermission = function (entity, action) {
    if (_config) {
        switch (action) {
            case 'list':
                return hasAccess("" + inflection.camelize(inflection.pluralize(entity.name), true));
            case 'read':
                return hasAccess("" + inflection.camelize(entity.name, true));
            default:
                return hasAccess("" + action + entity.name);
        }
    }
    return true;
};
export var fieldPermission = function (field, action) {
    if (_config) {
        return hasAccess(action + ":" + field.entity.name + ":" + field.name);
    }
    return true;
};
export var componentPermission = function (resourceName) {
    if (_config) {
        return hasAccess(_config.resourcePrefix + ":" + resourceName);
    }
    return true;
};
//# sourceMappingURL=permissions.js.map