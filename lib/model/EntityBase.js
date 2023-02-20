var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as inflection from "inflection";
import { resolveOptionalThunk, resolveThunk } from "ts-thunk";
import { LayoutBuilder } from "../layout-builder";
var EntityBase = /** @class */ (function () {
    function EntityBase(config) {
        var _this = this;
        this.config = config;
        this.cardLayouts = {};
        this.setCardLayout = function (type, fn) {
            _this.cardLayouts[type] = fn;
        };
    }
    EntityBase.prototype.updateConfig = function (config) {
        var entity = this.clone();
        entity.config = __assign(__assign({}, entity.config), config);
        return entity;
    };
    EntityBase.prototype.clone = function () {
        return new this.constructor(this.config);
    };
    Object.defineProperty(EntityBase.prototype, "structureName", {
        get: function () {
            return "".concat(inflection.transform(resolveThunk(this.config.name), [
                "tableize",
                "dasherize",
                "pluralize",
            ]));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityBase.prototype, "title", {
        get: function () {
            return (resolveOptionalThunk(this.config.title) ||
                inflection.titleize(resolveThunk(this.config.name)));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityBase.prototype, "enabled", {
        get: function () {
            var val = resolveOptionalThunk(this.config.enabled);
            if (typeof val !== "undefined")
                return val;
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityBase.prototype, "creatable", {
        get: function () {
            var val = resolveOptionalThunk(this.config.creatable);
            if (typeof val !== "undefined")
                return val;
            return true;
        },
        enumerable: false,
        configurable: true
    });
    EntityBase.prototype.updateable = function (values) {
        var val = resolveOptionalThunk(this.config.updateable, values);
        if (typeof val !== "undefined")
            return val;
        return true;
    };
    EntityBase.prototype.deletable = function (values) {
        var val = resolveOptionalThunk(this.config.deletable, values);
        if (typeof val !== "undefined")
            return val;
        return true;
    };
    Object.defineProperty(EntityBase.prototype, "showDetailPage", {
        get: function () {
            return resolveOptionalThunk(this.config.showDetailPage) || false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityBase.prototype, "name", {
        get: function () {
            return resolveThunk(this.config.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityBase.prototype, "resourceName", {
        get: function () {
            return resolveOptionalThunk(this.config.resourceName) || this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityBase.prototype, "dataSource", {
        get: function () {
            return resolveThunk(this.config.dataSource);
        },
        enumerable: false,
        configurable: true
    });
    EntityBase.prototype.getListConfig = function () {
        return resolveOptionalThunk(this.config.list);
    };
    EntityBase.prototype.getEditConfig = function (resourceID) {
        return resolveOptionalThunk(this.config.edit, { entity: this, resourceID: resourceID });
    };
    EntityBase.prototype.getDetailConfig = function (resourceID) {
        return resolveOptionalThunk(this.config.detail, {
            entity: this,
            resourceID: resourceID,
        });
    };
    Object.defineProperty(EntityBase.prototype, "initialSorting", {
        // public get render(): (value: T | null) => React.ReactNode {
        //   if (this.config.render) {
        //     return this.config.render;
        //   }
        //   return (value: any) => {
        //     if (value === null || typeof value !== "object") {
        //       return "–";
        //     }
        //     return this.searchableFields.map((x) => value[x.name]).join(", ");
        //   };
        // }
        // public setRender(fn: (value: T) => React.ReactNode): this {
        //   this.config.render = (value) => {
        //     if (value === null) {
        //       return "–";
        //     }
        //     return fn(value);
        //   };
        //   return this;
        // }
        get: function () {
            var list = resolveOptionalThunk(this.config.list);
            return (list && list.initialSorting) || this.config.initialSorting;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityBase.prototype, "initialFilters", {
        get: function () {
            var list = resolveOptionalThunk(this.config.list);
            return (list && list.initialFilters) || this.config.initialFilters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityBase.prototype, "searchable", {
        get: function () {
            return typeof this.config.searchable !== "undefined";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityBase.prototype, "detailLayout", {
        get: function () {
            var layouts = resolveOptionalThunk(this.config.layouts);
            return layouts === null || layouts === void 0 ? void 0 : layouts.detail;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityBase.prototype, "editLayout", {
        get: function () {
            var layouts = resolveOptionalThunk(this.config.layouts);
            return layouts === null || layouts === void 0 ? void 0 : layouts.edit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityBase.prototype, "createLayout", {
        get: function () {
            var layouts = resolveOptionalThunk(this.config.layouts);
            return layouts === null || layouts === void 0 ? void 0 : layouts.create;
        },
        enumerable: false,
        configurable: true
    });
    EntityBase.prototype.setDetailLayout = function (fn) {
        var layouts = resolveOptionalThunk(this.config.layouts) || {};
        this.config.layouts = layouts;
        layouts.detail = fn;
    };
    EntityBase.prototype.setEditLayout = function (fn) {
        var layouts = resolveOptionalThunk(this.config.layouts) || {};
        layouts.edit = fn;
        this.config.layouts = layouts;
    };
    EntityBase.prototype.setCreateLayout = function (fn) {
        var layouts = resolveOptionalThunk(this.config.layouts) || {};
        layouts.create = fn;
        this.config.layouts = layouts;
    };
    EntityBase.prototype.getCardLayout = function (type, config) {
        var builder = new LayoutBuilder(config);
        var fn = this.cardLayouts[type];
        if (fn) {
            return fn(builder);
        }
        if (type == "detail" && config.id) {
            var detail = this.getDetailConfig(config.id);
            return builder.getDefaultDetailContent({
                descriptions: detail && detail.desriptions,
                fields: config.fields || (detail && detail.fields),
            });
        }
        else if (type == "edit") {
            var edit = this.getEditConfig(config.id);
            return builder.getDefaultEditContent({
                fields: config.fields || (edit && edit.fields),
            });
        }
        return null;
    };
    // // fields
    // public stringField<
    //   Name extends string,
    //   T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
    // >(name: Name, config?: IEntityFieldConfig<T2>): Entity<T2> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldString(name, config || {}, entity));
    //   return entity as any;
    // }
    // public textField<
    //   Name extends string,
    //   T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
    // >(name: Name, config?: IEntityFieldConfig<T2>): Entity<T2> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldText(name, config || {}, entity));
    //   return entity as any;
    // }
    // public numberField<
    //   Name extends string,
    //   T2 extends MergeEntityFieldType<T, { [K in Name]: number }>
    // >(name: Name, config?: IEntityFieldNumberConfig<T2>): Entity<T2> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldNumber(name, config || {}, entity));
    //   return entity as any;
    // }
    // public percentageField<
    //   Name extends string,
    //   T2 extends MergeEntityFieldType<T, { [K in Name]: number }>
    // >(name: Name, config?: IEntityFieldPercentageConfig<T2>): Entity<T2> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldPercentage(name, config || {}, entity));
    //   return entity as any;
    // }
    // public passwordField<
    //   Name extends string,
    //   T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
    // >(name: Name, config?: IEntityFieldConfig<T2>): Entity<T2> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldPasssword(name, config || {}, entity));
    //   return entity as any;
    // }
    // public dateField<
    //   Name extends string,
    //   T2 extends MergeEntityFieldType<T, { [K in Name]: moment.Moment }>
    // >(name: Name, config?: IEntityFieldDateConfig<T2>): Entity<T2> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldDate(name, config || {}, entity));
    //   return entity as any;
    // }
    // public booleanField<
    //   Name extends string,
    //   T2 extends MergeEntityFieldType<T, { [K in Name]: boolean }>
    // >(name: Name, config?: IEntityFieldBooleanConfig<T2>): Entity<T2> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldBoolean(name, config || {}, entity));
    //   return entity as any;
    // }
    // public relationshipField<
    //   Name extends string,
    //   T2 extends MergeEntityFieldType<T, EnhancedKeys>,
    //   Config extends IEntityFieldRelationshipConfig<EnhancedKeys>,
    //   EnhancedKeys = {
    //     [K in Name]: UnwrapEntity<ReturnType<Config["targetEntity"]>>;
    //   }
    // >(name: Name, config: Config): Entity<T2> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldRelationship(name, config, entity));
    //   return entity as any;
    // }
    // public fileField<
    //   Name extends string,
    //   T2 extends MergeEntityFieldType<T, { [K in Name]: any }>
    // >(name: Name, config?: IEntityFieldFileConfig<T>): Entity<T2> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldFile(name, config || {}, entity));
    //   return entity as any;
    // }
    // public colorField<
    //   Name extends string,
    //   T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
    // >(name: Name, config?: IEntityFieldConfig<T2>): Entity<T2> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldColor(name, config || {}, entity));
    //   return entity as any;
    // }
    // public enumField<
    //   Name extends string,
    //   T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
    // >(name: Name, config: IEntityFieldEnumConfig<T2>): Entity<T2> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldEnum(name, config, entity));
    //   return entity as any;
    // }
    // public computedField<
    //   Name extends string,
    //   EnhancedKeys = {
    //     [K in Name]: any;
    //   }
    // >(
    //   name: Name,
    //   config?: IEntityFieldComputedConfig<any>
    // ): Entity<T & EnhancedKeys> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldComputed(name, config || {}, this));
    //   return entity as any;
    // }
    // public customField<
    //   Name extends string,
    //   EnhancedKeys = {
    //     [K in Name]: any;
    //   }
    // >(
    //   name: Name,
    //   config: IEntityFieldCustomConfig<any>
    // ): Entity<T & EnhancedKeys> {
    //   const entity = this.clone();
    //   entity.fields.push(new EntityFieldCustom(name, config, this));
    //   return entity as any;
    // }
    // public setFieldRender<Name extends keyof T>(
    //   name: Name,
    //   fn: (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode
    // ): this {
    //   this.getField(name as string)?.setRender(fn);
    //   return this;
    // }
    // links
    EntityBase.prototype.getListLink = function () {
        var prefix = resolveOptionalThunk(this.config.pathPrefix);
        var props = resolveOptionalThunk(this.config.structure);
        return (props === null || props === void 0 ? void 0 : props.key) || "".concat(prefix || "", "/").concat(this.structureName);
    };
    EntityBase.prototype.getCreateLink = function () {
        return "".concat(this.getListLink(), "/new");
    };
    EntityBase.prototype.getDetailLink = function (id) {
        return "".concat(this.getListLink(), "/").concat(id);
    };
    EntityBase.prototype.getEditLink = function (id) {
        return "".concat(this.getListLink(), "/").concat(id, "/edit");
    };
    return EntityBase;
}());
export { EntityBase };
//# sourceMappingURL=EntityBase.js.map