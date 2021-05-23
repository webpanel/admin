import * as React from "react";
import * as inflection from "inflection";

import {
  CreateEntityButton,
  CreateEntityProps,
} from "../components/buttons/EntityAddButton";
import {
  DataSource,
  Resource,
  ResourceCollectionHookConfig,
  ResourceHookConfig,
  ResourceID,
  SortInfo,
  useResource,
  useResourceCollection,
} from "webpanel-data";
import {
  DetailEntityButton,
  DetailEntityProps,
} from "../components/buttons/EntityDetailButton";
import { EditOutlined, FolderOutlined } from "@ant-design/icons";
import {
  EntityDetail,
  IEntityDetailConfig,
  IEntityDetailProps,
} from "../components/pages/detail";
import {
  EntityEdit,
  IEntityCreateProps,
  IEntityEditConfig,
  IEntityEditProps,
} from "../components/pages/edit";
import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldRenderOptions,
} from "./EntityField";
import {
  EntityFieldBoolean,
  IEntityFieldBooleanConfig,
} from "./fields/EntityFieldBoolean";
import {
  EntityFieldComputed,
  IEntityFieldComputedConfig,
} from "./fields/EntityFieldComputed";
import {
  EntityFieldCustom,
  IEntityFieldCustomConfig,
} from "./fields/EntityFieldCustom";
import {
  EntityFieldDate,
  IEntityFieldDateConfig,
} from "./fields/EntityFieldDate";
import {
  EntityFieldEnum,
  IEntityFieldEnumConfig,
} from "./fields/EntityFieldEnum";
import {
  EntityFieldFile,
  IEntityFieldFileConfig,
} from "./fields/EntityFieldFile";
import {
  EntityFieldNumber,
  IEntityFieldNumberConfig,
} from "./fields/EntityFieldNumber";
import {
  EntityFieldPercentage,
  IEntityFieldPercentageConfig,
} from "./fields/EntityFieldPercentage";
import {
  EntityFieldRelationship,
  IEntityFieldRelationshipConfig,
} from "./fields/EntityFieldRelationship";
import { EntityList, IEntityListConfig } from "../components/pages/list";
import { EntitySelect, EntitySelectConfig } from "../components/entity-picker";
import { Layout, Link, RouteComponentProps } from "webpanel-antd";
import {
  ResourceCollection,
  ResourceCollectionConfig,
} from "webpanel-data/lib/ResourceCollection";
import { Thunk, resolveOptionalThunk, resolveThunk } from "ts-thunk";

import { Button } from "antd";
import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { EntityFieldColor } from "./fields/EntityFieldColor";
import { EntityFieldPasssword } from "./fields/EntityFieldPassword";
import { EntityFieldString } from "./fields/EntityFieldString";
import { EntityFieldText } from "./fields/EntityFieldText";
import { LayoutBuilder } from "../layout-builder";
import { LayoutBuilderConfig } from "../layout-builder/builder";
import { MenuItemProps } from "antd/lib/menu/MenuItem";
import { Redirect } from "react-router";
import { StructureItemProps } from "webpanel-antd/lib/layout/Structure";
import { Translation } from "react-i18next";

// import { Button } from 'antd';

type MergeEntityFieldType<T, U, T0 = T & U, T1 = { [K in keyof T0]: T0[K] }> =
  T1;

export type EntityDataType = { id: ResourceID };
type UnwrapEntity<T> = T extends Entity<infer U> ? U : never;

interface IEntitySearchableConfig {
  fields: Thunk<string[]>;
}

interface IEntityDetailOptions<T extends EntityDataType> {
  entity: Entity<T>;
  resourceID: ResourceID;
}
interface IEntityEditOptions<T extends EntityDataType> {
  entity: Entity<T>;
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

export class Entity<T extends EntityDataType = EntityDataType> {
  public fields: EntityField<any, any>[] = [];

  autopermissions?: boolean;

  constructor(private config: IEntityConfig<T>) {}

  public updateConfig(config: Partial<IEntityConfig<T>>): Entity<T> {
    const entity = this.clone();
    entity.config = {
      ...entity.config,
      ...config,
    };
    return entity;
  }

