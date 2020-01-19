import * as React from "react";
import * as inflection from "inflection";

import {
  CreateEntityButton,
  CreateEntityProps
} from "../components/buttons/EntityAddButton";
import {
  DataSource,
  ResourceCollection,
  ResourceCollectionLayer,
  ResourceID,
  SortInfo
} from "webpanel-data";
import {
  DetailEntityButton,
  DetailEntityProps
} from "../components/buttons/EntityDetailButton";
import {
  EntityEditLayout,
  IEntityEditLayoutProps
} from "../components/layouts/entity.edit";
import { EntityField, IEntityFieldConfig } from "./EntityField";
import {
  EntityFieldBoolean,
  IEntityFieldBooleanConfig
} from "./fields/EntityFieldBoolean";
import {
  EntityFieldComputed,
  IEntityFieldComputedConfig
} from "./fields/EntityFieldComputed";
import {
  EntityFieldCustom,
  IEntityFieldCustomConfig
} from "./fields/EntityFieldCustom";
import {
  EntityFieldDate,
  IEntityFieldDateConfig
} from "./fields/EntityFieldDate";
import {
  EntityFieldEnum,
  IEntityFieldEnumConfig
} from "./fields/EntityFieldEnum";
import {
  EntityFieldFile,
  IEntityFieldFileConfig
} from "./fields/EntityFieldFile";
import {
  EntityFieldRelationship,
  IEntityFieldRelationshipConfig
} from "./fields/EntityFieldRelationship";
import { EntityList, IEntityListConfig } from "../components/pages/list";
import {
  EntityOnSaveHandler,
  IEntityEditConfig
} from "../components/pages/edit";
import { EntitySelect, EntitySelectConfig } from "../components/entity-picker";
import {
  IEntityDetailConfig,
  IEntityDetailProps
} from "../components/pages/detail";
import { Layout, Link, RouteComponentProps } from "webpanel-antd";
import { Thunk, resolveOptionalThunk, resolveThunk } from "ts-thunk";

import { Button } from "antd";
import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { EntityDetailLayout } from "../components/layouts/entity.detail";
import { EntityFieldColor } from "./fields/EntityFieldColor";
import { EntityFieldNumber } from "./fields/EntityFieldNumber";
import { EntityFieldPasssword } from "./fields/EntityFieldPassword";
import { EntityFieldString } from "./fields/EntityFieldString";
import { EntityFieldText } from "./fields/EntityFieldText";
import { LayoutBuilder } from "../layout-builder";
import { LayoutBuilderConfig } from "../layout-builder/builder";
import { Redirect } from "react-router";
import { ResourceCollectionLayerProps } from "webpanel-data/lib/components/ResourceCollectionLayer";
import { SaveOption } from "../components/form/buttons";
import { Translation } from "react-i18next";
import { componentPermission } from "./permissions";

// import { Button } from 'antd';

interface IEntitySearchableConfig {
  fields: Thunk<string[]>;
}

interface IEntityDetailOptions<T> {
  entity: Entity<T>;
  resourceID: ResourceID;
}
interface IEntityEditOptions<T> {
  entity: Entity<T>;
  resourceID?: ResourceID;
}

export interface IEntityConfig<T> {
  name: Thunk<string>;
  pathPrefix?: Thunk<string>;
  icon?: Thunk<string>;
  dataSource: Thunk<DataSource>;
  title?: Thunk<string>;
  enabled?: Thunk<boolean>;
  creatable?: Thunk<boolean>;
  updateable?: Thunk<boolean>;
  deletable?: Thunk<boolean>;
  showDetailPage?: Thunk<boolean>;
  layouts?: Thunk<{
    detail?: (props: IEntityDetailProps) => React.ReactNode;
    edit?: (props: IEntityEditLayoutProps) => React.ReactNode;
    create?: (props: IEntityEditLayoutProps) => React.ReactNode;
  }>;
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

export class Entity<T = any> {
  public fields: EntityField<T, any>[] = [];

  autopermissions?: boolean;

  constructor(private readonly config: IEntityConfig<T>) {}

