import * as React from "react";
import * as inflection from "inflection";

import { DataSource, ResourceID, SortInfo } from "webpanel-data";
import {
  IEntityDetailConfig,
  IEntityDetailProps,
} from "../components/pages/detail";
import {
  IEntityCreateProps,
  IEntityEditConfig,
  IEntityEditProps,
} from "../components/pages/edit";
import { IEntityListConfig } from "../components/pages/list";
import { Thunk, resolveOptionalThunk, resolveThunk } from "ts-thunk";

import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { LayoutBuilder } from "../layout-builder";
import { LayoutBuilderConfig } from "../layout-builder/builder";
import { MenuItemProps } from "antd/lib/menu/MenuItem";
import { StructureItemProps } from "webpanel-antd/lib/layout/Structure";

export type EntityDataType = { id: ResourceID };

interface IEntitySearchableConfig {
  fields: Thunk<string[]>;
}

interface IEntityDetailOptions<T extends EntityDataType> {
  entity: EntityBase<T>;
  resourceID: ResourceID;
}
interface IEntityEditOptions<T extends EntityDataType> {
  entity: EntityBase<T>;
  resourceID?: ResourceID;
}

type ILayoutGetter<T> = (props: T) => React.ReactNode;

export interface IEntityConfig<T extends EntityDataType> {
  name: Thunk<string>;
  resourceName?: Thunk<string>;
  pathPrefix?: Thunk<string>;
  icon?: Thunk<React.ReactNode>;
  dataSource: Thunk<DataSource>;
  title?: Thunk<string>;
  enabled?: Thunk<boolean>;
  creatable?: Thunk<boolean>;
  updateable?: Thunk<boolean, T>;
  deletable?: Thunk<boolean, T>;
  showDetailPage?: Thunk<boolean>;
  layouts?: Thunk<{
    detail?: ILayoutGetter<IEntityDetailProps>;
    edit?: ILayoutGetter<IEntityEditProps>;
    create?: ILayoutGetter<IEntityCreateProps>;
  }>;
  menu?: Thunk<Partial<MenuItemProps & { key: string }>>;
  structure?: Thunk<Partial<StructureItemProps & { key: string }>>;
  list?: Thunk<IEntityListConfig<T>>;
  edit?: Thunk<IEntityEditConfig, IEntityEditOptions<T>>;
  detail?: Thunk<IEntityDetailConfig, IEntityDetailOptions<T>>;

  searchable?: Thunk<boolean | IEntitySearchableConfig>;
  // render loaded entity to string (in search fields etc.)
  // only fields with {visible:['search']} are loaded for rendering
  render?: (value: T | null) => React.ReactNode;

  // deprecated, user table config directly
  initialSorting?: SortInfo[];
  // deprecated, user table config directly
  initialFilters?: DataSourceArgumentMap;
}

export class EntityBase<T extends EntityDataType = EntityDataType> {
  // public fields: EntityField<any, any>[] = [];

  autopermissions?: boolean;

  constructor(protected config: IEntityConfig<T>) {}

  public updateConfig(config: Partial<IEntityConfig<T>>): this {
    const entity = this.clone();
    entity.config = {
      ...entity.config,
      ...config,
    };
    return entity;
  }

  protected clone(): this {
    return new (this.constructor as any)(this.config);
  }

  public get structureName(): string {
    return `${inflection.transform(resolveThunk(this.config.name), [
      "tableize",
      "dasherize",
      "pluralize",
    ])}`;
  }

  public get title(): string {
    return (
      resolveOptionalThunk(this.config.title) ||
      inflection.titleize(resolveThunk(this.config.name))
    );
  }

  public get enabled(): boolean {
    const val = resolveOptionalThunk(this.config.enabled);
    if (typeof val !== "undefined") return val;
    return true;
  }
  public get creatable(): boolean {
    const val = resolveOptionalThunk(this.config.creatable);
    if (typeof val !== "undefined") return val;
    return true;
  }
  public updateable(values: T): boolean {
    const val = resolveOptionalThunk(this.config.updateable, values);
    if (typeof val !== "undefined") return val;
    return true;
  }
  public deletable(values: T): boolean {
    const val = resolveOptionalThunk(this.config.deletable, values);
    if (typeof val !== "undefined") return val;
    return true;
  }

  public get showDetailPage(): boolean {
    return resolveOptionalThunk(this.config.showDetailPage) || false;
  }

  public get name(): string {
    return resolveThunk(this.config.name);
  }
  public get resourceName(): string {
    return resolveOptionalThunk(this.config.resourceName) || this.name;
  }

  public get dataSource(): DataSource {
    return resolveThunk(this.config.dataSource);
  }