  private clone(): Entity<T> {
    const e: Entity<T> = new Entity(this.config);
    e.fields = this.fields.map((f) => {
      return f.clone();
    });
    return e;
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

  public get render(): (value: T | null) => React.ReactNode {
    if (this.config.render) {
      return this.config.render;
    }
    return (value: any) => {
      if (value === null || typeof value !== "object") {
        return "–";
      }
      return this.searchableFields.map((x) => value[x.name]).join(", ");
    };
  }

  public setRender(fn: (value: T) => React.ReactNode): this {
    this.config.render = (value) => {
      if (value === null) {
        return "–";
      }
      return fn(value);
    };
    return this;
  }

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

  public getField(name: string): EntityField<T, any> | null {
    const filtered = this.fields.filter((f) => f.name === name);
    return filtered.length > 0 ? filtered[0] : null;
  }
  public getFieldOrFail(name: string): EntityField<T, any> {
    const filtered = this.fields.filter((f) => f.name === name);
    if (filtered.length === 0) {
      throw new Error(`Cannot find field ${name} on entity ${this.name}`);
    }
    return filtered[0];
  }

  public getListFields(): EntityField<T, any>[] {
    const listConfig = this.getListConfig();
    if (listConfig) {
      const fields = resolveOptionalThunk(listConfig.fields);
      if (fields) {
        return fields
          .map((f) => {
            const fieldName = typeof f === "string" ? f : f?.field;
            if (!fieldName) {
              return null;
            }
            return this.getFieldOrFail(fieldName);
          })
          .filter((x) => x) as EntityField<T, any>[];
      }
    }
    return this.fields.filter((f) => f.readable);
  }
  public getEditFields(resourceID?: ResourceID): EntityField<T, any>[] {
    const editConfig = this.getEditConfig(resourceID);
    if (editConfig) {
      const fields = resolveOptionalThunk(editConfig.fields);
      if (fields) {
        return fields
          .map((f) => {
            const fieldName = typeof f === "string" ? f : f?.field;
            if (!fieldName) {
              return null;
            }
            return this.getFieldOrFail(fieldName);
          })
          .filter((x) => x) as EntityField<T, any>[];
      }
    }
    return this.fields.filter((f) => f.writeable);
  }
  public getDetailFields(resourceID: ResourceID): EntityField<T, any>[] {
    const detailConfig = this.getDetailConfig(resourceID);
    if (detailConfig) {
      const _detailFields = resolveOptionalThunk(detailConfig.fields);
      if (_detailFields) {
        const detailFields = _detailFields.map((f) =>
          typeof f === "string" ? f : f?.field
        );
        return this.fields.filter(
          (f) => f.readable && detailFields.indexOf(f.name) !== -1
        );
      }
    }
    return this.fields.filter((f) => f.readable);
  }
  public get searchableFields(): EntityField<T, any>[] {
    const search = resolveOptionalThunk(this.config.searchable);
    let fields: EntityField<T, any>[] = [];
    if (search && typeof search !== "boolean") {
      const searchFields = resolveOptionalThunk(search.fields);
      if (searchFields) {
        fields = this.fields.filter(
          (f) => f.readable && searchFields.indexOf(f.name) !== -1
        );
      }
    }
    const listFields = this.getListFields();
    if (fields.length === 0 && listFields.length > 0) {
      return [listFields[0]];
    }
    return fields;
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

  public menuItem = (): React.ReactNode => {
    const props = resolveOptionalThunk(this.config.menu);
    return (
      <Layout.MenuItem
        key={this.structureName}
        title={
          <Translation>
            {(t) =>
              t(`${this.name}._title`, {
                count: 100,
                defaultValue: this.title,
              })
            }
          </Translation>
        }
        icon={resolveOptionalThunk(this.config.icon) || <FolderOutlined />}
        {...props}
      />
    );
  };

  public structureItem = (): React.ReactNode => {
    const props = resolveOptionalThunk(this.config.structure);
    return (
      <Layout.StructureItem
        key={`/${this.structureName}`}
        name={
          <Translation>
            {(t) =>
              t(`${this.name}._title`, { count: 100, defaultValue: this.title })
            }
          </Translation>
        }
        // header={
        //   {
        //     // title: undefined //this.title,
        //     // action: (
        //     //   <Link to="new">
        //     //     <Button htmlType="button">+</Button>
        //     //   </Link>
        //     // )
        //   }
        // }
        content={() => this.getListView(this.getListConfig())}
        {...props}
      >
        <Layout.StructureItem
          key="/new"
          name={
            <Translation ns="webpanel-admin">
              {(t) => t("new", { defaultValue: "New" })}
            </Translation>
          }
          // header={
          //   {
          //     // title: 'New'
          //   }
          // }
          content={this.getCreatePageLayout}
        />
        <Layout.StructureItem
          key="/:id"
          name={
            <Translation ns="webpanel-admin">{(t) => t("detail")}</Translation>
          }
          // header={(route: RouteComponentProps<any>) => ({
          //   // title: `Detail`,
          //   // action: (
          //   //   <Link to={`${route.match.params.id}/edit`}>
          //   //     <Button htmlType="button">Edit</Button>
          //   //   </Link>
          //   // )
          // })}
          content={this.getDetailPageLayout}
        />
        <Layout.StructureItem
          key="/:id/edit"
          name={
            <Translation ns="webpanel-admin">{(t) => t("edit")}</Translation>
          }
          // header={
          //   {
          //     // title: 'Edit'
          //   }
          // }
          content={this.getEditPageLayout}
        />
      </Layout.StructureItem>
    );
  };

  private getDetailPageLayout = (
    route: RouteComponentProps<any>,
    config?: IEntityDetailConfig
  ) => {
    const resourceID = route.match.params.id;
    if (this.config.showDetailPage) {
      if (this.detailLayout) {
        return this.detailLayout({
          entity: this,
          resourceID,
          ...{ ...this.getDetailConfig(resourceID), ...config },
        });
      }
      return (
        <EntityDetail
          entity={this}
          resourceID={resourceID}
          {...this.getDetailConfig(resourceID)}
          {...config}
        />
      );
    }

    return <Redirect to={`${resourceID}/edit`} />;
  };

  private handleFormOnSave =
    (route: RouteComponentProps<any>) => (id: ResourceID) => {
      if (
        route.history.length > 1 &&
        (route.location.state as any)?.goBackEnabled
      ) {
        route.history.goBack();
        return;
      }
      route.history.push(this.getDetailLink(id));
    };
  private getEditPageLayout = (
    route: RouteComponentProps<any>,
    props?: Omit<IEntityEditProps, "resourceID">
  ) => {
    const onSave = this.handleFormOnSave(route);
    const resourceID = route.match.params.id;
    if (this.editLayout) {
      return this.editLayout({ entity: this, onSave, resourceID, ...props });
    }
    return (
      <EntityEdit
        entity={this}
        onSave={onSave}
        resourceID={resourceID}
        {...this.getEditConfig(resourceID)}
        {...props}
      />
    );
  };

  private getCreatePageLayout = (
    route: RouteComponentProps<any>,
    config?: IEntityEditConfig
  ) => {
    const onSave = this.handleFormOnSave(route);
    if (this.createLayout) {
      return this.createLayout({ entity: this, onSave });
    }
    return (
      <EntityEdit
        entity={this}
        onSave={onSave}
        {...this.getEditConfig()}
        {...config}
      />
    );
  };

  // views
  public getListView = (
    config?: Thunk<IEntityListConfig<T>>
  ): React.ReactNode => {
    return <EntityList entity={this} {...config} />;
  };

  public getDetailView = (
    resourceID: ResourceID,
    config?: IEntityDetailConfig
  ): React.ReactNode => {
    return (
      <EntityDetail
        entity={this}
        resourceID={resourceID}
        {...this.getDetailConfig(resourceID)}
        {...config}
      />
    );
  };

  public getDetailButton = (
    id: ResourceID,
    props: DetailEntityProps
  ): React.ReactNode => {
    return <DetailEntityButton entity={this} entityId={id} {...props} />;
  };

  public getCreateView = (
    props?: Omit<IEntityCreateProps, "entity">
  ): React.ReactNode => {
    if (this.createLayout) {
      return this.createLayout({ entity: this, ...props });
    }
    return <EntityEdit entity={this} {...this.getEditConfig()} {...props} />;
  };

  public getCreateButton = (
    props: Omit<CreateEntityProps, "entity">
  ): React.ReactNode => {
    return <CreateEntityButton entity={this} {...props} />;
  };

  public getEditView = (
    props: Omit<IEntityEditProps, "entity">
  ): React.ReactNode => {
    // const { onSave } = handlers || {
    //   onSave: undefined,
    // };
    if (this.editLayout) {
      return this.editLayout({ entity: this, ...props });
    }
    return (
      <EntityEdit
        entity={this}
        {...this.getEditConfig(props.resourceID)}
        {...props}
      />
    );
  };

  public getEditButton = (resourceID: ResourceID): React.ReactNode => {
    return (
      <Link
        to={{
          pathname: this.getEditLink(resourceID),
          state: { goBackEnabled: true },
        }}
      >
        <Button size="small" htmlType="button" icon={<EditOutlined />} />
      </Link>
    );
  };

  public getSearchResourceCollectionConfig =
    (): ResourceCollectionConfig<T> => {
      return {
        name: this.resourceName,
        fields: [
          "id",
          ...this.searchableFields.map(
            (x: EntityField<any, any>) => x.fetchField() || x.name
          ),
        ],
        initialSorting: this.initialSorting,
        initialFilters: this.initialFilters,
        dataSource: this.dataSource,
      };
    };

  public getSelect(config?: EntitySelectConfig): React.ReactNode {
    return <EntitySelect entity={this} {...config} />;
  }

  // fields
  public stringField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
  >(name: Name, config?: IEntityFieldConfig<T2>): Entity<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldString(name, config || {}, entity));
    return entity as any;
  }
  public textField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
  >(name: Name, config?: IEntityFieldConfig<T2>): Entity<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldText(name, config || {}, entity));
    return entity as any;
  }
  public numberField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: number }>
  >(name: Name, config?: IEntityFieldNumberConfig<T2>): Entity<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldNumber(name, config || {}, entity));
    return entity as any;
  }
  public percentageField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: number }>
  >(name: Name, config?: IEntityFieldPercentageConfig<T2>): Entity<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldPercentage(name, config || {}, entity));
    return entity as any;
  }
  public passwordField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
  >(name: Name, config?: IEntityFieldConfig<T2>): Entity<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldPasssword(name, config || {}, entity));
    return entity as any;
  }
  public dateField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: moment.Moment }>
  >(name: Name, config?: IEntityFieldDateConfig<T2>): Entity<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldDate(name, config || {}, entity));
    return entity as any;
  }
  public booleanField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: boolean }>
  >(name: Name, config?: IEntityFieldBooleanConfig<T2>): Entity<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldBoolean(name, config || {}, entity));
    return entity as any;
  }
  public relationshipField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, EnhancedKeys>,
    Config extends IEntityFieldRelationshipConfig<EnhancedKeys>,
    EnhancedKeys = {
      [K in Name]: UnwrapEntity<ReturnType<Config["targetEntity"]>>;
    }
  >(name: Name, config: Config): Entity<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldRelationship(name, config, entity));
    return entity as any;
  }
  public fileField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: any }>
  >(name: Name, config?: IEntityFieldFileConfig<T>): Entity<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldFile(name, config || {}, entity));
    return entity as any;
  }
  public colorField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
  >(name: Name, config?: IEntityFieldConfig<T2>): Entity<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldColor(name, config || {}, entity));
    return entity as any;
  }
  public enumField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
  >(name: Name, config: IEntityFieldEnumConfig<T2>): Entity<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldEnum(name, config, entity));
    return entity as any;
  }
  public computedField<
    Name extends string,
    EnhancedKeys = {
      [K in Name]: any;
    }
  >(
    name: Name,
    config?: IEntityFieldComputedConfig<any>
  ): Entity<T & EnhancedKeys> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldComputed(name, config || {}, this));
    return entity as any;
  }
  public customField<
    Name extends string,
    EnhancedKeys = {
      [K in Name]: any;
    }
  >(
    name: Name,
    config: IEntityFieldCustomConfig<any>
  ): Entity<T & EnhancedKeys> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldCustom(name, config, this));
    return entity as any;
  }

  public setFieldRender<Name extends keyof T>(
    name: Name,
    fn: (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode
  ): this {
    this.getField(name as string)?.setRender(fn);
    return this;
  }

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
  public useResource(config?: Partial<ResourceHookConfig<T>>): Resource<T> {
    let entityFields: EntityField<any, any>[] = config?.id
      ? this.getDetailFields(config?.id)
      : this.getEditFields();

    return useResource({
      fields: [
        "id",
        ...(entityFields
          .map((x) => x && x.fetchField())
          .filter((x) => x) as string[]),
      ],
      ...config,
      name: this.resourceName,
      id: config?.id,
      dataSource: this.dataSource,
    });
  }

  public useResourceCollection(
    config?: Partial<ResourceCollectionHookConfig<T>>
  ): ResourceCollection<T> {
    let entityFields: EntityField<any, any>[] = this.getListFields();

    return useResourceCollection({
      fields: [
        "id",
        ...(entityFields
          .map((x) => x && x.fetchField())
          .filter((x) => x) as string[]),
      ],
      ...config,
      name: this.resourceName,
      dataSource: this.dataSource,
    });
  }
}