  public get structureName(): string {
    return `${inflection.transform(resolveThunk(this.config.name), [
      "tableize",
      "dasherize",
      "pluralize"
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
  public get updateable(): boolean {
    const val = resolveOptionalThunk(this.config.updateable);
    if (typeof val !== "undefined") return val;
    return true;
  }
  public get deletable(): boolean {
    const val = resolveOptionalThunk(this.config.deletable);
    if (typeof val !== "undefined") return val;
    return true;
  }

  public get showDetailPage(): boolean {
    return resolveOptionalThunk(this.config.showDetailPage) || false;
  }

  public get name(): string {
    return resolveThunk(this.config.name);
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
      resourceID
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
      return this.searchableFields.map(x => value[x.name]).join(", ");
    };
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
    const filtered = this.fields.filter(f => f.name === name);
    return filtered.length > 0 ? filtered[0] : null;
  }
  public getFieldOrFail(name: string): EntityField<T, any> {
    const filtered = this.fields.filter(f => f.name === name);
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
          .map(f => {
            const fieldName = typeof f === "string" ? f : f?.field;
            if (!fieldName) {
              return null;
            }
            return this.getFieldOrFail(fieldName);
          })
          .filter(x => x) as EntityField<T, any>[];
      }
    }
    return this.fields.filter(f => f.readable);
  }
  public getEditFields(resourceID?: ResourceID): EntityField<T, any>[] {
    const editConfig = this.getEditConfig(resourceID);
    if (editConfig) {
      const fields = resolveOptionalThunk(editConfig.fields);
      if (fields) {
        return fields
          .map(f => {
            const fieldName = typeof f === "string" ? f : f?.field;
            if (!fieldName) {
              return null;
            }
            return this.getFieldOrFail(fieldName);
          })
          .filter(x => x) as EntityField<T, any>[];
      }
    }
    return this.fields.filter(f => f.writeable);
  }
  public getDetailFields(resourceID: ResourceID): EntityField<T, any>[] {
    const detailConfig = this.getDetailConfig(resourceID);
    if (detailConfig) {
      const _detailFields = resolveOptionalThunk(detailConfig.fields);
      if (_detailFields) {
        const detailFields = _detailFields.map(f =>
          typeof f === "string" ? f : f?.field
        );
        return this.fields.filter(
          f => f.readable && detailFields.indexOf(f.name) !== -1
        );
      }
    }
    return this.fields.filter(f => f.readable);
  }
  public get searchableFields(): EntityField<T, any>[] {
    const search = resolveOptionalThunk(this.config.searchable);
    let fields: EntityField<T, any>[] = [];
    if (search && typeof search !== "boolean") {
      const searchFields = resolveOptionalThunk(search.fields);
      if (searchFields) {
        fields = this.fields.filter(
          f => f.readable && searchFields.indexOf(f.name) !== -1
        );
      }
    }
    const listFields = this.getListFields();
    if (fields.length === 0 && listFields.length > 0) {
      return [listFields[0]];
    }
    return fields;
  }

  public get detailLayout():
    | ((props: IEntityDetailProps) => React.ReactNode)
    | undefined {
    const layouts = resolveOptionalThunk(this.config.layouts);
    if (!layouts) return undefined;
    return layouts.detail;
  }

  public get editLayout():
    | ((
        props: IEntityEditLayoutProps,
        resourceID: ResourceID
      ) => React.ReactNode)
    | undefined {
    const layouts = resolveOptionalThunk(this.config.layouts);
    return layouts && layouts.edit;
  }

  public get createLayout():
    | ((props: IEntityEditLayoutProps) => React.ReactNode)
    | undefined {
    const layouts = resolveOptionalThunk(this.config.layouts);
    return layouts && layouts.create;
  }

  private layouts: {
    [key: string]: (builder: LayoutBuilder) => React.ReactNode;
  } = {};
  public setLayout = (
    type: "detail" | "edit",
    fn: (builder: LayoutBuilder) => React.ReactNode
  ) => {
    this.layouts[type] = fn;
  };

  public getLayout(
    type: "detail" | "edit",
    config: LayoutBuilderConfig
  ): React.ReactNode {
    const builder = new LayoutBuilder(config);
    const fn = this.layouts[type];
    if (fn) {
      return fn(builder);
    }
    if (type == "detail" && config.id) {
      const detail = this.getDetailConfig(config.id);
      return builder.getDefaultDetailContent({
        descriptions: detail && detail.desriptions,
        fields: detail && detail.fields
      });
    } else if (type == "edit") {
      const edit = this.getEditConfig(config.id);
      return builder.getDefaultEditContent({
        fields: edit && edit.fields
      });
    }
    return null;
  }

  public menuItem = (): React.ReactNode => {
    return (
      componentPermission(this.structureName) && (
        <Layout.MenuItem
          key={this.structureName}
          title={
            <Translation>
              {t =>
                t(`${this.name}._title`, {
                  count: 100,
                  defaultValue: this.title
                })
              }
            </Translation>
          }
          icon={resolveOptionalThunk(this.config.icon) || "folder"}
        />
      )
    );
  };

  public structureItem = (): React.ReactNode => {
    return (
      <Layout.StructureItem
        key={`/${this.structureName}`}
        name={
          <Translation>
            {t =>
              t(`${this.name}._title`, { count: 100, defaultValue: this.title })
            }
          </Translation>
        }
        header={
          {
            // title: undefined //this.title,
            // action: (
            //   <Link to="new">
            //     <Button htmlType="button">+</Button>
            //   </Link>
            // )
          }
        }
        content={() => this.getListView(this.getListConfig())}
      >
        <Layout.StructureItem
          key="/new"
          name={
            <Translation>
              {t => t("common.new", { defaultValue: "New" })}
            </Translation>
          }
          header={
            {
              // title: 'New'
            }
          }
          content={this.getCreatePageLayout}
        />
        <Layout.StructureItem
          key="/:id"
          name={
            <Translation>
              {t => t("common.detail", { defaultValue: "Detail" })}
            </Translation>
          }
          header={(route: RouteComponentProps<any>) => ({
            // title: `Detail`,
            // action: (
            //   <Link to={`${route.match.params.id}/edit`}>
            //     <Button htmlType="button">Edit</Button>
            //   </Link>
            // )
          })}
          content={this.getDetailPageLayout}
        />
        <Layout.StructureItem
          key="/:id/edit"
          name={
            <Translation>
              {t => t("common.edit", { defaultValue: "Edit" })}
            </Translation>
          }
          header={
            {
              // title: 'Edit'
            }
          }
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
          ...{ ...this.getDetailConfig(resourceID), ...config }
        });
      }
      return (
        <EntityDetailLayout
          entity={this}
          resourceID={resourceID}
          {...this.getDetailConfig(resourceID)}
          {...config}
        />
      );
    }

    return <Redirect to={`${resourceID}/edit`} />;
  };

  private handleFormOnSave = (route: RouteComponentProps<any>) => (
    id: ResourceID,
    option: SaveOption
  ) => {
    switch (option) {
      case "add":
        route.history.push(this.getCreateLink());
        break;
      case "edit":
        route.history.push(this.getEditLink(id));
        break;
      default:
        route.history.push(this.getListLink());
        break;
    }
  };
  private getEditPageLayout = (
    route: RouteComponentProps<any>,
    config?: IEntityEditConfig
  ) => {
    const onSave = this.handleFormOnSave(route);
    const resourceID = route.match.params.id;
    if (this.editLayout) {
      return this.editLayout({ entity: this, onSave, ...config }, resourceID);
    }
    return (
      <EntityEditLayout
        entity={this}
        onSave={onSave}
        resourceID={resourceID}
        {...this.getEditConfig(resourceID)}
        {...config}
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
      <EntityEditLayout
        entity={this}
        onSave={onSave}
        {...this.getEditConfig()}
        {...config}
      />
    );
  };

  // views
  public getListView = (config?: IEntityListConfig<T>): React.ReactNode => {
    return (
      <EntityList entity={this} dataSource={this.dataSource} {...config} />
    );
  };

  public getDetailView = (
    resourceID: ResourceID,
    config?: IEntityDetailConfig
  ): React.ReactNode => {
    return (
      <EntityDetailLayout
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
    config?: IEntityEditConfig,
    handlers?: { onSave?: EntityOnSaveHandler; onCancel?: () => void }
  ): React.ReactNode => {
    const { onSave, onCancel } = handlers || {
      onSave: undefined,
      onCancel: undefined
    };
    if (this.createLayout) {
      return this.createLayout({ entity: this, onSave, onCancel });
    }
    return (
      <EntityEditLayout
        entity={this}
        onSave={onSave}
        onCancel={onCancel}
        {...this.getEditConfig()}
        {...config}
      />
    );
  };

  public getCreateButton = (props: CreateEntityProps): React.ReactNode => {
    return <CreateEntityButton entity={this} {...props} />;
  };

  public getEditView = (
    resourceID: ResourceID,
    config?: IEntityEditConfig,
    handlers?: { onSave?: EntityOnSaveHandler; onCancel?: () => void }
  ): React.ReactNode => {
    const { onSave, onCancel } = handlers || {
      onSave: undefined,
      onCancel: undefined
    };
    if (this.editLayout) {
      return this.editLayout({ entity: this, onSave, onCancel }, resourceID);
    }
    return (
      <EntityEditLayout
        entity={this}
        resourceID={resourceID}
        onSave={onSave}
        onCancel={onCancel}
        {...this.getEditConfig(resourceID)}
        {...config}
      />
    );
  };

  public getEditButton = (resourceID: ResourceID): React.ReactNode => {
    return (
      <Link to={this.getEditLink(resourceID)}>
        <Button size="small" htmlType="button" icon="edit" />
      </Link>
    );
  };

  public getSearchResourceCollectionLayer = (
    render: (collection: ResourceCollection<T>) => React.ReactNode,
    props?: Partial<ResourceCollectionLayerProps>
  ): React.ReactNode => {
    return (
      <ResourceCollectionLayer
        name={this.name}
        fields={[
          "id",
          ...this.searchableFields.map(
            (x: EntityField<any, any>) => x.fetchField() || x.name
          )
        ]}
        initialSorting={this.initialSorting}
        initialFilters={this.initialFilters}
        dataSource={this.dataSource}
        {...props}
        render={render}
      />
    );
  };

  public getSelect(config?: EntitySelectConfig): React.ReactNode {
    return <EntitySelect entity={this} {...config} />;
  }

  // fields
  // deprecated, use stringField
  public inputField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityFieldString(name, config || {}, this));
    return this;
  }
  public stringField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityFieldString(name, config || {}, this));
    return this;
  }
  public textField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityFieldText(name, config || {}, this));
    return this;
  }
  public numberField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityFieldNumber(name, config || {}, this));
    return this;
  }
  public passwordField(
    name: string,
    config?: IEntityFieldConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldPasssword(name, config || {}, this));
    return this;
  }
  public dateField(
    name: string,
    config?: IEntityFieldDateConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldDate(name, config || {}, this));
    return this;
  }
  public booleanField(
    name: string,
    config?: IEntityFieldBooleanConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldBoolean(name, config || {}, this));
    return this;
  }
  public relationshipField(
    name: string,
    config: IEntityFieldRelationshipConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldRelationship(name, config, this));
    return this;
  }
  public fileField(
    name: string,
    config?: IEntityFieldFileConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldFile(name, config || {}, this));
    return this;
  }
  public colorField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityFieldColor(name, config || {}, this));
    return this;
  }
  public enumField(name: string, config: IEntityFieldEnumConfig<T>): Entity<T> {
    this.fields.push(new EntityFieldEnum(name, config, this));
    return this;
  }
  public computedField(
    name: string,
    config?: IEntityFieldComputedConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldComputed(name, config || {}, this));
    return this;
  }
  public customField(
    name: string,
    config: IEntityFieldCustomConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldCustom(name, config, this));
    return this;
  }

  // links
  public getListLink(): string {
    const prefix = resolveOptionalThunk(this.config.pathPrefix);
    return `${prefix || ""}/${this.structureName}`;
  }
  public getCreateLink(): string {
    const prefix = resolveOptionalThunk(this.config.pathPrefix);
    return `${prefix || ""}/${this.structureName}/new`;
  }
  public getDetailLink(id: ResourceID): string {
    const prefix = resolveOptionalThunk(this.config.pathPrefix);
    return `${prefix || ""}/${this.structureName}/${id}`;
  }
  public getEditLink(id: ResourceID): string {
    const prefix = resolveOptionalThunk(this.config.pathPrefix);
    return `${prefix || ""}/${this.structureName}/${id}/edit`;
  }
}
