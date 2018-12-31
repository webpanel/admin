import * as inflection from 'inflection';
import { hasAccess as _hasAccess } from 'webpanel-auth';
var hasAccess = function (res, strict) {
    if (strict === void 0) { strict = false; }
    var result = _hasAccess(res, strict);
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
                return hasAccess("" + inflection.camelize(entity.name, true), true);
            default:
                return hasAccess("" + action + entity.name, true);
        }
    }
    return true;
};
export var fieldPermission = function (field, action) {
    if (_config) {
        return hasAccess(action + ":" + field.entity.name + ":" + field.name, true);
    }
    return true;
};
export var componentPermission = function (resourceName) {
    if (_config) {
        return hasAccess(_config.resourcePrefix + ":" + resourceName, true);
    }
    return true;
};
//# sourceMappingURL=permissions.js.map