  public getListConfig(): IEntityListConfig<T> | undefined {
    return resolveOptionalThunk(this.config.list);
  }
  public getEditConfig(resourceID?: ResourceID): IEntityEditConfig | undefined {
    return resolveOptionalThunk(this.config.edit, { entity: this, resourceID });
  }
  public getDetailConfig(
    resourceID: ResourceID
  ): IEntityDetailConfig | undefined {
    return resolveOptionalThunk(this.config.detail, {
      entity: this,
      resourceID,
    });
  }

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

  public get initialSorting(): SortInfo[] | undefined {
    const list = resolveOptionalThunk(this.config.list);
    return (list && list.initialSorting) || this.config.initialSorting;
  }
  public get initialFilters(): DataSourceArgumentMap | undefined {
    const list = resolveOptionalThunk(this.config.list);
    return (list && list.initialFilters) || this.config.initialFilters;
  }
  public get searchable(): boolean {
    return typeof this.config.searchable !== "undefined";
  }

  public get detailLayout(): ILayoutGetter<IEntityDetailProps> | undefined {
    const layouts = resolveOptionalThunk(this.config.layouts);
    return layouts?.detail;
  }

  public get editLayout(): ILayoutGetter<IEntityEditProps> | undefined {
    const layouts = resolveOptionalThunk(this.config.layouts);
    return layouts?.edit;
  }

  public get createLayout(): ILayoutGetter<IEntityCreateProps> | undefined {
    const layouts = resolveOptionalThunk(this.config.layouts);
    return layouts?.create;
  }

  public setDetailLayout(fn: ILayoutGetter<IEntityDetailProps>) {
    const layouts = resolveOptionalThunk(this.config.layouts) || {};
    this.config.layouts = layouts;
    layouts.detail = fn;
  }
  public setEditLayout(fn: ILayoutGetter<IEntityEditProps>) {
    const layouts = resolveOptionalThunk(this.config.layouts) || {};
    layouts.edit = fn;
    this.config.layouts = layouts;
  }
  public setCreateLayout(fn: ILayoutGetter<IEntityCreateProps>) {
    const layouts = resolveOptionalThunk(this.config.layouts) || {};
    layouts.create = fn;
    this.config.layouts = layouts;
  }

  private cardLayouts: {
    [key: string]: (builder: LayoutBuilder) => React.ReactNode;
  } = {};
  public setCardLayout = (
    type: "detail" | "edit",
    fn: (builder: LayoutBuilder) => React.ReactNode
  ) => {
    this.cardLayouts[type] = fn;
  };

  public getCardLayout(
    type: "detail" | "edit",
    config: LayoutBuilderConfig & (IEntityDetailConfig | IEntityEditConfig)
  ): React.ReactNode {
    const builder = new LayoutBuilder(config);
    const fn = this.cardLayouts[type];
    if (fn) {
      return fn(builder);
    }
    if (type == "detail" && config.id) {
      const detail = this.getDetailConfig(config.id);
      return builder.getDefaultDetailContent({
        descriptions: detail && detail.desriptions,
        fields: config.fields || (detail && detail.fields),
      });
    } else if (type == "edit") {
      const edit = this.getEditConfig(config.id);
      return builder.getDefaultEditContent({
        fields: config.fields || (edit && edit.fields),
      });
    }
    return null;
  }

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
  public getListLink(): string {
    const prefix = resolveOptionalThunk(this.config.pathPrefix);
    const props = resolveOptionalThunk(this.config.structure);
    return props?.key || `${prefix || ""}/${this.structureName}`;
  }
  public getCreateLink(): string {
    return `${this.getListLink()}/new`;
  }
  public getDetailLink(id: ResourceID): string {
    return `${this.getListLink()}/${id}`;
  }
  public getEditLink(id: ResourceID): string {
    return `${this.getListLink()}/${id}/edit`;
  }

  // resource hooks
  // public useResource(config?: Partial<ResourceHookConfig<T>>): Resource<T> {
  //   let entityFields: EntityField<any, any>[] = config?.id
  //     ? this.getDetailFields(config?.id)
  //     : this.getEditFields();

  //   return useResource({
  //     fields: [
  //       "id",
  //       ...(entityFields
  //         .map((x) => x && x.fetchField())
  //         .filter((x) => x) as string[]),
  //     ],
  //     ...config,
  //     name: this.resourceName,
  //     id: config?.id,
  //     dataSource: this.dataSource,
  //   });
  // }

  // public useResourceCollection(
  //   config?: Partial<ResourceCollectionHookConfig<T>>
  // ): ResourceCollection<T> {
  //   let entityFields: EntityField<any, any>[] = this.getListFields();

  //   return useResourceCollection({
  //     fields: [
  //       "id",
  //       ...(entityFields
  //         .map((x) => x && x.fetchField())
  //         .filter((x) => x) as string[]),
  //     ],
  //     ...config,
  //     name: this.resourceName,
  //     dataSource: this.dataSource,
  //   });
  // }
}
