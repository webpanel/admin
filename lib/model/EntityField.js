import * as inflection from 'inflection';
var EntityField = /** @class */ (function () {
    function EntityField(config) {
        this.config = config;
    }
    Object.defineProperty(EntityField.prototype, "title", {
        get: function () {
            return inflection.transform(this.config.title || this.config.name, [
                'underscore',
                'titleize'
            ]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "name", {
        get: function () {
            return this.config.name;
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.visible = function (type) {
        return !this.config.visibility || !!this.config.visibility[type];
    };
    return EntityField;
}());
export { EntityField };
//# sourceMappingURL=EntityField.js.map